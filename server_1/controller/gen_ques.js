const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateQuestions(contents, limit = 5) {

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",

      systemInstruction: `
        You are a question generation AI.

        Generate ONE thoughtful question
        from the provided content.

        Return ONLY the question text.
      `,
    });

    const questions = [];

    // Loop through content array
    for (const content of contents) {

      // Stop once limit is reached
      if (questions.length >= limit) {
        break;
      }

      const result = await model.generateContent(content);

      // Get text response
      const question = result.response.text().trim();

      questions.push(question);
    }

    return {
      success: true,
      questions,
    };

  } catch (error) {

    console.error("Main Error:", error.message);

    return {
      success: false,
      message: "Failed to generate questions",
    };
  }
}

module.exports = { generateQuestions };