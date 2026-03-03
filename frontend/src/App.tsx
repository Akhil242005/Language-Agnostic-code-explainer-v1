import React, { useState, useRef, useEffect } from "react";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const codeRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sync scroll for line numbers
  const syncScroll = (source: any, target: any) => {
    target.scrollTop = source.scrollTop;
  };

  const explainCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      setOutput(data.explanations.join("\n\n"));
    } catch {
      setOutput("Error generating explanation.");
    }

    setLoading(false);
  };

  const toggleSpeech = () => {
  if (!output) return;

  if (speaking) {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(output);

  const selectVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    // Prioritize high quality female English voices
    const preferredVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (
            v.name.toLowerCase().includes("zira") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("woman")
          )
      ) ||
      voices.find((v) => v.lang.startsWith("en")) ||
      voices[0];

    utterance.voice = preferredVoice;

    // Softer settings
    utterance.rate = 0.85;   // slower
    utterance.pitch = 1.1;   // slightly higher pitch
    utterance.volume = 1;

    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  // Some browsers load voices asynchronously
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = selectVoice;
  } else {
    selectVoice();
  }
};

  const generateLineNumbers = (text: string) =>
    text.split("\n").map((_, i) => i + 1).join("\n");

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Code Explainer</h1>

        <div style={styles.topBar}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.select}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
          </select>

          <button onClick={explainCode} style={styles.primaryBtn}>
            {loading ? "Generating..." : "Explain"}
          </button>

          <button
            onClick={toggleSpeech}
            style={{
              ...styles.voiceBtn,
              backgroundColor: speaking ? "#ff4d4d" : "#00b894",
            }}
          >
            🔊
          </button>
        </div>

        <div style={styles.editors}>
          {/* CODE PANEL */}
          <div style={styles.editorWrapper}>
            <div style={styles.lineNumbers}>
              <pre>{generateLineNumbers(code)}</pre>
            </div>

            <textarea
              ref={codeRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={(e) =>
                syncScroll(e.target, e.currentTarget.previousSibling)
              }
              placeholder="Paste your code here..."
              style={styles.textarea}
            />
          </div>

          {/* OUTPUT PANEL */}
          <div style={styles.editorWrapper}>
            <div style={styles.lineNumbers}>
              <pre>{generateLineNumbers(output)}</pre>
            </div>

            <textarea
              ref={outputRef}
              value={output}
              readOnly
              onScroll={(e) =>
                syncScroll(e.target, e.currentTarget.previousSibling)
              }
              placeholder="Explanation will appear here..."
              style={styles.textarea}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    width: "95%",
    maxWidth: "1400px",
    background: "#1e293b",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    color: "#f1f5f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: 600,
  },
  topBar: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  select: {
    padding: "8px",
    borderRadius: "6px",
    border: "none",
  },
  primaryBtn: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },
  voiceBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  editors: {
    display: "flex",
    gap: "20px",
  },
  editorWrapper: {
    display: "flex",
    flex: 1,
    background: "#111827",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #334155",
  },
  lineNumbers: {
    background: "#0f172a",
    padding: "15px 10px",
    textAlign: "right",
    color: "#64748b",
    userSelect: "none",
    fontFamily: "monospace",
    fontSize: "14px",
  },
  textarea: {
    flex: 1,
    padding: "15px",
    border: "none",
    outline: "none",
    resize: "none",
    fontFamily: "monospace",
    fontSize: "14px",
    background: "#111827",
    color: "#f8fafc",
  },
};

export default App;