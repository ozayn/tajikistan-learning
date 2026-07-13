# Tajikistan Learning App

A modern, minimal learning app about Tajikistan—its history, culture, politics, language, cities, and photography workshop preparation.

**Features:**
- 📚 6 comprehensive sections: History, Culture, Politics, Language, Cities, Photography
- 🗣️ Tajik phrases with Cyrillic script, transliteration, and Farsi translations
- 🔊 Audio pronunciation via OpenAI Text-to-Speech API
- 🎨 Clean, reductive design with minimal typography
- 🌍 Learn about Dushanbe, Khujand, and Khorog
- 🇷🇸 Cyrillic guide for Serbian speakers

## Setup

### Local Development

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
   REACT_APP_OPENAI_KEY=sk_...
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

## Audio Pronunciation Setup

The app includes 🔊 buttons to hear Tajik pronunciation using OpenAI's TTS API:

1. Get your OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Add it to `.env.local` as `REACT_APP_OPENAI_KEY`
3. Audio buttons will be enabled automatically

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
