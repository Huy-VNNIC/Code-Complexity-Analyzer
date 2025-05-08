require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getRefactoringAdvice(functionName, code, complexity, language) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: `You are an expert code reviewer specializing in code complexity reduction and refactoring.
                   Provide specific, actionable advice to improve the code and reduce cyclomatic complexity.
                   Focus on practical refactoring techniques.`
        },
        { 
          role: "user", 
          content: `Here's a ${language} function named '${functionName}' with cyclomatic complexity ${complexity}:
                    
                    \`\`\`${language}
                    ${code}
                    \`\`\`
                    
                    If the complexity is high (>10), provide specific refactoring advice to reduce complexity.
                    If moderate (5-10), suggest improvements for readability and maintainability. 
                    If low (<5), briefly note that it's good as is.
                    Include concrete code examples where helpful.`
        }
      ],
      max_tokens: 1000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Unable to generate refactoring advice at this time.";
  }
}

module.exports = {
  getRefactoringAdvice
};