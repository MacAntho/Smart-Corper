
import { GoogleGenAI } from "@google/genai";

// Fixed to follow latest @google/genai guidelines
export const generateNYSCAdvice = async (userQuery: string): Promise<string> => {
  try {
    // Initializing directly from process.env.API_KEY as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelId = 'gemini-3-flash-preview'; 

    const systemPrompt = `
      You are the "NYSC Smart Companion AI", a helpful and knowledgeable guide for Nigerian Corps Members.
      Your goal is to provide accurate, empathetic, and clear advice about the National Youth Service Corps (NYSC).
      
      Key knowledge areas:
      - Camp registration and survival (Maami market, drilling).
      - PPA (Place of Primary Assignment) negotiation and work ethics.
      - CDS (Community Development Service) projects.
      - Biometric clearance procedures.
      - Relocation and redeployment rules.
      
      Tone: Friendly, encouraging, respectful ("Corper", "Compatriot"), but professional.
      Format: Use markdown for bullet points if listing steps. Keep answers concise (under 150 words usually).
      
      If the user asks about illegal activities (ghosting, forging medical reports), strongly advise against it and explain the penalties (Extension of service).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      config: {
        systemInstruction: systemPrompt,
      },
      contents: userQuery,
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the server. Please try again later.";
  }
};

export const generateCDSProposal = async (projectTitle: string, category: string): Promise<string> => {
  try {
    // Initializing directly from process.env.API_KEY as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelId = 'gemini-3-pro-preview'; 

    const systemPrompt = `
      You are an expert project consultant for the NYSC Community Development Service (CDS) program.
      Generate a professional and concise project proposal draft for a corps member.
      
      Structure:
      1. Introduction (Objective)
      2. Problem Statement
      3. Proposed Solution
      4. Estimated Budget Breakdown
      5. Expected Impact
      
      Tone: Formal, structured, and convincing.
    `;

    const prompt = `Create a CDS proposal for a project titled "${projectTitle}" in the "${category}" category.`;

    const response = await ai.models.generateContent({
      model: modelId,
      config: {
        systemInstruction: systemPrompt,
      },
      contents: prompt,
    });

    return response.text || "Failed to generate proposal draft.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating proposal.";
  }
};
