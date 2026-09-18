import Anthropic from "@anthropic-ai/sdk";

export interface ExtractedRecipe {
  title: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

const EXTRACT_RECIPE_TOOL = {
  name: "save_recipe",
  description: "Save the recipe extracted from the video transcript.",
  input_schema: {
    type: "object" as const,
    properties: {
      title: { type: "string" as const, description: "Short recipe title" },
      ingredients: {
        type: "array" as const,
        items: { type: "string" as const },
        description: "One ingredient with quantity per entry",
      },
      steps: {
        type: "array" as const,
        items: { type: "string" as const },
        description: "One preparation step per entry, in order",
      },
      tags: {
        type: "array" as const,
        items: { type: "string" as const },
        description: "Short lowercase tags, e.g. cuisine or meal type",
      },
    },
    required: ["title", "ingredients", "steps"],
  },
};

/**
 * Turns a pasted video transcript (YouTube/TikTok cooking video) into a
 * structured recipe using Claude. Requires ANTHROPIC_API_KEY.
 */
export async function extractRecipeFromTranscript(
  transcript: string,
): Promise<ExtractedRecipe> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is niet ingesteld — nodig om recepten uit transcripts te halen.",
    );
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1500,
    tools: [EXTRACT_RECIPE_TOOL],
    tool_choice: { type: "tool", name: "save_recipe" },
    messages: [
      {
        role: "user",
        content: `Hier is het transcript van een kookvideo. Haal er een gestructureerd recept uit: een korte titel, de ingrediëntenlijst (met hoeveelheden waar genoemd) en de bereidingsstappen in volgorde. Gebruik het transcript zelf, verzin niets bij dat er niet in staat.\n\nTranscript:\n"""\n${transcript}\n"""`,
      },
    ],
  });

  const toolUse = message.content.find((block) => block.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Kon geen recept uit het transcript halen.");
  }

  const result = toolUse.input as Partial<ExtractedRecipe>;
  return {
    title: result.title?.trim() || "Naamloos recept",
    ingredients: result.ingredients ?? [],
    steps: result.steps ?? [],
    tags: result.tags ?? [],
  };
}
