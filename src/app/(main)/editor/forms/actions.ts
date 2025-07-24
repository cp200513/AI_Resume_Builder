"use server";

import genAI from "@/lib/gemini";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";

// Gemini model instance
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateSummary(input: GenerateSummaryInput) {
  const { jobtitle, workExperiences, education, skills } =
    generateSummarySchema.parse(input);

  const systemInstruction = `
You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
Only return the summary and do not include any other information in the response. Keep it concise and professional.
`;

  const userMessage = `
Please generate a professional resume summary from this data:

Job title: ${jobtitle || "N/A"}

Work experience:
${workExperiences
  ?.map(
    (exp) => `
Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

Description:
${exp.description || "N/A"}
`,
  )
  .join("\n\n")}

Education:
${education
  ?.map(
    (edu) => `
Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
`,
  )
  .join("\n\n")}

Skills:
${skills?.join(", ") || "N/A"}
`;

  const prompt = `${systemInstruction}\n\n${userMessage}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    if (!aiResponse) {
      throw new Error("Empty response from Gemini API");
    }

    return aiResponse;
  } catch (error) {
    console.error("generateSummary error:", error);
    throw new Error("Failed to generate summary. Please try again later.");
  }
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
): Promise<WorkExperience> {
  const { description } = generateWorkExperienceSchema.parse(input);

  const systemInstruction = `
You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

Job title: <job title>
Company: <company name>
Start date: <format: YYYY-MM-DD> (only if provided)
End date: <format: YYYY-MM-DD> (only if provided)
Description: <an optimized description in bullet format, might be inferred from the job title>
`;

  const userMessage = `
Please provide a work experience entry from this description:
${description}
`;

  const prompt = `${systemInstruction}\n\n${userMessage}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    if (!aiResponse) {
      throw new Error("Empty response from Gemini API");
    }

    console.log("AI Response:", aiResponse);

    return {
      position: aiResponse.match(/Job title:\s*(.*)/i)?.[1]?.trim() || "",
      company: aiResponse.match(/Company:\s*(.*)/i)?.[1]?.trim() || "",
      description: (aiResponse.match(/Description:\s*([\s\S]*)/i)?.[1] || "")
        .trim()
        .replace(/^\s*[-*]\s*/gm, "• "),
      startDate: aiResponse.match(/Start date:\s*(\d{4}-\d{2}-\d{2})/i)?.[1],
      endDate: aiResponse.match(/End date:\s*(\d{4}-\d{2}-\d{2})/i)?.[1],
    };
  } catch (error) {
    console.error("generateWorkExperience error:", error);
    throw new Error("Failed to generate work experience. Please try again.");
  }
}
