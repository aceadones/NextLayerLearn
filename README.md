<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=121212&height=180&section=header&text=NextLayer%20Learn&fontSize=50&fontColor=c4c2a6&fontAlignY=40&desc=AI-powered%20language%20learning%20on%20the%20go&descAlignY=65&descSize=16&animation=fadeIn" alt="NextLayer Learn header" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Hanken+Grotesk&weight=400&size=20&duration=3000&pause=800&color=c4c2a6&center=true&vCenter=true&width=600&lines=Learn+%E2%80%A2+Translate+%E2%80%A2+Speak;A+unified+AI+workspace+for+learning;React+Native+%2B+Express+%2B+Sarvam+AI" alt="Animated tagline"/>

<br/>

[![React Native](https://img.shields.io/badge/React_Native-0.84-121212?style=for-the-badge&logo=react&logoColor=c4c2a6&labelColor=000000)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-121212?style=for-the-badge&logo=typescript&logoColor=c4c2a6&labelColor=000000)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%E2%89%A522.11-121212?style=for-the-badge&logo=nodedotjs&logoColor=c4c2a6&labelColor=000000)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-121212?style=for-the-badge&logo=express&logoColor=c4c2a6&labelColor=000000)](https://expressjs.com/)

</div>

<br/>

> **NextLayer Learn** is an intelligent mobile learning companion designed to remove friction from language acquisition. It features guided learning flows, real-time translation, and voice-enabled AI tutoring powered by **[Sarvam AI](https://www.sarvam.ai/)**—all orchestrated behind a minimal Express proxy to keep execution secure and seamless.

<br/>

## ✦ Architecture

```yaml
stack:
  client: React Native (TypeScript) + Zustand + React Navigation
  server: Express 5 + Multer + Axios
  ai:     Sarvam (STT, chat, TTS)

highlights:
  - Tabbed app: Home, Learn, Translate, Profile
  - Speech-to-text, conversational tutor, text-to-speech
  - Persisted onboarding / preferences (Async Storage + Zustand persist)
```

<br/>

## ✦ Features

| Module | Description |
|:---|:---|
| **Home** | Entry hub and navigation into learning flows |
| **Learn** | AI-assisted teaching tuned for beginners and regional languages |
| **Translate** | Practical translation workflows in the app |
| **Profile** | User-facing settings and profile area |
| **Voice** | Record audio → STT; responses can be spoken via TTS |

<br/>

## ✦ Tech Stack

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="38" height="38"/>
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="38" height="38"/>
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="38" height="38"/>
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" width="38" height="38"/>
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" alt="Axios" width="38" height="38"/>
  &nbsp;&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg" alt="Babel" width="38" height="38"/>
</p>

<br/>

## ✦ Repository Layout

```text
NextLayer Learn/
├── app/                 # React Native client (NextLayerLearnApp)
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/    # API + Sarvam client helpers
│   │   ├── store/
│   │   └── ...
│   └── package.json
└── backend/             # Express API proxy
    ├── index.js
    └── package.json
```

<br/>

## ✦ Prerequisites

- **Node.js** ≥ 22.11 (see `app/package.json` `engines`)
- **Sarvam** API key ([Sarvam dashboard](https://www.sarvam.ai/))
- For mobile: **Xcode** (iOS) and/or **Android Studio** (Android), plus React Native environment setup per [official docs](https://reactnative.dev/docs/environment-setup)

<br/>

## ✦ Environment Variables

Create `backend/.env`:

```env
SARVAM_API_KEY=your_key_here
# optional
# PORT=3000
# SARVAM_CHAT_MODEL=sarvam-30b
```

The app expects the backend at **`http://localhost:3000`** (on Android emulator the client uses `http://10.0.2.2:3000`—see `app/src/services/api.ts`).

<br/>

## ✦ Run Locally

**Backend** (from `backend/`):

```bash
npm install
npm start
```

**App** (from `app/`):

```bash
npm install
npm start
# in another terminal
npm run ios      # or: npm run android
```

Health check: `GET http://localhost:3000/health` → `{ "ok": true }`

<br/>

## ✦ API (Proxy)

| Method | Path | Purpose |
|:------:|:-----|:--------|
| `POST` | `/stt` | Speech-to-text (multipart audio + language) |
| `POST` | `/chat` | Tutor chat (`message`, `language`, optional `history`) |
| `POST` | `/tts` | Text-to-speech (`text`, optional `language`, `speaker`) |

<br/>

## ✦ Scripts (App)

| Script | Description |
|:-------|:------------|
| `npm start` | Metro bundler |
| `npm run ios` / `npm run android` | Run on simulator / device |
| `npm run lint` | ESLint |
| `npm test` | Jest |

<br/>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=121212&height=60&section=footer&animation=fadeIn" alt="Footer" width="100%"/>

**[NextLayer Labs](https://nextlayer-labs.web.app/)** • Built with curiosity—PRs and issues welcome.

</div>
