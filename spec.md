# EMG Fitness AI

## Current State
App has manual sliders and Raw ADC input mode (0–1023). User must click "Analyze My Workout" button to get output. No automatic analysis on input change.

## Requested Changes (Diff)

### Add
- Auto-Analyze toggle button in the EMG panel (visible in Raw ADC mode)
- When Auto-Analyze is ON: debounced analysis triggers automatically ~1.5s after any raw ADC value changes, simulating live sensor output
- Live status indicator showing "Reading sensor..." while debounce is pending, then "Analysis complete" when done
- Hardware connection tip banner in Raw ADC mode explaining how to wire MyoWare to the app

### Modify
- Raw ADC mode: add Auto-Analyze toggle pill next to the existing Slider/Raw ADC toggle
- handleRawChange: after updating values, if autoAnalyze is ON, schedule debounced analysis

### Remove
- Nothing removed

## Implementation Plan
1. Add `autoAnalyze` state (boolean, default false)
2. Add debounce timer ref
3. After raw value change, if autoAnalyze: clear timer, set "sensing" status, set new timer for 1500ms that calls handleAnalyze
4. Add Auto toggle button visible only in raw mode
5. Add a status badge (Sensing... / Ready) near the Analyze button in raw mode
6. Add hardware tip callout in raw mode
