import { useState } from "react";
import { explainCode } from "./api/explain";

type ExplanationStep = {
  step: number;
  node_type: string;
  explanation: string;
};

function App() {
  const [code, setCode] = useState(`score = 0
bonus = 5
penalty = 2
limit = 100

if score < 20:
    score = score + 10
else:
    score = score + 3

for step in range(5):
    score = score + step

while score < 60:
    score = score + 4`);

  const [steps, setSteps] = useState<ExplanationStep[]>([]);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    const result = await explainCode(code);
    setSteps(result.steps || []);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #020617, #0f172a)",
        color: "#e5e7eb",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* CONTENT WRAPPER */}
      <div
        style={{
          width: "100%",
          padding: "32px 48px",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <h1 style={{ marginBottom: "6px", fontSize: "40px" }}>
          Language-Agnostic Code Explainer
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "28px" }}>
          Static analysis–based explanation of program logic
        </p>

        {/* INPUT LABEL */}
        <label style={{ fontSize: "14px", color: "#cbd5f5" }}>
          Input Code
        </label>

        {/* CODE EDITOR */}
        <textarea
          rows={18}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "100%",
            marginTop: "8px",
            marginBottom: "18px",
            padding: "16px",
            fontFamily: "monospace",
            fontSize: "14px",
            background: "#020617",
            color: "#e5e7eb",
            border: "1px solid #1e293b",
            borderRadius: "10px",
            outline: "none",
            resize: "vertical",
          }}
        />

        {/* ACTION BUTTON */}
        <button
          onClick={handleExplain}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: loading ? "#334155" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 500,
            marginBottom: "32px",
          }}
        >
          {loading ? "Analyzing…" : "Explain Code"}
        </button>

        {/* EXPLANATION */}
        {steps.length > 0 && (
          <div
            style={{
              maxWidth: "1100px",
              background: "#f8fafc",
              color: "#0f172a",
              padding: "24px",
              borderRadius: "10px",
              lineHeight: "1.7",
            }}
          >
            <h3 style={{ marginBottom: "14px" }}>Explanation</h3>
            {steps.map((step) => (
              <div key={step.step} style={{ marginBottom: "10px" }}>
                • {step.explanation}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
