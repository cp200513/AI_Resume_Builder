import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config";

// Get the API key from your .env file
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

// Initialize the GoogleGenerativeAI client with the API key
const genAI = new GoogleGenerativeAI(apiKey);

// Export the initialized client as the default export
export default genAI;
