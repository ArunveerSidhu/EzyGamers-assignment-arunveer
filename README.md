# Numbo-Tron 🎮

A number-matching puzzle game built with React Native and Expo, inspired by Number Master by KiwiFun. Match numbers that are equal or sum to 10, race against time, and progress through increasingly challenging levels!

## 📱 Demo

[Download APK from Releases]

## 🎯 Game Features

### Core Gameplay
- **Match Mechanics**: Match two numbers if they are equal OR sum to 10
- **Visual Feedback**: 
  - Valid matches fade out with haptic feedback
  - Invalid matches shake with error feedback
- **No Removal**: Matched cells remain visible but become dull/faded
- **Progressive Difficulty**: 3 levels with strategic pair distribution
- **Time Challenge**: Complete each level within 2 minutes
- **Dynamic Grid**: Start with 3-4 rows, add more rows strategically to find matches

### Game Controls
- **Tap Interaction**: Tap first cell (highlights) → tap second cell → automatic validation
- **Add Row Button**: Reveals additional rows when needed
- **Pause/Resume**: Pause the game at any time
- **Quit Confirmation**: Safety modal before quitting mid-game
- **Background Music**: Immersive audio with mute/unmute controls

## 🏆 Level Structure

The game features 3 progressively challenging levels:

| Level | Name | Grid Size | Initial Rows | Total Rows | Hidden Pairs | Time Limit |
|-------|------|-----------|--------------|------------|--------------|------------|
| 1     | Easy | 6x8       | 4            | 8          | 40%          | 2 min      |
| 2     | Medium| 6x10     | 4            | 10         | 50%          | 2 min      |
| 3     | Hard | 6x12      | 4            | 12         | 60%          | 2 min      |

### Difficulty Progression
- **Level 1 (Easy)**: 40% of matching pairs are hidden in unrevealed rows
- **Level 2 (Medium)**: 50% of matching pairs are hidden in unrevealed rows
- **Level 3 (Hard)**: 60% of matching pairs are hidden in unrevealed rows

This creates strategic gameplay where players must decide when to add rows vs. finding visible matches first.

## 🛠️ Tech Stack

- **Framework**: React Native (Expo SDK 52)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Animations**: react-native-reanimated
- **Audio**: expo-av
- **Haptics**: expo-haptics
- **Icons**: react-native-svg
- **Fonts**: Custom fonts (Gothic Byte, Luckiest Guy, Star Crush)

## 📂 Project Architecture

```
├── app/                        # Expo Router (file-based routing)
│   ├── _layout.tsx            # Root layout with music context
│   ├── index.tsx              # Entry point (redirects to Start)
│   ├── Start.tsx              # Start screen route
│   └── Game.tsx               # Game screen route
├── screens/                    # Screen components
│   ├── StartScreen.tsx        # Level selection screen logic
│   └── GameScreen.tsx         # Main game screen logic
├── components/
│   ├── gamescreen/            # Game UI components
│   │   ├── GameHeader.tsx     # Timer, score, back button
│   │   ├── GameBoard.tsx      # Grid rendering
│   │   ├── AnimatedCell.tsx   # Individual cell with animations
│   │   ├── AddRowButton.tsx   # Button to reveal rows
│   │   ├── PauseButton.tsx    # Pause/resume control
│   │   └── index.ts           # Barrel export
│   ├── startscreen/
│   │   ├── LevelButton.tsx    # Level selection buttons
│   │   └── index.ts           # Barrel export
│   ├── icons/                 # Custom SVG icons
│   │   ├── AddIcon.tsx
│   │   ├── PauseIcon.tsx
│   │   ├── ResumeIcon.tsx
│   │   ├── MuteIcon.tsx
│   │   ├── UnmuteIcon.tsx
│   │   └── index.ts           # Barrel export
│   └── modals/                # Modal components
│       ├── Modal.tsx          # Base modal wrapper
│       ├── QuitConfirmModal.tsx
│       ├── GameOverModal.tsx
│       └── index.ts           # Barrel export
├── hooks/                     # Custom React hooks
│   ├── useGameLogic.ts        # Core game state & logic
│   ├── useTimer.ts            # Countdown timer
│   ├── useBackgroundMusic.ts  # Audio playback
│   ├── useFontsLoader.ts      # Font loading
│   └── index.ts               # Barrel export
├── contexts/
│   └── MusicContext.tsx       # Global music state
├── utils/                     # Helper functions
│   ├── gridGenerator.ts       # Grid generation algorithm
│   └── gameHelpers.ts         # Match validation, adjacency checks
├── config/
│   └── levelConfigs.ts        # Level difficulty configurations
├── types/
│   └── game.types.ts          # TypeScript interfaces
├── assets/                    # Images, fonts, audio
│   ├── images/
│   │   ├── StartScreen/       # Level selection assets
│   │   ├── GameScreen/        # Game UI assets
│   │   └── logo.png           # App icon
│   ├── fonts/
│   │   ├── gothic-byte.ttf
│   │   ├── luckiest-guy.ttf
│   │   └── star-crush.ttf
│   └── music/
│       └── bg-music.mp3       # Background music
├── levels.ts                  # Level metadata & configurations
├── app.json                   # Expo configuration
├── package.json               # Dependencies
└── tailwind.config.js         # NativeWind configuration
```

### Key Design Patterns

1. **Custom Hooks**: Business logic separated into reusable hooks
   - `useGameLogic`: Manages grid state, cell selection, matching logic
   - `useTimer`: Handles countdown with pause/resume
   - `useBackgroundMusic`: Global music playback with mute control

2. **Component Architecture**: 
   - Modular, reusable components
   - Props-based configuration
   - Separation of concerns (UI vs. logic)

3. **State Management**:
   - Local state with `useState` for game logic
   - Context API for global music state
   - Immutable state updates with spread operators

4. **Type Safety**:
   - Comprehensive TypeScript interfaces
   - Strict type checking
   - Prop validation

## 🎮 Game Rules

### Matching Rules
1. **Equal Match**: Two cells with the same number (e.g., 5 and 5)
2. **Sum of 10**: Two cells that sum to 10 (e.g., 3 and 7, 2 and 8)

### Adjacency Rules
Cells can be matched if they are adjacent:
- Horizontally (left/right)
- Vertically (up/down)
- **Important**: Only considers matched/unmatched cells, empty cells don't block adjacency

### Victory Condition
Find and match the required number of cells in the grid within the time limit.

### Game Over Conditions
- Timer reaches 0:00
- All matches found (Victory!)

### Strategic Elements
- Adding rows doesn't increase the victory target
- Some matching pairs are strategically placed in hidden rows
- Players must balance revealing rows vs. finding visible matches
- Higher levels have more pairs hidden in unrevealed rows

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EzyGamers-assignment-arunveer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **First time setup - Build and run the app**
   ```bash
   # For Android
   npx expo run:android
   
   # For iOS (macOS only)
   npx expo run:ios
   ```
   This will prebuild native code and install the app on your device/emulator.

4. **Subsequent runs - Start development server**
   ```bash
   npx expo start
   ```
   After the first build, you can use this command to start the development server. Press `s` to switch to development build, then press `a` for Android or `i` for iOS (macOS only).

### Building for Production

#### Android APK
```bash
# Prebuild native code
npx expo prebuild --clean

# Build APK
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

#### Android AAB (for Play Store)
```bash
cd android
./gradlew bundleRelease
```

## 🎨 Design Choices

### Color Scheme
- **Background**: Dark theme (#0a0e12)
- **Cards/Cells**: Dark gray (#1c2128)
- **Borders**: Subtle gray (#40444c)
- **Highlights**: Yellow-600 (selected cells)
- **Text**: White with gray accents
- **Matched Cells**: Faded with 40% opacity

### Typography
- **Gothic Byte**: Retro-style title font
- **Luckiest Guy**: Bold, playful numbers and UI text
- **Star Crush**: Accent font for level buttons

### Animations
- **Shake Effect**: Invalid matches shake horizontally (8px amplitude, 250ms)
- **Fade Effect**: Matched cells fade to 40% opacity
- **Modal Transitions**: Smooth fade-in with backdrop
- **Button Press**: Haptic feedback for tactile response

## 🧪 Testing the Game

1. **Start Screen**: 
   - Verify all 3 levels are visible
   - Test mute/unmute button
   - Tap any level to start

2. **Game Screen**:
   - Match two equal numbers (e.g., 3 and 3)
   - Match two numbers that sum to 10 (e.g., 4 and 6)
   - Try invalid match (should shake)
   - Test Add Row button
   - Test Pause/Resume
   - Test Back button (quit confirmation)

3. **Victory**:
   - Match all visible pairs
   - Check "Next Level" button appears
   - Test Replay and Quit buttons

4. **Game Over**:
   - Let timer reach 0:00
   - Check game over modal
   - Test Replay and Quit buttons

## 📦 Dependencies

### Core Dependencies
```json
{
  "expo": "~52.0.23",
  "expo-router": "~4.0.16",
  "react": "18.3.1",
  "react-native": "0.76.6",
  "typescript": "^5.3.3"
}
```

### UI & Animation
```json
{
  "nativewind": "^4.1.23",
  "react-native-reanimated": "~3.16.5",
  "react-native-svg": "15.8.0",
  "expo-linear-gradient": "~14.0.1"
}
```

### Media & Interaction
```json
{
  "expo-av": "~15.0.1",
  "expo-haptics": "~14.0.0",
  "expo-font": "~13.0.1"
}
```

## 🐛 Known Issues & Future Improvements

### Potential Enhancements
- [ ] Add more levels (currently 3)
- [ ] Leaderboard with best times
- [ ] Sound effects for matches


## 👨‍💻 Developer Notes

### Grid Generation Algorithm
The grid is generated using a strategic pair distribution system:
1. Create empty grid based on level configuration
2. Calculate number of visible cells (initial rows)
3. Determine hidden pair ratio based on difficulty
4. Scatter matching pairs across visible and hidden areas
5. Shuffle remaining cells for variety

### Match Validation Logic
```typescript
function isValidMatch(cell1: Cell, cell2: Cell): boolean {
  // Equal numbers
  if (cell1.value === cell2.value) return true;
  
  // Sum to 10
  if (cell1.value + cell2.value === 10) return true;
  
  return false;
}
```

### Adjacency Check
```typescript
function areAdjacent(cell1: Cell, cell2: Cell, grid: Cell[][]): boolean {
  // Check horizontal, vertical adjacency
  // Skip empty cells, consider matched/unmatched cells only
  // Implement BFS/DFS for path finding
}
```

---

**Developed by Arunveer** | [GitHub Profile] | [LinkedIn]

For questions or feedback, please reach out via LinkedIn or email(sidhu.arunveer@gmail.com).
