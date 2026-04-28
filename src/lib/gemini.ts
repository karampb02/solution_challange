import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function getEmbedding(text: string): Promise<number[]> {
    try {
        const model = genAI.getGenerativeModel({ model: "embedding-001" });
        const result = await model.embedContent(text);
        return result.embedding.values;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw new Error("Failed to generate embedding");
    }
}

export async function generateInsights(
    candidateName: string,
    role: string,
    projectDescription: string
): Promise<string[]> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `You are a technical recruiter analyzing candidate fit for a role.

Candidate: ${candidateName}
Target Role: ${role}
Project Description: ${projectDescription}

Generate 3-4 key insights about how this candidate could contribute to this project. Be specific and actionable.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text.split("\n").filter((line) => line.trim().length > 0);
    } catch (error) {
        console.error("Error generating insights:", error);
        return [
            "Unable to generate insights at this time",
            "Please check API configuration",
        ];
    }
}

export async function suggestInterviewQuestions(
    candidateBackground: string,
    role: string
): Promise<string[]> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `You are an experienced technical interviewer. Based on the following candidate background and role, suggest 5 specific, technical interview questions that would help assess their fit.

Candidate Background: ${candidateBackground}
Target Role: ${role}

Format as a numbered list.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text
            .split("\n")
            .filter((line) => line.trim().match(/^\d+\./))
            .map((line) => line.replace(/^\d+\.\s*/, ""));
    } catch (error) {
        console.error("Error generating questions:", error);
        return [
            "1. Tell us about your experience with distributed systems",
            "2. How do you approach debugging production issues?",
            "3. Describe a time you led an architectural decision",
        ];
    }
}
