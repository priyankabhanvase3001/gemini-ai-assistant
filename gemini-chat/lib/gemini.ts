// lib/gemini.ts
// SDK no longer used — API called directly in route.ts
export function formatHistory(
  messages: { role: "user" | "assistant"; content: string }[]
) {
  return messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));
}