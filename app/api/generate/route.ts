
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import {  System_PROMPT } from "@/lib/prompt";
const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
	const { prompt } = await req.json();
	const response = await ai.models.generateContent({
		model: "gemini-2.5-pro",
		config: {
			temperature: 0.8,
			systemInstruction: System_PROMPT,
		},
		contents:
			prompt 
	});
    console.log(response.text)
    const data = JSON.parse(response.text!);
    console.log(data);
    return NextResponse.json({ data });
}

