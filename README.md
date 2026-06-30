# 🚀 Creator Copilot AI
**"Build Smarter. Faster. With AI."**

Creator Copilot AI is a premium, full-stack SaaS platform designed for creators. It acts as an AI Growth + Personalization Engine, helping users generate viral content and receive emotionally intelligent travel recommendations through the flagship **TravelMind AI** module.

## ✨ Features

- **🔥 One-Click Content Pack:** Generate hooks, scripts, captions, and CTAs in seconds.
- **📊 Viral Score Engine:** Predict the engagement potential of your content.
- **🔍 Trend Discovery AI:** Stay ahead with niche-specific viral trends.
- **✨ Content Improver:** Side-by-side comparison of AI-enhanced content.
- **🌍 TravelMind AI:** Emotion-aware travel recommendations for Maharashtra.
- **📈 Creator Dashboard:** Track your usage, viral scores, and subscription status.
- **💳 Pro Membership:** Upgrade via Razorpay for increased limits and premium models.

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Next.js API Routes, Upstash Redis (Rate Limiting)
- **AI:** NVIDIA NIM (Llama 3.1 8B/70B, Nemotron)
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Payments:** Razorpay Integration

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd creator-copilot-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file based on `.env.example`:
```env
# NVIDIA NIM
NVIDIA_API_KEY=your_nvidia_api_key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# (See .env.example for full list)

# Razorpay
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# Redis
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

### 4. Run the development server
```bash
npm run dev
```

## 💎 Demo Mode
The application includes a **Full Demo Fallback Mode**. If API keys are missing, the app will use mocked but realistic AI responses and simulated payment flows, allowing for a complete experience without initial setup.

## 📜 License
MIT License
