import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const apiKey = "aPxw2wskLYvaboLAANV1qOhdwcQ5phWGF9MzjWMF";
  const apiUrl = "https://quizapi.io/api/v1/questions";
  const tags = "html";

  const queryParams = new URLSearchParams({
    apiKey: apiKey,
    limit: 1,
    tags: tags,
    category: "",
    difficulty: "easy",
  });

  const url = `${apiUrl}?${queryParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const question = data[0];
    const answers = question.answers;

    const result = {
      question: question.question,
      answers: answers,
    };

    // Debug: Print values to console
    console.log("Question:", question.question);
    console.log("Answers:", answers);
    
    return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Error fetching data", { status: 500 });
  }
}