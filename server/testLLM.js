import 'dotenv/config';
import { callLLM } from './services/llmService.js';

async function test() {
  try {
    const res = await callLLM('Return {"updatedLayout": {}, "explanation": "done"} strictly as JSON.', [], 'test');
    console.log("Success:", res);
  } catch(e) {
    console.error("Error:", e);
  }
}

test();
