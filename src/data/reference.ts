// Shared, original reference data used across the meter, the decibel chart,
// the classroom page, and FAQ. Single source of truth keeps copy consistent
// and avoids duplication. All figures are widely published (NIOSH/WHO/CDC);
// the wording here is our own.

export interface DbExample {
  db: number;
  label: string;
  source: string;
  zone: "quiet" | "moderate" | "elevated" | "loud" | "danger";
}

export const DB_EXAMPLES: DbExample[] = [
  { db: 0, label: "Threshold of human hearing", source: "Reference point", zone: "quiet" },
  { db: 10, label: "Normal breathing", source: "Calm room", zone: "quiet" },
  { db: 20, label: "Rustling leaves, a ticking watch", source: "Very quiet", zone: "quiet" },
  { db: 30, label: "Whisper, quiet library", source: "Library", zone: "quiet" },
  { db: 40, label: "Quiet residential street at night", source: "Home", zone: "quiet" },
  { db: 50, label: "Refrigerator hum, light rain", source: "Home", zone: "quiet" },
  { db: 60, label: "Normal conversation, an office", source: "Office", zone: "moderate" },
  { db: 70, label: "Vacuum cleaner, busy traffic", source: "Street", zone: "moderate" },
  { db: 80, label: "Garbage disposal, city traffic", source: "Street", zone: "elevated" },
  { db: 85, label: "NIOSH recommended exposure limit", source: "NIOSH REL", zone: "elevated" },
  { db: 90, label: "Lawn mower, motorcycle", source: "Power tools", zone: "loud" },
  { db: 100, label: "Nightclub, handheld drill", source: "Venue", zone: "loud" },
  { db: 110, label: "Rock concert, chainsaw", source: "Concert", zone: "danger" },
  { db: 120, label: "Ambulance siren, thunderclap", source: "Siren", zone: "danger" },
  { db: 130, label: "Jet engine at takeoff (close)", source: "Aircraft", zone: "danger" },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How accurate is an online sound meter?",
    a: "It depends entirely on your device. Phone and laptop microphones are not calibrated acoustic instruments, and most apply automatic gain that distorts loud sounds. Expect readings within roughly ±3–5 dB of a real meter for everyday levels once you set a calibration offset — accurate enough to compare rooms and track trends, but not for legal or occupational evidence. We disable automatic gain control where the browser allows it to improve consistency.",
  },
  {
    q: "Does this record or upload my audio?",
    a: "No. All processing happens in your browser using the Web Audio API. The microphone stream is analyzed on your device and discarded frame by frame — nothing is recorded, stored, or sent to any server. The optional report contains only summary numbers, generated locally.",
  },
  {
    q: "What is the difference between dBA, dBC, and dBZ?",
    a: "They are frequency weightings. dBA (A-weighting) mimics how human ears respond, de-emphasizing very low and very high frequencies — it is the standard for noise and hearing-risk assessment. dBC (C-weighting) is flatter and captures more bass, useful for peak and low-frequency noise. dBZ (Z, zero) is unweighted and shows the raw spectrum. Switch weightings using the A / C / Z control.",
  },
  {
    q: "What is LAeq?",
    a: "LAeq is the equivalent continuous A-weighted sound level — the single steady level that carries the same total sound energy as the fluctuating noise you actually measured over the session. Because sound energy is logarithmic, a few loud moments raise LAeq far more than many quiet ones, which is why it is the metric used for exposure and noise regulations.",
  },
  {
    q: "What does Fast vs. Slow response mean?",
    a: "These are standardized time-weightings from IEC 61672. Fast (125 ms) reacts quickly and is good for catching short events; Slow (1 second) smooths the reading and is easier to read for steady noise. They change how the meter averages over time, not the underlying calibration.",
  },
  {
    q: "How do I calibrate the meter?",
    a: "Measure a known reference — for example a calibrated meter, a reference app on another device, or a quiet room you know reads about 35–40 dB — then enter the difference in the calibration field. The offset is applied to every reading and remembered for your session.",
  },
  {
    q: "What sound level is dangerous?",
    a: "Prolonged exposure at or above 85 dBA can cause permanent hearing loss; the safe daily dose halves for every 3 dB increase (the NIOSH exchange rate). Sounds at 120 dB and above can cause immediate harm. Brief exposure to moderate noise is fine — risk comes from loudness combined with duration.",
  },
  {
    q: "Why does my reading look too low or too high?",
    a: "Common causes are an uncalibrated microphone, browser automatic gain control, a covered or low-quality mic, or wind noise. Set a calibration offset, remove any case covering the microphone, and avoid blowing air across it. Readings are best used to compare relative levels rather than as absolute ground truth.",
  },
];

export interface HealthImpact {
  title: string;
  body: string;
}

export const HEALTH_IMPACTS: HealthImpact[] = [
  {
    title: "Noise-induced hearing loss",
    body: "Sustained exposure above 85 dBA damages the hair cells of the inner ear. The loss is gradual, painless, and permanent — which is exactly why monitoring matters before symptoms appear.",
  },
  {
    title: "Stress and cardiovascular strain",
    body: "Chronic noise keeps the body in a low-grade stress state. Long-term studies link persistent environmental noise to elevated blood pressure and increased cardiovascular risk.",
  },
  {
    title: "Sleep disruption",
    body: "Night-time noise above roughly 40 dB can fragment sleep even when you do not fully wake. The WHO recommends keeping bedroom noise well below this for restorative rest.",
  },
  {
    title: "Concentration and learning",
    body: "Background noise competes for attention. In classrooms and offices, elevated levels measurably reduce comprehension, memory, and task performance — children are especially affected.",
  },
];
