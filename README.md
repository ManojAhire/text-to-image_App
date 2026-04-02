# AI Image Generator 🎨

A world-class, modern AI image generation application built with React, Vite, and Hugging Face's Stable Diffusion XL.

![AI Image Generator Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200)

## ✨ Features

- **Premium UI:** "Midnight Stealth" dark theme with high-end glassmorphism and cinematic animations.
- **AI Powered:** Integrated with Stable Diffusion XL via Hugging Face's Inference Router.
- **UX Focused:** 
  - Dynamic rotating loading messages.
  - Smooth, scale-based fade-in transitions.
  - Automatic memory management (URL Revocation).
  - Fully responsive and mobile-optimized.
- **Secure:** Environment-variable-based token management.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A Hugging Face API Token (Free)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ManojAhire/text-to-image_App.git
   cd text-to-image_App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_HF_TOKEN=your_hugging_face_token_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment (Vercel)

This project is optimized for Vercel with built-in proxying to bypass CORS.

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. **Important:** Add `VITE_HF_TOKEN` to your Vercel Project Settings > Environment Variables.
4. Deploy!

## 🛠️ Built With

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- [Stable Diffusion XL](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)

## 📄 License

MIT
