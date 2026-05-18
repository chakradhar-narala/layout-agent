import { GoogleGenAI } from '@google/genai';

// We switched to Google Gemini API since it has a robust free tier
// without requiring upfront billing!

export async function callLLM(systemPrompt, history, userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn("NO GEMINI_API_KEY PROVIDED. Returning simulated response.");
    return simulateResponse(systemPrompt, userMessage);
  }

  const ai = new GoogleGenAI({ apiKey });

  // Format history for Gemini SDK
  const geminiHistory = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  geminiHistory.push({ role: 'user', parts: [{ text: userMessage }] });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: geminiHistory,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("LLM Error:", error);
    throw new Error(`Failed to communicate with LLM: ${error.message}`);
  }
}

// Fallback logic to test functionality without API Keys
function simulateResponse(systemPrompt, userMessage) {
  let layout = null;
  try {
    const layoutStr = systemPrompt.split('CURRENT LAYOUT:\n')[1];
    layout = JSON.parse(layoutStr);
  } catch (e) {
    return {
      explanation: "Error parsing layout for simulation.",
      updatedLayout: layout
    };
  }

  if (userMessage.toLowerCase().includes('9:16')) {
    const newWidth = 1080;
    const newHeight = 1920;
    const rootId = layout.rootNodes[0];
    const artboard = layout.nodes[rootId];
    
    artboard.width = newWidth;
    artboard.height = newHeight;
    artboard.children.forEach((childId) => {
      const node = layout.nodes[childId];
      node.x = node.nx * newWidth;
      node.y = node.ny * newHeight;
      node.width = node.nw * newWidth;
      node.height = node.nh * newHeight;
    });

    return {
      explanation: "I've converted the layout to 9:16 aspect ratio (1080x1920).",
      updatedLayout: layout
    };
  }

  return {
    explanation: "Simulation: I received your message but I don't have an API key to process complex instructions. Try 'Convert to 9:16'.",
    updatedLayout: layout
  };
}
