<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=121922&height=180&section=header&text=NextLayer%20Learn&fontSize=50&fontColor=A3BBD9&fontAlignY=40&desc=A%20voice-first%20learning%20app%20for%20Indian%20regional%20users&descAlignY=65&descSize=16&animation=fadeIn" alt="NextLayer Learn header" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Hanken+Grotesk&weight=400&size=20&duration=3000&pause=800&color=A3BBD9&center=true&vCenter=true&width=600&lines=Speak+%E2%80%A2+Learn+%E2%80%A2+Translate;Native+language+learning+made+simple;Powered+by+Sarvam+AI" alt="Animated tagline"/>

<br/>

[![React Native](https://img.shields.io/badge/React_Native-0.84-121212?style=for-the-badge&logo=react&logoColor=A3BBD9&labelColor=000000)](https://reactnative.dev/)
[![Node](https://img.shields.io/badge/Node-%E2%89%A522.11-121212?style=for-the-badge&logo=nodedotjs&logoColor=A3BBD9&labelColor=000000)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-121212?style=for-the-badge&logo=express&logoColor=A3BBD9&labelColor=000000)](https://expressjs.com/)

</div>

<br/>

> **NextLayer Learn** is a voice-first learning app built for Indian regional users. It helps people learn new skills using their native language through simple voice conversations. The app focuses on users who are not comfortable with English or modern apps, designed for clarity, ease of use, and real-world learning.

<br/>

## ✦ The Problem

Many people in India struggle to use apps and learn new skills because:
- Most apps are in English.
- Voice assistants sound unnatural in regional languages.
- Learning platforms are too complex.
- Older users find modern UI difficult.

**NextLayer Learn** solves this by making learning conversational and language-native.

<br/>

## ✦ The Solution

NextLayer Learn allows users to speak in their own language and learn step-by-step. The app listens, understands, explains, and responds using natural regional voices powered by **[Sarvam AI](https://www.sarvam.ai/)**.

<br/>

## ✦ Core Features

### Voice-First Interaction
- Tap the mic and speak.
- App converts speech to text using Sarvam.
- Sends input to AI.
- Receives response in the same language.
- Converts response back to speech.

### Learning Mode
- Users can ask things like: *"Teach me English"*, *"How to use WhatsApp"*, *"How to use AI"*.
- AI responds like a patient teacher.
- Uses simple words and breaks answers into manageable steps.

### Translator
- Voice or text input.
- Translate between Indian languages and English.
- Output includes both text and natural voice.

### Multi-Language Support
- Malayalam, Tamil, Hindi, English.
- User selects their preferred language on the first launch.

<br/>

## ✦ How It Works

1. User taps the mic.
2. App records audio.
3. Audio is sent to Sarvam Speech-to-Text.
4. Text is sent to Sarvam AI for a conversational response.
5. Response is generated in the same language.
6. Text is sent to Sarvam Text-to-Speech.
7. Audio is played back to the user.

<br/>

## ✦ Tech Stack

**Frontend**
- React Native CLI (Android focused)
- Zustand for state management

**Backend**
- Node.js with Express
- Acts as a secure proxy for Sarvam APIs

**AI Layer (Sarvam AI)**
- Speech-to-Text
- Conversational AI
- Text-to-Speech

<br/>

## ✦ Design Principles

- **Simple and clean interface**
- **Large buttons** for accessibility
- **High contrast text**
- **Minimal steps** for any action

<br/>

## ✦ Target Users

- Non-English speakers
- Older adults learning smartphones
- First-time internet users
- Regional language users in India

<br/>

## ✦ MVP Scope

- Voice input
- AI response
- Voice output
- Basic translation

<br/>

## ✦ Future Improvements

- Offline support
- Personalized lessons
- Progress tracking
- Content caching
- More Indian languages

<br/>

## ✦ Setup & Development

### Prerequisites
- **Node.js** ≥ 22.11
- **Sarvam API key**
- **Android Studio** for React Native Android development

### Environment Variables
Create `backend/.env`:
```env
SARVAM_API_KEY=your_key_here
```

### Run Locally

**1. Start the Backend Proxy:**
```bash
cd backend
npm install
npm start
```

**2. Start the App:**
```bash
cd app
npm install
npm start
# In a new terminal:
npm run android
```

<br/>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=121922&height=60&section=footer&animation=fadeIn" alt="Footer" width="100%"/>

**[NextLayer Labs](https://nextlayer-labs.web.app/)** • Building intelligent software systems.

</div>
