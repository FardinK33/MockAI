# Mock AI

**Mock AI** is an AI-powered voice-based job interview simulator that uses Google Gemini API to conduct adaptive interviews, analyze candidate responses, and provide structured feedback. The project is built as a full-stack monorepo with separate frontend and backend folders.

---

## 🎙️ How It Works

Mock AI simulates a voice-based interview experience. Here's how the interaction flow works:

✅ AI Asks a Question
The AI interviewer will speak one question at a time.
During this, your microphone is disabled.

🎤 Mic is Enabled Automatically
Once the AI finishes speaking, your microphone is automatically enabled to listen for your answer.

🗣️ Speak Your Answer
Answer the question clearly and naturally.
When you're done, click the Mic button to submit your response.

🔊 Replay the Question (Optional)

If you didn’t catch the question, click the Speaker button to replay it.

⚠️ This will reset your current answer, and you'll need to respond again.

🔄 Continue the Interview
The AI responds to your input and asks the next question.
The loop continues until a total of 10 questions have been asked.

🛑 Manually Stop the Interview (Optional)
You can end the interview at any time by clicking the End Call button.
The system will immediately stop and generate a performance summary.

📊 Output
At the end of the interview, the backend returns a structured JSON analysis that includes:

🔹 Summary of the candidate's performance

✅ Strengths

⚠️ Weaknesses

🏷️ Tags (technical topics)

📈 Skill Scores: Communication, Problem Solving, Technical Skill

⭐ Overall Rating (0–5 scale)

## Project Structure

```
MockAI/
├── backend/ # Express API server handling AI sessions and analysis
├── frontend/ # React app with voice interaction using Speech Recognition & Text-to-Speech
└── README.md # This file
```

## Features

- AI-driven dynamic interviews with contextual, adaptive questioning (up to 10 questions)
- Real-time voice interaction using React Speech Recognition and Text-to-Speech APIs
- RESTful backend managing interview sessions, questions, and structured AI analysis responses
- Structured JSON feedback evaluating strengths, weaknesses, and skills
- State management with Zustand for seamless multi-step interview flow

---

## Tech Stack

- **Backend:** Node.js, Express, Google Gemini API
- **Frontend:** React, React Speech Recognition, Web Speech API, Zustand
- **Other:** UUID, dotenv

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Google Gemini API key (set as `GEMINI_KEY` in `.env` file for backend)

---

### Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your Gemini API key
npm start


Setup Frontend
cd frontend
npm install
npm start

Usage
Start backend server first

Then run frontend app

Use voice commands to interact with the AI interviewer. After the

The interview runs for a maximum of 10 questions, then you get a structured analysis report
```
