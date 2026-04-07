#!/usr/bin/env bash
# Fixes "adb: command not found" and "Unable to locate a Java Runtime" when your
# shell does not have JAVA_HOME / ANDROID_HOME set (common on fresh Macs).
# Usage (from the app folder): bash scripts/run-android.sh
# Or: npm run android:studio

set -euo pipefail

APP_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_ROOT"

# Android Studio bundled JDK (Gradle also reads android/gradle.properties org.gradle.java.home)
export JAVA_HOME="${JAVA_HOME:-/Applications/Android Studio.app/Contents/jbr/Contents/Home}"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"

if [[ ! -d "$JAVA_HOME" ]]; then
  echo "JAVA_HOME not found at: $JAVA_HOME"
  echo "Install Android Studio or set JAVA_HOME to a JDK 17+ install."
  exit 1
fi

if [[ ! -d "$ANDROID_HOME" ]]; then
  echo "ANDROID_HOME not found at: $ANDROID_HOME"
  echo "Open Android Studio → Settings → Android SDK and install the SDK."
  exit 1
fi

export PATH="$JAVA_HOME/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"

if ! command -v adb >/dev/null 2>&1; then
  echo "adb still not found under: $ANDROID_HOME/platform-tools"
  exit 1
fi

if ! adb devices 2>/dev/null | grep -qE 'device$|emulator-'; then
  echo "No Android device or emulator detected."
  echo "Start one from Android Studio: Tools → Device Manager → Play ▶"
  echo "Or plug in a phone with USB debugging enabled."
  exit 1
fi

# Phone/emulator reaches your Mac's Metro + backend via device localhost → host ports.
for port in 3000 8081; do
  adb reverse "tcp:${port}" "tcp:${port}" 2>/dev/null || true
done

exec npx react-native run-android "$@"
