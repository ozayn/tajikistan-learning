# Tajikistan Learning App

A modern, minimal learning app about Tajikistan—its history, culture, politics, language, cities, and photography workshop preparation.

**Features:**
- 📚 6 comprehensive sections: History, Culture, Politics, Language, Cities, Photography
- 🗣️ Tajik phrases with Cyrillic script, transliteration, and Farsi translations
- 🔊 Audio pronunciation via OpenAI Text-to-Speech API
- 🎨 Clean, reductive design with minimal typography
- 📱 Fully responsive mobile-first design
- 🇷🇸 Cyrillic guide for Serbian speakers
- 🌐 Progressive Web App (PWA) — installable on mobile & desktop
- 🌍 Learn about Dushanbe, Khujand, and Khorog

## Setup

### Quick Start (Recommended)

**macOS/Linux:**
```bash
./run.sh
```

**Windows:**
```cmd
run.bat
```

The setup script will:
- Check Node.js version (16+)
- Install dependencies
- Set up `.env.local` with your OpenAI key
- Start the dev server at `http://localhost:5173`

### Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` for audio:**
   ```bash
   cp .env.example .env.local
   ```
   Then add your OpenAI API key:
   ```
   VITE_OPENAI_KEY=sk_...
   ```

3. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173)

4. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

## Audio & PWA Features

**Audio Pronunciation:**
- 🔊 Click buttons in Language section to hear Tajik words
- Get your OpenAI API key from [platform.openai.com](https://platform.openai.com)
- Add it to `.env.local` as `VITE_OPENAI_KEY`

**Progressive Web App (PWA):**
- 📱 Install as app on mobile or desktop
- ⚡ Works offline (caches content automatically)
- 🎯 Home screen icon and app shortcut
- 📲 Full-screen immersive experience

## Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/yourusername/tajikistan-learning.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `REACT_APP_OPENAI_KEY` = your OpenAI key
   - Deploy!

### Option 2: Direct Vercel Deployment

```bash
npm install -g vercel
vercel
```

Follow the prompts and add your OpenAI key in the Vercel dashboard.

## Tech Stack

- **React 18** + TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for minimal design
- **OpenAI API** for text-to-speech

## Content

- **History:** From ancient Achaemenid Empire to modern Tajikistan
- **Culture:** Cuisine, music, textiles, traditions, holidays
- **Politics:** Government, civil war reconciliation, current affairs
- **Language:** Tajik phrases, Cyrillic guide, Farsi cognates, proverbs
- **Cities:** Detailed guides for Dushanbe, Khujand, Khorog
- **Photography:** Workshop prep, cultural considerations, visual opportunities

## Learning Notes

This app emphasizes **Farsi connections** since you speak the language—many words are cognates or share cultural roots. The **Cyrillic script** is explained for those familiar with Serbian Cyrillic.

Enjoy preparing for your September trip to Tajikistan! 🏔️
