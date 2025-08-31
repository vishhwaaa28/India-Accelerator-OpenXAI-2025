# OpenxAI Global AI Accelerator Example Submission

## Overview

Add your Next.js / Python + Ollama AI model application here!

## Submission Requirements

Make sure to include the following details in your README:

### Folder Structure
0009_Music-Genre-Classifier/
├── app/
│   ├── api/
│   │   └── classify/route.ts     # Next.js API route to interact with Ollama
│   ├── components/
│   │   └── AudioClassifier.tsx   # Frontend audio upload & feature extraction
│   ├── globals.css               # Tailwind setup
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── public/
│   └── ... (any assets if needed)
├── .env.local                    # Environment variables (Ollama model + base URL)
├── package.json
├── tailwind.config.js
└── README.md


### Project Information
- **Name** Vishwanath Mishra
- **Project Name** Music Genre Classifier
- **Project Description** A Next.js + Ollama-powered web app that analyzes any uploaded audio file, extracts audio features (MFCC, chroma, spectral stats, BPM, ZCR, etc.) in the browser using **Meyda**, and then uses a local **Ollama LLM** to classify the music genre.  
  The app outputs the **genre, subgenres, mood, confidence, and reasoning**, making it useful for DJs, playlist curators, and music lovers.  
- **Track**: Generative AI + Audio Intelligence  



## Happy Hacking! 🚀

---

*This is an example submission template for the OpenxAI Global AI Accelerator.*