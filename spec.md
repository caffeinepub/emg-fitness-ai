# EMG Fitness AI

## Current State
The app has two separate header controls:
1. A PalettePicker (Electric Blue, Neon Purple, Solar Orange, Crimson swatches) stored as emg-palette
2. A Sun/Moon toggle button for dark/light stored as emg-theme

## Requested Changes (Diff)

### Add
- Unified ThemeSelector dropdown: Light, Dark, Blue, Green
- Smooth CSS transitions on html/body for instant animated theme switching
- Green theme CSS variable block in index.css
- localStorage key emg-theme-v2 for the unified theme

### Modify
- Replace PalettePicker + Sun/Moon button with single ThemeSelector dropdown
- Single selectedTheme state (ThemeId) replacing theme + palette states
- Single useEffect applying class + data-palette based on selectedTheme

### Remove
- Separate PalettePicker render and Sun/Moon toggle from header

## Implementation Plan
1. Add green palette OKLCH CSS variables to index.css
2. Add transition rules to html/body for smooth theme changes
3. In App.tsx: replace theme+palette state with selectedTheme, add ThemeSelector dropdown component, wire up localStorage persistence
