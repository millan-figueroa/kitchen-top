import { HfInference } from '@huggingface/inference'
import { useEffect, useState } from "react";

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
`
const HF_ACCESS_TOKEN = process.env.NEXT_PUBLIC_HF_ACCESS_TOKEN;
const hf = new HfInference(HF_ACCESS_TOKEN);

interface ChatCompletionResponse {
  choices: { message: { role: string; content?: string } }[];
}

export async function getRecipeFromMistral(ingredientsArr: string[]): Promise<string> {
  const ingredientsString = ingredientsArr.join(", ")
  try {
    const response: ChatCompletionResponse = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    })
    return response.choices[0]?.message?.content ?? "No recipe found."
  } catch (err) {
    console.error((err as Error).message)
    return "Error fetching recipe."
  }
}
