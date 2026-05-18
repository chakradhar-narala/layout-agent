import express from 'express';
import { buildSystemPrompt } from '../prompts/systemPrompt.js';
import { callLLM } from '../services/llmService.js';
import { validateLayout } from '../utils/jsonValidator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, layout, history } = req.body;

    if (!message || !layout) {
      return res.status(400).json({ error: 'Message and layout are required' });
    }

    const systemPrompt = buildSystemPrompt(layout);
    
    // Call LLM
    const llmResponse = await callLLM(systemPrompt, history || [], message);
    
    // Validate the response shape
    if (!llmResponse.updatedLayout) {
      throw new Error("LLM did not return an updatedLayout");
    }

    validateLayout(llmResponse.updatedLayout);

    res.json({
      explanation: llmResponse.explanation || "Done.",
      updatedLayout: llmResponse.updatedLayout
    });

  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'Failed to process layout transformation', details: error.message });
  }
});

export default router;
