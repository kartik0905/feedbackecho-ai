import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const analyzeReview = async (req, res, next) => {
  try {
    const { reviewText } = req.body;

    if (!reviewText) {
      return res
        .status(400)
        .json({ success: false, error: "Review text is required." });
    }

    const prompt = `
      You are an expert hospitality AI. Analyze the following guest review.
      1. Classify the sentiment strictly as "Positive", "Negative", or "Neutral".
      2. Draft a polite, professional 2-sentence response from the property manager.
      
      Review: "${reviewText}"
      
      Respond strictly in JSON format with two keys: "sentiment" and "draftedResponse".
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(chatCompletion.choices[0].message.content);

    res.status(200).json({ success: true, data: aiResult });
  } catch (error) {
    console.error("Groq API Error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to process AI request." });
  }
};
