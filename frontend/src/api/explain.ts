export async function explainCode(code: string, language: string) {

  const response = await fetch("http://localhost:8000/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code,
      language
    })
  });

  if (!response.ok) {
    throw new Error("Failed to generate explanation");
  }

  return response.json();
}