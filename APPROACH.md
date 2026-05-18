# Approach

## 1. System Prompt Structure
The system prompt is designed to provide clear, rigid constraints for the LLM. It defines:
- The role of the agent as a "layout transformation agent".
- **Canvas Rules**: Specifically detailing how `nx`, `ny`, `nw`, and `nh` (normalized coordinates) relate to the absolute values (`x`, `y`, `width`, `height`) based on the artboard dimensions.
- **Semantic Roles**: Context clues for identifying the primary components of the design layout, such as the "product", "headline", "background", and "badges".
- **Transformation Rules**: High-level instructions on what calculations need to occur for certain commands (e.g. changing aspect ratio).
- **Strict Output Format**: By strictly requiring a JSON object containing `explanation` and `updatedLayout` fields, the response can be predictably parsed by the backend.

## 2. Safe JSON Transformations
To handle JSON transformations safely, the backend validates the LLM response output:
- It checks that the returned JSON contains the required top-level keys.
- `jsonValidator.js` is used to ensure the `updatedLayout` structure has `rootNodes` and a `nodes` map.
- By providing the `response_format: { type: "json_object" }` flag to the OpenAI API, we leverage the model's native capability to return valid JSON, significantly reducing parsing errors. 
- In a production environment, transformations like `resizeArtboard` could be extracted into strict server-side tools (or function calls) to ensure zero math hallucinations from the LLM, but for this agent, the LLM is trusted with layout computations guided by the system prompt, supported by fallback/simulation code if the API key is not present.

## 3. Maintaining Conversation Context
The chat context is maintained by the frontend `useLayoutAgent` hook:
- The `messages` array stores the history of user and assistant exchanges.
- To prevent the context window from growing too large (and reducing API costs), only the last 6 messages (`messages.slice(-6)`) are sent to the backend as the conversation history.
- The system prompt contains the *current* layout, and the history provides context on previous actions, allowing the LLM to resolve pronouns like "make *it* smaller".

## Trade-offs and Future Improvements
- **LLM Math Limitations**: LLMs are known to sometimes hallucinate math operations. A better long-term approach would be to use OpenAI Tool Calling (Functions) where the LLM responds with `{"tool": "resizeArtboard", "width": 1080, "height": 1920}` and the backend performs the deterministic math using the `layoutTransforms.js` helpers. 
- **API Key Required**: The system currently falls back to a limited simulation if no API key is provided, but full functionality requires a valid `OPENAI_API_KEY`.
