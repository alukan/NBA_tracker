# NBA Schedule Tracker

## About

NBA Schedule Tracker is a mobile app for fans who want a fast, no-noise way to follow the league. It pulls live game data from the ESPN scoreboard so users can check scores and statuses at a glance, browse the full schedule filtered to any team, and dig into game details — all without signing in or configuring anything. A spoiler-free mode lets users hide scores until they're ready to see them, and optional 30-minute-before-tip-off notifications mean you never miss a game you care about.

## Technical Overview

The app is a React Native application built on Expo SDK 56, written in TypeScript with strict type-checking throughout. Navigation is handled by React Navigation (native stack + bottom tabs), and all server state comes from the public ESPN scoreboard and team-schedule APIs with no authentication required. Client state (favorite team, user preferences) is persisted locally with AsyncStorage via a React Context layer. The design system is a hand-rolled set of primitives and design tokens (no third-party UI library). Local push notifications are scheduled on-device with `expo-notifications`.

**Tech stack:**

| Area                | Tool                                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| Framework           | React Native 0.85 / Expo SDK 56                                                 |
| Language            | TypeScript 6 (strict)                                                           |
| Navigation          | React Navigation 7 (native-stack, bottom-tabs)                                  |
| State / persistence | React Context + AsyncStorage                                                    |
| Notifications       | expo-notifications (local, on-device)                                           |
| Haptics             | expo-haptics                                                                    |
| Testing             | Jest + jest-expo + React Testing Library                                        |
| Linting             | ESLint 9 (`@christopherjbaker/eslint-config/react-strict`) + eslint-plugin-expo |
| Formatting          | Prettier                                                                        |
| Dead-code detection | Knip                                                                            |
| External API        | ESPN (unofficial, no auth)                                                      |

## Getting Started

**Prerequisites:** Node.js 20+, npm 10+, Xcode (iOS) or Android Studio (Android).

```bash
# 1. Install dependencies
#    (.npmrc already sets legacy-peer-deps=true — no extra flags needed)
npm install

# 2. Start the development server
npx expo start
```

Scan the QR code with the **Expo Go** app on your device, or press `i` / `a` to open a simulator.

**Running on a physical device or simulator with native modules:**

```bash
npx expo run:ios            # iOS simulator
npx expo run:ios --device   # physical iPhone (requires Xcode code signing)
npx expo run:android        # Android emulator or device
```

**Other commands:**

```bash
npm test            # run Jest test suite
npm run lint        # ESLint
npm run lint:fix    # ESLint with auto-fix
npm run format      # Prettier
npm run check:knip  # dead-code analysis
```

**Environment variables:** none required. The ESPN API is public and unauthenticated. All config lives in `app.json` and `src/`.
