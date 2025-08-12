import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { System_PROMPT } from "@/lib/prompt";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const fullPrompt = `
${System_PROMPT}

User request:
${prompt}

Return only valid JSON without explanation.
Example:
{"id": "rule-1754920856507","name": "Co-run T1 to T3","type": "coRun","tasks": ["T1","T2","T3"]}
If invalid or incomplete, return exactly: error
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        temperature: 0.5,
        systemInstruction: System_PROMPT,
      },
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

    if (text.toLowerCase() === "error") {
      console.error("Error occurred:", text);
      return NextResponse.json(
        { error: "Failed to generate content" },
        { status: 500 }
      );
    }

    let data;
    try {
      // remove code fences if any
      const cleaned = text.replace(/```json|```/g, "").trim();
      data = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse error:", err, text);
      return NextResponse.json(
        { error: "Invalid JSON returned from model" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}