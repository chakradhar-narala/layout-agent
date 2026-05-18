# Chat-Based Layout Agent

A web application where users can interact with an AI assistant to modify a design layout using natural language commands. The application features a real-time wireframe preview and live JSON updates.

## Prerequisites

- Node.js v18+
- An OpenAI API Key (`OPENAI_API_KEY`)

## Setup Instructions

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd layout-agent
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_key_here
   PORT=3001
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   Open a new terminal window:
   ```bash
   cd client
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## How to Use

Once both servers are running, open your browser to `http://localhost:5173`.
You will see a wireframe preview of the layout on the right and a chat interface on the left.

Try asking the agent to:
- "Convert this design to 9:16"
- "Move the headline to the bottom"
- "Make the headline smaller"
- "Make the discount badge bigger"

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS v4
- **Backend**: Node.js, Express
- **LLM**: OpenAI GPT-4o
