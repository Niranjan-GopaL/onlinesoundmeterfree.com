// Sound-level DSP engine. Pure-ish browser audio math, decoupled from the DOM.
//
// IMPORTANT honesty note: a consumer microphone is not a calibrated SPL sensor.
// Readings here are weighted, smoothed, offset-mapped estimates — good for
// relative monitoring and education, not legal/occupational measurement. The
// UI states this plainly and offers a calibration offset.

export type Weighting = "A" | "C" | "Z";
export type Response = "fast" | "slow";

// Exponential time-weighting constants (IEC 61672): Fast = 125 ms, Slow = 1 s.
const TAU: Record<Response, number> = { fast: 0.125, slow: 1.0 };

// Maps mic dBFS to an approximate SPL scale. Empirical; user calibration nudges
// it. Chosen so a typical quiet room lands ~35–45 dB and full-scale ~120 dB.
export const BASE_OFFSET = 100;

/** A-weighting response in dB at frequency f (Hz). IEC 61672 / ANSI S1.4. */
export function aWeightingDb(f: number): number {
  if (f <= 0) return -Infinity;
  const f2 = f * f;
  const num = 12194 ** 2 * f2 * f2;
  const den =
    (f2 + 20.6 ** 2) *
    Math.sqrt((f2 + 107.7 ** 2) * (f2 + 737.9 ** 2)) *
    (f2 + 12194 ** 2);
  return 20 * Math.log10(num / den) + 2.0; // +2.0 dB normalization at 1 kHz
}

/** C-weighting response in dB at frequency f (Hz). */
export function cWeightingDb(f: number): number {
  if (f <= 0) return -Infinity;
  const f2 = f * f;
  const num = 12194 ** 2 * f2;
  const den = (f2 + 20.6 ** 2) * (f2 + 12194 ** 2);
  return 20 * Math.log10(num / den) + 0.06; // +0.06 dB normalization at 1 kHz
}

/** Precompute linear weighting gains per FFT bin for the given sample rate. */
export function buildWeightingTable(
  binCount: number,
  sampleRate: number,
  weighting: Weighting,
): Float32Array {
  const table = new Float32Array(binCount);
  const nyquistBinHz = sampleRate / 2 / binCount;
  for (let i = 0; i < binCount; i++) {
    const f = i * nyquistBinHz;
    let db = 0;
    if (weighting === "A") db = aWeightingDb(f);
    else if (weighting === "C") db = cWeightingDb(f);
    else db = 0; // Z = flat
    table[i] = Number.isFinite(db) ? 10 ** (db / 20) : 0;
  }
  return table;
}

/**
 * Compute the weighting delta (dB) to add to the broadband RMS level, by
 * comparing weighted vs. unweighted power across the spectrum.
 * `freqDb` is AnalyserNode.getFloatFrequencyData output (per-bin dB).
 */
export function weightingDelta(
  freqDb: Float32Array,
  table: Float32Array,
): number {
  let weighted = 0;
  let flat = 0;
  for (let i = 1; i < freqDb.length; i++) {
    const amp = 10 ** (freqDb[i] / 20); // linear amplitude
    const p = amp * amp;
    flat += p;
    const w = table[i];
    weighted += p * w * w;
  }
  if (flat <= 0 || weighted <= 0) return 0;
  return 10 * Math.log10(weighted / flat);
}

/** RMS of a time-domain frame (values in [-1, 1]) → dBFS. */
export function rmsToDbfs(time: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < time.length; i++) sum += time[i] * time[i];
  const rms = Math.sqrt(sum / time.length);
  return rms > 0 ? 20 * Math.log10(rms) : -Infinity;
}

/** Exponential time-weighting (one step). dt in seconds. */
export function smooth(
  prev: number,
  next: number,
  response: Response,
  dt: number,
): number {
  if (!Number.isFinite(prev)) return next;
  const alpha = 1 - Math.exp(-dt / TAU[response]);
  return prev + alpha * (next - prev);
}

/** Running statistics including an energy-average equivalent level (Leq). */
export class LevelStats {
  min = Infinity;
  max = -Infinity;
  private energySum = 0; // Σ 10^(L/10) for arithmetic level
  private count = 0;
  private leqEnergy = 0; // Σ 10^(LA/10) for LAeq
  private leqCount = 0;

  /** Feed the displayed level + the A-weighted level (for LAeq). */
  add(level: number, aLevel: number): void {
    if (!Number.isFinite(level)) return;
    this.min = Math.min(this.min, level);
    this.max = Math.max(this.max, level);
    this.energySum += 10 ** (level / 10);
    this.count++;
    if (Number.isFinite(aLevel)) {
      this.leqEnergy += 10 ** (aLevel / 10);
      this.leqCount++;
    }
  }

  /** Arithmetic-of-energy average of the displayed level. */
  get avg(): number {
    return this.count ? 10 * Math.log10(this.energySum / this.count) : NaN;
  }

  /** Equivalent continuous A-weighted level over the session. */
  get laeq(): number {
    return this.leqCount
      ? 10 * Math.log10(this.leqEnergy / this.leqCount)
      : NaN;
  }

  reset(): void {
    this.min = Infinity;
    this.max = -Infinity;
    this.energySum = 0;
    this.count = 0;
    this.leqEnergy = 0;
    this.leqCount = 0;
  }
}

export interface Zone {
  id: string;
  label: string;
  /** lower bound (inclusive), dB */
  from: number;
  /** CSS variable name for the zone color */
  varName: string;
}

// Safety zones (NIOSH-informed). Not color-only in the UI — each has a label.
export const ZONES: Zone[] = [
  { id: "quiet", label: "Quiet", from: 0, varName: "--zone-quiet" },
  { id: "moderate", label: "Moderate", from: 53, varName: "--zone-moderate" },
  { id: "elevated", label: "Elevated", from: 71, varName: "--zone-high" },
  { id: "loud", label: "Loud", from: 86, varName: "--zone-loud" },
  { id: "danger", label: "Danger", from: 101, varName: "--zone-danger" },
];

export function zoneFor(db: number): Zone {
  let z = ZONES[0];
  for (const zone of ZONES) if (db >= zone.from) z = zone;
  return z;
}

/**
 * NIOSH permissible exposure time (REL 85 dBA, 3-dB exchange rate).
 * Returns seconds of safe daily exposure at the given A-weighted level.
 */
export function nioshExposureSeconds(dba: number): number {
  if (dba < 85) return Infinity;
  return (8 * 3600) / 2 ** ((dba - 85) / 3);
}
