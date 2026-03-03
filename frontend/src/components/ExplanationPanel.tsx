import React from "react";

interface ExplanationPanelProps {
  explanations: string[] | null;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ explanations }) => {

  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        borderLeft: "1px solid #333",
        overflowY: "auto",
        backgroundColor: "#111",
        color: "#fff"
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Explanation</h2>

      {explanations && explanations.length > 0 ? (
        explanations.map((item, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            • {item}
          </div>
        ))
      ) : (
        <div style={{ opacity: 0.6 }}>
          No explanation generated yet.
        </div>
      )}
    </div>
  );
};

export default ExplanationPanel;