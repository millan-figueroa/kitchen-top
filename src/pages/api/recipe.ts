// pages/api/recipe.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown with the following template:
 # Recipe Title 

 ## Ingredients:
 * ingredient  
 * ingredient  
 * ingredient
 
 ## Instructions:
 - Step 1
 - Step 2
 - Step 3  

 ## Feel free to add additional ingredients to modify the recipe!
`;

type Data =
    | { content: string }
    | { error: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (!process.env.HF_TOKEN) {
        return res.status(500).json({ error: "Missing HF_TOKEN in .env.local" });
    }

    try {
        const { ingredientsArr } = req.body as { ingredientsArr?: string[] };

        if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
            return res.status(400).json({ error: "ingredientsArr must be a non-empty array" });
        }

        const ingredientsString = ingredientsArr.join(", ");

        const aiRes = await hf.chatCompletion({
            // Start with a model that is commonly available. If this is gated for your account,
            // switch to another open model you have access to.
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
                },
            ],
            max_tokens: 1024,
        });

        const content = aiRes.choices?.[0]?.message?.content ?? "No recipe found.";
        return res.status(200).json({ content });
    } catch (err: any) {
        console.error("HF API error:", err?.message ?? err);
        return res.status(500).json({ error: err?.message ?? "Unknown error" });
    }
}
