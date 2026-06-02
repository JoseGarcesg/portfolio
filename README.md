# 🚀 Professional Portfolio — Frontend

Personal portfolio web app built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. It dynamically integrates with a **Strapi v5** CMS as the content backend. If the backend is unavailable, the app automatically loads local mock data to ensure it is always functional.

---

## 📸 Screenshots

| Desktop | Mobile |
|---|---|
| See [`src/assets/desk_screenshot.pdf`](src/assets/desk_screenshot.pdf) | See [`src/assets/mobile_screenshot.pdf`](src/assets/mobile_screenshot.pdf) |

---

## ⚙️ Minimum Requirements

| Tool | Minimum Version |
|---|---|
| Node.js | `>= 20.0.0` |
| npm | `>= 6.0.0` |
| (Optional) Strapi backend | `5.x` with SQLite |

> **Note:** The Strapi backend is **optional**. If it is not running, the app will display mock data automatically without any errors.

---

## 🗂️ Project Structure

```
portfolio/
├── backend/          # Strapi v5 CMS (dynamic content)
└── frontend/         # React + Vite app (this directory)
    ├── src/
    │   ├── assets/           # Static assets and images
    │   ├── components/       # UI components (Hero, Header, Skills…)
    │   ├── hooks/            # Custom hooks (usePortfolio)
    │   ├── services/         # Service layer (portfolioService)
    │   └── utils/            # Utilities (strapiParser)
    ├── .env.example          # Environment variables reference
    └── package.json
```

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd portfolio
```

### 2. (Recommended) Start the Backend first

> ⚠️ **Important:** Start the backend **before** the frontend. If the frontend cannot connect to Strapi, it will load sample mock data instead of real content.

```bash
cd backend
npm install
npm run develop
```

The Strapi admin panel will be available at: `http://localhost:1337/admin`

To configure content in Strapi, see the detailed guide: [`strapi-cms-guide-en.md`](strapi-cms-guide-en.md)

### 3. Configure Frontend environment variables

```bash
cd frontend
cp .env.example .env
```

Edit the `.env` file with your values:

```env
VITE_STRAPI_URL=http://localhost:1337   # Strapi backend URL
VITE_USE_MOCK_DATA=false                # true = always use local mock data
```

### 4. Install Frontend dependencies

```bash
npm install
```

### 5. Run in development mode

```bash
npm run dev
```

The app will be available at: **`http://localhost:3000`**

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | TypeScript type checking |
| `npm run test` | Run unit tests with Vitest |

---

## 🔌 Behavior With and Without Backend

| Backend Status | Frontend Behavior |
|---|---|
| ✅ Strapi running at `localhost:1337` | Loads real data from the API |
| ❌ Strapi not available | Shows a warning banner and loads local mock data |
| `VITE_USE_MOCK_DATA=true` | Always uses local data, ignores Strapi |

The mock data fallback is automatic — the app never shows a blank page due to a missing backend connection.

---

## 🤖 AI Usage

This project was structured and developed with assistance from **Antigravity**, the AI coding assistant by Google DeepMind.

AI-assisted tasks include:
- Refactoring the frontend architecture into layers (hooks / services / utils)
- Strapi v5 API integration and response parsing
- Mock data fallback system design
- UX fixes (scroll behavior, navigation, category filters)

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Language | TypeScript 5.8 |
| Build Tool | Vite 6 |
| Styles | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| CMS Backend | Strapi v5 (SQLite) |
| Testing | Vitest + Testing Library |

---

## 📄 License

Personal portfolio project. All rights reserved.
