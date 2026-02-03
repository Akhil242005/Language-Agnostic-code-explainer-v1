type ExplanationStep = {
  step: number;
  explanation: string;
};

type ExplanationPanelProps = {
  steps: ExplanationStep[];
};

function ExplanationPanel({ steps }: ExplanationPanelProps) {
  if (steps.length === 0) {
    return (
      <div style={{ marginTop: "20px", color: "#666" }}>
        No explanation yet.
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Explanation</h2>

      <ul>
        {steps.map((item) => (
          <li key={item.step} style={{ marginBottom: "10px" }}>
            <strong>Step {item.step}:</strong> {item.explanation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExplanationPanel;
