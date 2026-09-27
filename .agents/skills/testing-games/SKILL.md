---
name: testing-traffic
description: Browser QA for Traffic intersection safety, real signal controls, scoring, patience, and responsive layouts.
---

# Traffic browser QA

## Setup
- Start Astro with `npx astro dev --background`; manage it with
  `npx astro dev status`, `logs`, and `stop`.
- Open `/games/traffic`, also reachable through Games and Ctrl+K.
- No backend, login, flags, or secrets are needed.
- Discover Chrome's debugging port from the running process, rather than
  assuming a port. Maximize Chrome before recording.
- Pair every physical or CDP key press with a release. Use real pointer/touch
  events for canvas and mobile Switch lights controls.

## Runtime evidence
- Read current canvas coordinates, car dimensions, stop limits, signal
  durations, and score rules before building a passive observer.
- Observe rendered positions and lamps without changing physics, random
  values, lives, score, or time. Show timing evidence visibly in recordings.
- Distinguish cars newly entering on red from cars already admitted.
- Require positive throughput before passing a zero-collision assertion;
  traffic stalled on green is not safe-flow evidence. If a run ends before
  the target duration, report separate run durations rather than claiming
  one continuous survival run.
- Check perpendicular body rectangles, not just centers, during transitions.
  Confirm detected overlaps with actual screenshots or normal-speed clips.
- Restrict visible queue-spacing assertions to on-screen cars. Offscreen
  spawn spacing should not be mistaken for a visible collision.
- Float rounding can shift rendered threshold-crossing detection by a frame.
  Reconcile score deltas across adjacent frames and the complete run.
- For simultaneous clears, apply multiplier increases in the game's queue
  iteration order, not the previous frame's multiplier to every car.
- Reset observer histories when the game resets, or reload for a fresh
  baseline. Do not use cumulative telemetry across independent games.
- If instrumentation is installed through CDP across reloads, keep that
  connection alive and verify the observer exists after each navigation.

## Gameplay and responsive checks
- Switch during moving queues; exercise early-green rejection and attempted
  interruption during both amber and all-red. Compare HUD with actual lamps.
- Continue past the density ramp, observing ordinary and ambulance patience.
- Follow individual cars through depletion and score events to distinguish
  repeated penalties from simultaneous losses.
- Use actual game-over and restart UI, then reload to verify `traffic:best`.
  A lower-score run must preserve the earlier best.
- At 375px, capture both themes, signal controls, and summary. Scroll touch
  controls above Astro's development toolbar if it intercepts input.
- Timed/adaptive automated survival proves feasibility, not casual-player
  ease; report readability, reaction windows, and pressure separately.

## Devin Secrets Needed
None.
