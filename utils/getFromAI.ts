export async function getRecipeFromAI(ingredientsArr: string[]): Promise<string> {
  try {
    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredientsArr }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API error:", data?.error);
      return "Error fetching recipe.";
    }

    return data.content ?? "No recipe found.";
  } catch (err) {
    console.error("Client fetch error:", err);
    return "Error fetching recipe.";
  }
}
