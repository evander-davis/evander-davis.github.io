
import { GoogleGenAI, Chat, GenerateContentResponse, HarmCategory, HarmBlockThreshold, GenerateContentParameters } from "@google/genai";
import { MISSION_COMMAND_SYSTEM_PROMPT, PLANET_DATA } from '../constants';
import { Planet } from "../types";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const MODEL_NAME = "gemini-2.5-flash-preview-04-17";

const getApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("Gemini API Key (process.env.API_KEY) is not set. API calls will fail.");
    throw new Error("API_KEY_MISSING");
  }
  return apiKey;
};

const initializeAi = () => {
  if (!ai) {
    try {
      const apiKey = getApiKey();
      ai = new GoogleGenAI({ apiKey });
    } catch (error) {
      console.error("Failed to initialize GoogleGenAI:", error);
      if (error instanceof Error && error.message === "API_KEY_MISSING") {
         throw new Error("Gemini API Key is not configured. Please contact support or check your environment setup.");
      }
      throw new Error("Failed to initialize AI services. Check console for details.");
    }
  }
};


export const initChatWithSystemPrompt = async (): Promise<void> => {
  initializeAi();
  if (!ai) throw new Error("AI service not initialized.");

  // If chat is already initialized, don't re-initialize.
  if (chat) {
    return;
  }

  const planetDetailsContext = PLANET_DATA.map(p => 
    `${p.name} (${p.distanceAU} AU): Orbital Period: ${p.orbitalPeriod}, Surface Temp: ${p.surfaceTempC}, Diameter: ${p.diameterEarths}x Earth.`
  ).join('\n');
  
  const fullSystemPrompt = `${MISSION_COMMAND_SYSTEM_PROMPT}\n\nPLANET PHYSICAL DATA OVERVIEW FOR YOUR REFERENCE (guide student to interpret spectra for atmosphere):\n${planetDetailsContext}`;

  try {
    chat = ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: fullSystemPrompt,
        safetySettings: [ 
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ],
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    console.log("Chat session with Mission Command initialized.");
  } catch (error) {
    console.error("Error creating chat session:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("Invalid Gemini API Key. Please check your API Key.");
    }
    throw new Error("Could not establish communication with Mission Command.");
  }
};

export const sendMessageToGemini = async (userMessage: string, currentPlanet: Planet): Promise<string> => {
  if (!chat) {
    console.warn("Chat was not initialized when sendMessageToGemini was called. Attempting to initialize.");
    await initChatWithSystemPrompt(); 
    if (!chat) {
        console.error("Chat could not be initialized in sendMessageToGemini.");
        throw new Error("Mission Command is unavailable. Chat session could not be started.");
    }
  }
  
  const contextualMessage = `The student is currently focused on planet ${currentPlanet.name} (Distance: ${currentPlanet.distanceAU} AU, Temp: ${currentPlanet.surfaceTempC}). Their message is: "${userMessage}" Refer to the planet's spectrum display (spectra image) for this planet.`;

  try {
    const result: GenerateContentResponse = await chat.sendMessage({ message: contextualMessage });
    return result.text;
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
             throw new Error("Invalid Gemini API Key. Cannot contact Mission Command.");
        }
        if (error.message.toLowerCase().includes("quota") || (error as any)?.status === 429) {
            throw new Error("Mission Command is currently overwhelmed (Rate limit or quota exceeded). Please try again shortly.");
        }
    }
    throw new Error("Mission Command communication failed. Please try again.");
  }
};

export const getBasicAnswer = async (prompt: string): Promise<string> => {
  initializeAi();
  if (!ai) throw new Error("AI service not initialized.");

  const params: GenerateContentParameters = {
    model: MODEL_NAME,
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 0 } 
    }
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent(params);
    return response.text;
  } catch (error) {
    console.error('Error getting basic answer from Gemini:', error);
    throw new Error("Failed to get response from AI service.");
  }
};