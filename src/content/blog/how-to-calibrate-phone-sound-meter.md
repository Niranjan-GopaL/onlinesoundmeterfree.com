---
title: "How to calibrate your phone as a sound meter"
description: "A consumer microphone isn't a calibrated instrument — but with a simple offset you can make a phone sound meter surprisingly reliable. Here's how to calibrate it step by step."
pubDate: 2026-05-20
tags: ["calibration", "accuracy", "how-to"]
---

A phone or laptop microphone is built for voice calls, not acoustic measurement. Out of the box, an online sound meter on your device might read several decibels high or low. The good news: a one-time calibration offset gets you within a few dB of the real value for everyday levels — accurate enough to compare rooms, monitor trends, and make sensible decisions about hearing protection.

## Why calibration is needed

Two things work against an uncalibrated reading:

1. **Microphone sensitivity varies.** Every consumer mic has a different baseline gain and frequency response. There is no universal mapping from the raw signal to sound pressure level.
2. **Automatic gain control (AGC).** Browsers and phones often boost quiet sounds and compress loud ones to make speech intelligible. Our meter asks the browser to disable AGC, but not every browser honours the request.

Calibration corrects the first problem with a fixed offset. The second is best handled by avoiding extremes and keeping conditions consistent.

## What you need

- The [online sound meter](/) open on your device.
- A reference you trust. In order of preference: a calibrated sound level meter, a dedicated SPL meter app on a second device, or a known-quiet room.

## Step by step

1. **Pick a steady sound source.** A running tap, a fan, or background room noise works well — anything that holds a roughly constant level for a minute.
2. **Measure with your reference.** Note its reading, for example 58 dB.
3. **Measure with this meter** in the same spot, at the same time, with A-weighting and Slow response selected. Suppose it reads 53 dB.
4. **Calculate the offset.** Reference minus meter: 58 − 53 = **+5 dB**.
5. **Enter the offset** in the calibration field on the meter. Every reading now shifts up by 5 dB.
6. **Verify** against a second sound at a different level to confirm the offset holds.

If you have no reference at all, a useful rough anchor is a quiet room at night, which typically sits around 35–40 dB. Adjust the offset until the meter reads in that range when the room is silent.

## Tips for reliable readings

- Remove any case, and keep fingers away from the microphone port.
- Don't let air blow across the mic — wind creates large false readings.
- Hold the device still; handling noise registers as sound.
- Re-check calibration occasionally, since device behaviour can change between sessions and updates.

## Know the limits

Even perfectly calibrated, a phone will struggle with very loud sounds (where AGC and clipping distort the signal) and very low frequencies (which small mics under-report). For those, a proper Type 2 meter is the right tool. For everything else, a calibrated phone is a genuinely useful instrument — and it is already in your pocket.

Ready to try it? [Open the meter](/) and set your offset now.
