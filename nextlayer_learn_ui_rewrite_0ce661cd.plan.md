---
name: NextLayer Learn UI Rewrite
overview: Rewrite the React Native UI using NativeWind to achieve a minimal, highly accessible, voice-first design tailored for elderly and regional Indian users, implementing the specified onboarding, home, learn, translate, and chat flows while preserving existing Sarvam AI backend integrations.
todos:
  - id: setup-nativewind
    content: Install and configure NativeWind and Tailwind CSS in the app directory.
    status: pending
  - id: update-store
    content: Update useAppStore to include language, text size, contrast mode, and user profile data.
    status: pending
  - id: setup-localization
    content: Create a localization utility for dynamic text translation.
    status: pending
  - id: build-components
    content: Build reusable NativeWind UI components (LargeButton, HoldToSpeakButton, Typography, Card).
    status: pending
  - id: implement-onboarding
    content: Implement the 4-step Onboarding Flow (Language, Mic Permission, Profile, Tutorial).
    status: pending
  - id: implement-home
    content: Implement the Home Screen with greeting, topic bubbles, central mic button, and recent conversations.
    status: pending
  - id: update-navigation
    content: Update Bottom Navigation tabs with large icons and localized labels.
    status: pending
  - id: implement-learn
    content: Implement the Learn Screen with horizontal swipeable cards and progress indicator.
    status: pending
  - id: implement-translate
    content: Implement the Translate Screen with split-screen layout and rotated top half.
    status: pending
  - id: implement-chat
    content: Implement the Chat Screen with large bubbles and bottom input area.
    status: pending
  - id: implement-profile
    content: Implement the Profile Screen for settings (language, text size, contrast, profile edits).
    status: pending
  - id: integrate-and-test
    content: Integrate UI with existing Sarvam AI services and test haptics/accessibility settings.
    status: pending
isProject: false
---

# NextLayer Learn UI Rewrite Plan

## 1. Setup NativeWind and Dependencies
- Install NativeWind and Tailwind CSS in the `app/` directory.
- Configure `tailwind.config.js` and Babel to support NativeWind.
- Install necessary React Native packages for haptics (`react-native-haptic-feedback`), icons (if not already present), and safe area handling.
- Set up a custom theme in Tailwind config for high contrast colors and large typography defaults.

## 2. Global State and Theme Management
- Update `app/src/store/useAppStore.ts` to include:
  - Selected language (Malayalam, Tamil, Hindi, English).
  - Text size preference (Small, Medium, Large - default Large).
  - High contrast mode toggle.
  - User profile data (Name, Age).
- Create a localization utility or context to handle dynamic text translation across the app based on the selected language.

## 3. Core UI Components (NativeWind)
- Create reusable, accessible UI components styled with NativeWind:
  - `LargeButton`: High contrast, large touch target.
  - `HoldToSpeakButton`: Circular, prominent, integrated with haptics (press/release).
  - `Typography`: Wrappers for Text that respect the global text size setting.
  - `Card`: Minimalist, horizontally scrollable cards for the Learn screen.

## 4. Onboarding Flow Implementation
- **Screen 1 (Language Selection):** Centered layout, 4 large buttons for languages. Updates global state immediately.
- **Screen 2 (Mic Permission):** Large mic icon, localized explanation, "Allow" button triggering system permission request.
- **Screen 3 (Profile):** Large inputs for Name (required) and Age (optional).
- **Screen 4 (Tutorial):** Looping animation (using Lottie or simple RN Animated) demonstrating the hold-to-speak interaction, with a "Let's go" button.

## 5. Main Screens Implementation
- **Home Screen:**
  - Custom header with sidebar toggle, app name, and profile button.
  - Localized greeting using the user's name.
  - Horizontal scroll view for topic bubbles.
  - Central `HoldToSpeakButton` with localized instructions.
  - Recent conversations list using large cards.
- **Bottom Navigation:**
  - Update `app/App.tsx` tab navigator to use large icons and localized labels for Home, Learn, Translate, and Chat.
- **Learn Screen:**
  - Horizontal swipeable cards for topics with play/audio preview buttons.
  - Progress indicator at the top.
- **Translate Screen:**
  - Split-screen layout (top rotated 180deg, bottom normal).
  - Language selectors and `HoldToSpeakButton` in both halves.
  - "Save to phrasebook" functionality.
- **Chat Screen:**
  - Standard large chat bubbles.
  - Bottom input area with text field and mic button.
  - Auto-play voice responses.
- **Profile Screen:**
  - Toggles for language, text size, and high contrast mode.
  - Edit fields for Name and Age.

## 6. Integration and Testing
- Ensure all screens correctly call existing Sarvam AI API services (`app/src/services/api.ts`, `sarvamChat.ts`, `sarvamSTT.ts`, `sarvamTTS.ts`) without modifying the backend logic.
- Test UI responsiveness to global text size and high contrast settings.
- Verify haptic feedback on the hold-to-speak interactions.