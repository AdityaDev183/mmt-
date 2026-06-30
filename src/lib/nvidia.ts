import axios from 'axios';

const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

export interface AIResponse {
  content: string;
  model: string;
  error?: string;
  isDemo?: boolean;
}

export async function callNvidiaAI(
  prompt: string,
  systemPrompt: string = "You are a helpful AI assistant for content creators.",
  model: string = "meta/llama-3.1-8b-instruct"
): Promise<AIResponse> {
  const apiKey = process.env.NVIDIA_API_KEY;

  // DEMO FALLBACK MODE
  if (!apiKey || apiKey === "placeholder") {
    console.warn("NVIDIA_API_KEY missing. Using demo fallback mode.");
    return {
      content: getDemoResponse(prompt),
      model: `${model} (Demo)`,
      isDemo: true
    };
  }

  try {
    const response = await axios.post(
      NVIDIA_API_URL,
      {
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    return {
      content: response.data.choices[0].message.content,
      model: model
    };
  } catch (error: any) {
    console.error("NVIDIA API Error:", error.response?.data || error.message);
    return {
      content: getDemoResponse(prompt),
      model: `${model} (Fallback)`,
      error: error.message,
      isDemo: true
    };
  }
}

function getDemoResponse(prompt: string): string {
    // Basic logic to return realistic mock data based on prompt keywords
    const p = prompt.toLowerCase();

    if (p.includes("content pack") || p.includes("hooks")) {
      return JSON.stringify({
        hooks: [
          "Stop scrolling! This 1 hack will double your growth. 📈",
          "Why most creators fail in their first 30 days. ❌",
          "The secret tool I use to automate my content strategy. 🤖"
        ],
        script: "Start with a strong visual hook. Introduce the problem. Show the solution in 3 steps. End with a specific CTA.",
        caption: "Ready to take your content to the next level? 🚀 Here's how we did it. #CreatorTips #AI #Growth",
        cta: "Comment 'SCALE' for the full guide!",
        hashtags: "#creatoreconomy #ai #marketing #growthhacking",
        viralScore: 85
      });
    }

    if (p.includes("improve") || p.includes("better")) {
        return JSON.stringify({
            improvedContent: "The original idea was good, but let's make it punchier. Focus on the transformation rather than the process. Use more power words.",
            improvementScore: 92,
            suggestions: ["Add a stronger hook", "Use emotional triggers", "Shorten the intro"]
        });
    }

    if (p.includes("travel") || p.includes("maharashtra")) {
        return JSON.stringify({
            destination: "Lonavala & Khandala",
            activities: ["Trekking to Duke's Nose", "Visit Bhushi Dam", "Sunset at Tiger Point"],
            itinerary: "Day 1: Arrival and local sightseeing. Day 2: Early morning trek. Day 3: Relaxation and departure.",
            explanation: "Since you're feeling stressed, the misty hills and cool breeze of Lonavala will provide the perfect mental reset."
        });
    }

    return "This is a demo response from Creator Copilot AI. To see real AI outputs, please add your NVIDIA API Key.";
}
