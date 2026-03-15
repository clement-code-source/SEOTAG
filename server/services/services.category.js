const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const generateResponse = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a strict JSON generator. Return ONLY valid JSON. No explanation. No extra text.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0].message.content;



  const match = content.match(/\{[\s\S]*\}/);
 

  if (!match) {
    throw new Error("valid json not returned");
  }

  return JSON.parse(match[0]);
};

module.exports = generateResponse;