<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=200&section=header&text=NextLayer%20Learn&fontSize=42&fontAlignY=32&desc=AI-powered%20language%20learning%20on%20the%20go&descAlignY=51&animation=twinkling" alt="NextLayer Learn header" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=3000&pause=800&color=1F6FEB&center=true&vCenter=true&width=600&lines=Learn+%E2%80%A2+Translate+%E2%80%A2+Speak;React+Native+%2B+Express+%2B+Sarvam+AI" alt="Animated tagline"/>

<br/>

[![React Native](https://img.shields.io/badge/React_Native-0.84-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-%E2%89%A522.11-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## About the project

**NextLayer Learn** is a mobile learning companion: onboarding for language choice, guided **Learn** flows, **Translate**, and **Profile**—with voice and AI tutoring powered by **[Sarvam AI](https://www.sarvam.ai/)** behind a small Express proxy so API keys stay on the server.

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

---

## Features

| | |
|:---:|:---|
| **Home** | Entry hub and navigation into learning flows |
| **Learn** | AI-assisted teaching tuned for beginners and regional languages |
| **Translate** | Practical translation workflows in the app |
| **Profile** | User-facing settings and profile area |
| **Voice** | Record audio → STT; responses can be spoken via TTS |

---

## Tech stack

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="42" height="42"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="42" height="42"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="42" height="42"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" width="42" height="42"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" alt="Axios" width="42" height="42"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg" alt="Babel" width="42" height="42"/>
</p>

---

## Repository layout

```
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

---

## Prerequisites

- **Node.js** ≥ 22.11 (see `app/package.json` `engines`)
- **Sarvam** API key ([Sarvam dashboard](https://www.sarvam.ai/))
- For mobile: **Xcode** (iOS) and/or **Android Studio** (Android), plus React Native environment setup per [official docs](https://reactnative.dev/docs/environment-setup)

---

## Environment variables

Create `backend/.env`:

```env
SARVAM_API_KEY=your_key_here
# optional
# PORT=3000
# SARVAM_CHAT_MODEL=sarvam-30b
```

The app expects the backend at **`http://localhost:3000`** (on Android emulator the client uses `http://10.0.2.2:3000`—see `app/src/services/api.ts`).

---

## Run locally

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

---

## API (proxy)

| Method | Path | Purpose |
|:------:|:-----|:--------|
| `POST` | `/stt` | Speech-to-text (multipart audio + language) |
| `POST` | `/chat` | Tutor chat (`message`, `language`, optional `history`) |
| `POST` | `/tts` | Text-to-speech (`text`, optional `language`, `speaker`) |

---

## Scripts (app)

| Script | Description |
|:-------|:------------|
| `npm start` | Metro bundler |
| `npm run ios` / `npm run android` | Run on simulator / device |
| `npm run lint` | ESLint |
| `npm test` | Jest |

---

## Credits & inspiration

- UI polish ideas and README flair: [How to Design an Attractive GitHub Profile Readme](https://dev.to/thepiyushmalhotra/how-to-design-an-attractive-github-profile-readme-1ppg) (capsule-render, badges, DevIcons, structure)
- Animated line: [readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg)
- Icons: [DevIcon](https://devicon.dev/)

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=120&section=footer&animation=twinkling" alt="Footer wave" width="100%"/>

**Built with curiosity—PRs and issues welcome.**

</div>
