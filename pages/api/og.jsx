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
    // Debug: Print values to console
    console.log("Question:", question.question);
    console.log("Answers:", answers);
    // Create an array of answer elements
    const answerElements = Object.values(answers)
      .filter((answer) => answer !== null) // Filter out null answers
      .map((answer, index) => <div key={index}>{answer}</div>);
    //   .join(""); // Join the HTML strings

    const content = (
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Stack answers vertically
          fontSize: 30,
          fontWeight: "bolder",
          color: "#2E6993",
          //   backgroundImage:
          // "url('https://static.vecteezy.com/system/resources/previews/006/504/485/large_2x/abstract-wallpaper-using-blue-color-scheme-with-blob-shape-and-using-4k-resolution-suitable-for-all-used-free-photo.jpg')", // Use the correct path
          background: "#FCFAF5",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          //   backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here
          width: "100%",
          height: "100%",
          padding: "75px 100px",
          textAlign: "left",
          //   justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "100px" }}>HTML Daily Quiz</div>
        <div style={{ marginBottom: "50px" }}>{question.question}</div>
        {answerElements}
      </div>
    );

    // Debug: Print content to console
    console.log("Generated Content:", content);
    const images = new ImageResponse(content, {
      width: 1200,
      height: 630,
    });

    return images;
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Error fetching data", { status: 500 });
  }
}
