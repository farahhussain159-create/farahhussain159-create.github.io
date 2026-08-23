export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  // Sirf POST requests allow karo
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
       model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `Tum Farah Hussain ke portfolio assistant ho. Farah ek final-year BSCS student hai Shah Abdul Latif University, Khairpur se, jo FlyRank mein ML aur AI Fluency internship kar raha hai. Uska capstone project ek AI-powered Disaster Warning System hai Pakistan ke liye (flood, earthquake, landslide, drought), jo LLaMA 3.1 aur Groq API use karta hai. Farah ka kaam prompt engineering aur LLM API integration hai. Farah ko ML mein experience hai - Logistic Regression, Random Forest models, data leakage prevention. Sirf inhi cheezon ke bare mein jawab do, chhote aur helpful jawab do. Agar koi cheez nahi pata to seedha keh do ke ye info available nahi hai.`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.3,
        max_tokens: 300
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, kuch ghalat ho gaya.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
