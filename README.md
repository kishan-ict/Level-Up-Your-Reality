<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-8b5cf6?style=for-the-badge&labelColor=0a0a0a" />
<img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&labelColor=0a0a0a" />
<img src="https://img.shields.io/badge/Firebase-Realtime-ffca28?style=for-the-badge&logo=firebase&labelColor=0a0a0a" />
<img src="https://img.shields.io/badge/Gemini_AI-Powered-4285f4?style=for-the-badge&logo=google&labelColor=0a0a0a" />
<img src="https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge&labelColor=0a0a0a" />

<br/><br/>

```
██╗     ███████╗██╗   ██╗███████╗██╗         ██╗   ██╗██████╗ 
██║     ██╔════╝██║   ██║██╔════╝██║         ██║   ██║██╔══██╗
██║     █████╗  ██║   ██║█████╗  ██║         ██║   ██║██████╔╝
██║     ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║         ██║   ██║██╔═══╝ 
███████╗███████╗ ╚████╔╝ ███████╗███████╗    ╚██████╔╝██║     
╚══════╝╚══════╝  ╚═══╝  ╚══════╝╚══════╝     ╚═════╝ ╚═╝     
                                                                
    ██╗   ██╗ ██████╗ ██╗   ██╗██████╗     ██████╗ ███████╗ █████╗ ██╗     ██╗████████╗██╗   ██╗
    ╚██╗ ██╔╝██╔═══██╗██║   ██║██╔══██╗    ██╔══██╗██╔════╝██╔══██╗██║     ██║╚══██╔══╝╚██╗ ██╔╝
     ╚████╔╝ ██║   ██║██║   ██║██████╔╝    ██████╔╝█████╗  ███████║██║     ██║   ██║    ╚████╔╝ 
      ╚██╔╝  ██║   ██║██║   ██║██╔══██╗    ██╔══██╗██╔══╝  ██╔══██║██║     ██║   ██║     ╚██╔╝  
       ██║   ╚██████╔╝╚██████╔╝██║  ██║    ██║  ██║███████╗██║  ██║███████╗██║   ██║      ██║   
       ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝  
```

### 🎮 Turn your real life into an RPG. Track habits. Complete quests. Level up yourself.

**[Live Demo](#) · [Report a Bug](../../issues) · [Request Feature](../../issues)**

</div>

---

## ⚔️ What is Level Up Your Reality?

**Level Up Your Reality** is a gamified productivity and self-improvement platform inspired by the *Solo Leveling* universe. It transforms your real-life tasks, habits, and goals into **RPG-style quests** — with XP, levels, stats, and an AI companion that adapts to your growth.

Stop using boring to-do apps. Become the main character.

> 💡 Complete quests → Earn XP → Level up your stats → Unlock your best self.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗡️ **Quest System** | Create tasks as quests with difficulty tiers (Easy / Medium / Hard) |
| 📊 **RPG Stats** | Track Strength, Intelligence, Discipline & Social as real character stats |
| 🤖 **AI Panel (Gemini)** | AI-powered quest suggestions based on your weakest stats |
| 🔥 **XP & Leveling** | Complete quests to earn XP and level up your character |
| 📈 **Progress Charts** | Weekly XP growth visualized with beautiful charts (Recharts) |
| 🔐 **Firebase Auth** | Secure Google Authentication with real-time data sync |
| 🌐 **Realtime Database** | Live updates via Firestore — no refresh needed |
| 🎨 **Solo Leveling UI** | Dark brutalist design with purple glow, radar charts & animations |

---

## 🛠️ Tech Stack

```
Frontend       →  React 19 + TypeScript + Vite
Styling        →  Tailwind CSS v4
Animations     →  Motion (Framer Motion)
Charts         →  Recharts
Icons          →  Lucide React
Backend        →  Firebase (Auth + Firestore)
AI Engine      →  Google Gemini API (@google/genai)
Server         →  Express.js + TSX
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** v18+
- **npm** or **yarn**
- A **Firebase** project
- A **Google Gemini API** key

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Level-Up-Your-Reality.git
cd Level-Up-Your-Reality
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example env file and fill in your keys:

```bash
cp .env.example .env
```

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Configure Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable **Authentication** (Google Sign-In)
- Enable **Firestore Database**
- Copy your Firebase config into `src/firebase-applet-config.json`

```json
{
  "apiKey": "...",
  "authDomain": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}
```

### 5. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` and start your journey. ⚔️

---

## 📁 Project Structure

```
Level-Up-Your-Reality/
├── src/
│   ├── components/
│   │   ├── AIPanel.tsx         # Gemini AI quest suggestions
│   │   ├── LandingPage.tsx     # Auth / hero screen
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── ProgressChart.tsx   # Weekly XP chart
│   │   ├── QuestCard.tsx       # Individual quest UI
│   │   ├── Stats.tsx           # Radar chart + stat cards
│   │   └── UI.tsx              # Reusable UI components
│   ├── services/
│   │   ├── firebaseService.ts  # Firestore CRUD operations
│   │   └── geminiService.ts    # Gemini AI integration
│   ├── firebase.ts             # Firebase initialization
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # Helper functions
│   └── App.tsx                 # Root component
├── server.ts                   # Express dev server
├── firestore.rules             # Database security rules
├── .env.example                # Environment template
└── vite.config.ts              # Vite configuration
```

---

## 🤖 AI-Powered Features

The **AI Panel** uses **Google Gemini** to:

- 🎯 Analyze your current RPG stats
- 💡 Suggest 3 personalized daily quests targeting your weakest areas
- 🏆 Give Solo Leveling-themed motivational feedback

The AI acts as your in-game System — giving you quests that push you to grow.

---

## 🎮 How It Works

```
1. Sign in with Google
2. Your player profile is created automatically
3. Create quests (or let AI suggest them)
4. Complete quests → earn XP → grow your stats
5. Track your weekly progress on the Progress tab
6. Keep your streak alive and reach new levels
```

---

## 🔒 Firestore Security Rules

The app includes proper Firestore rules to ensure users can only read/write their own data. See `firestore.rules` for the full configuration.

---

## 🧩 Roadmap

- [ ] Habit tracker (daily recurring quests)
- [ ] Gates system (boss challenges / weekly goals)
- [ ] Guild / social features
- [ ] Inventory & reward system
- [ ] Mobile app (React Native)
- [ ] Leaderboard

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
1. Fork the repo
2. Create your feature branch → git checkout -b feature/AmazingFeature
3. Commit your changes → git commit -m 'Add AmazingFeature'
4. Push to the branch → git push origin feature/AmazingFeature
5. Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🙌 Acknowledgements

- Inspired by the manhwa **Solo Leveling** by Chugong
- UI powered by [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- Backend by [Firebase](https://firebase.google.com/)

---

<div align="center">

**Built with ❤️ for the grinders who never stop leveling up.**

⭐ Star this repo if it motivates you to level up your reality!

</div>
