import React, { useState, useRef, useEffect } from "react";

type LanguageKey = "python" | "javascript" | "cpp";

const LANGUAGE_THEMES: Record<LanguageKey, any> = {
  python: {
    pageBackground: "#020617",
    pageBackgroundImage:
      "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.22), transparent 55%)," +
      "radial-gradient(circle at 100% 100%, rgba(45,212,191,0.16), transparent 55%)," +
      "linear-gradient(to bottom, #020617, #020617 40%, #020617)",
    accent: "#22d3ee",
    accentSoft: "rgba(34,211,238,0.25)",
    accentStrong: "rgba(34,211,238,0.65)",
    headerBadgeBg: "rgba(15,23,42,0.9)",
    headerBadgeBorder: "rgba(34,211,238,0.5)",
    headerTitleGradient:
      "linear-gradient(120deg, #22d3ee, #a855f7, #38bdf8)",
    tabActiveBg:
      "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(34,211,238,0.35))",
    tabInactiveBg: "rgba(15,23,42,0.55)",
    tabActiveBorder: "1px solid rgba(34,211,238,0.8)",
    tabInactiveBorder: "1px solid rgba(148,163,184,0.55)",
    tabActiveShadow:
      "0 10px 28px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.9)",
    tabInactiveShadow: "0 6px 16px rgba(15,23,42,0.85)",
    panelBackground:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
    panelBorder: "1px solid rgba(30,64,175,0.7)",
    panelHeaderBg:
      "linear-gradient(90deg, rgba(15,23,42,0.9), rgba(34,211,238,0.18))",
    petAuraGradient:
      "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.45), transparent 55%)," +
      "radial-gradient(circle at 80% 100%, rgba(45,212,191,0.4), transparent 55%)",
    petHeadBg: "#020617",
    petHeadBorder: "1px solid rgba(148,163,184,0.7)",
    petBaseGradient:
      "linear-gradient(to right, rgba(15,23,42,1), rgba(34,211,238,1))",
    petBaseBorder: "1px solid rgba(34,211,238,0.9)",
    petBaseShadow: "0 10px 24px rgba(34,211,238,0.7)",
    petPupilGradient:
      "radial-gradient(circle at 30% 20%, #f9fafb, #22d3ee 55%, #0f172a)",
    petPupilShadow: "0 0 12px rgba(34,211,238,0.95)",
    primaryButtonBg:
      "linear-gradient(135deg, rgba(34,211,238,0.28), rgba(59,130,246,0.4))",
    primaryButtonBorder: "1px solid rgba(34,211,238,0.7)",
    primaryButtonShadow:
      "0 16px 34px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)",
    secondaryButtonBg:
      "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(34,211,238,0.32))",
    secondaryButtonBorder: "1px solid rgba(148,163,184,0.7)",
    secondaryButtonShadow:
      "0 12px 26px rgba(15,23,42,0.96), 0 0 0 1px rgba(15,23,42,0.9)"
  },
  javascript: {
    pageBackground: "#030712",
    pageBackgroundImage:
      "radial-gradient(circle at 0% 0%, rgba(250,204,21,0.16), transparent 60%)," +
      "radial-gradient(circle at 100% 100%, rgba(248,113,113,0.16), transparent 55%)," +
      "linear-gradient(to bottom, #030712, #030712 40%, #020617)",
    accent: "#facc15",
    accentSoft: "rgba(250,204,21,0.26)",
    accentStrong: "rgba(250,204,21,0.7)",
    headerBadgeBg: "rgba(15,23,42,0.94)",
    headerBadgeBorder: "rgba(250,204,21,0.5)",
    headerTitleGradient:
      "linear-gradient(120deg, #facc15, #fb923c, #f97316)",
    tabActiveBg:
      "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(250,204,21,0.32))",
    tabInactiveBg: "rgba(15,23,42,0.6)",
    tabActiveBorder: "1px solid rgba(250,204,21,0.85)",
    tabInactiveBorder: "1px solid rgba(148,163,184,0.55)",
    tabActiveShadow:
      "0 10px 30px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)",
    tabInactiveShadow: "0 6px 18px rgba(15,23,42,0.9)",
    panelBackground:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(30,64,175,0.96))",
    panelBorder: "1px solid rgba(250,204,21,0.7)",
    panelHeaderBg:
      "linear-gradient(90deg, rgba(15,23,42,0.95), rgba(250,204,21,0.18))",
    petAuraGradient:
      "radial-gradient(circle at 30% 0%, rgba(250,204,21,0.42), transparent 55%)," +
      "radial-gradient(circle at 80% 100%, rgba(248,113,113,0.42), transparent 55%)",
    petHeadBg: "#020617",
    petHeadBorder: "1px solid rgba(250,204,21,0.7)",
    petBaseGradient:
      "linear-gradient(to right, rgba(15,23,42,1), rgba(250,204,21,1))",
    petBaseBorder: "1px solid rgba(250,204,21,0.9)",
    petBaseShadow: "0 10px 24px rgba(250,204,21,0.7)",
    petPupilGradient:
      "radial-gradient(circle at 30% 20%, #fefce8, #facc15 55%, #0f172a)",
    petPupilShadow: "0 0 12px rgba(250,204,21,0.95)",
    primaryButtonBg:
      "linear-gradient(135deg, rgba(250,204,21,0.32), rgba(248,113,113,0.35))",
    primaryButtonBorder: "1px solid rgba(250,204,21,0.8)",
    primaryButtonShadow:
      "0 16px 34px rgba(15,23,42,0.97), 0 0 0 1px rgba(15,23,42,0.95)",
    secondaryButtonBg:
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(250,204,21,0.26))",
    secondaryButtonBorder: "1px solid rgba(148,163,184,0.7)",
    secondaryButtonShadow:
      "0 12px 26px rgba(15,23,42,0.97), 0 0 0 1px rgba(15,23,42,0.95)"
  },
  cpp: {
    pageBackground: "#020617",
    pageBackgroundImage:
      "radial-gradient(circle at 0% 0%, rgba(129,140,248,0.26), transparent 55%)," +
      "radial-gradient(circle at 100% 100%, rgba(244,114,182,0.2), transparent 55%)," +
      "linear-gradient(to bottom, #020617, #020617 40%, #020617)",
    accent: "#818cf8",
    accentSoft: "rgba(129,140,248,0.3)",
    accentStrong: "rgba(129,140,248,0.75)",
    headerBadgeBg: "rgba(15,23,42,0.92)",
    headerBadgeBorder: "rgba(129,140,248,0.6)",
    headerTitleGradient:
      "linear-gradient(120deg, #818cf8, #22d3ee, #e879f9)",
    tabActiveBg:
      "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(129,140,248,0.38))",
    tabInactiveBg: "rgba(15,23,42,0.6)",
    tabActiveBorder: "1px solid rgba(129,140,248,0.85)",
    tabInactiveBorder: "1px solid rgba(148,163,184,0.55)",
    tabActiveShadow:
      "0 10px 30px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)",
    tabInactiveShadow: "0 6px 18px rgba(15,23,42,0.9)",
    panelBackground:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.96))",
    panelBorder: "1px solid rgba(79,70,229,0.8)",
    panelHeaderBg:
      "linear-gradient(90deg, rgba(15,23,42,0.96), rgba(129,140,248,0.22))",
    petAuraGradient:
      "radial-gradient(circle at 30% 0%, rgba(129,140,248,0.5), transparent 55%)," +
      "radial-gradient(circle at 80% 100%, rgba(244,114,182,0.45), transparent 55%)",
    petHeadBg: "#020617",
    petHeadBorder: "1px solid rgba(129,140,248,0.7)",
    petBaseGradient:
      "linear-gradient(to right, rgba(15,23,42,1), rgba(129,140,248,1))",
    petBaseBorder: "1px solid rgba(129,140,248,0.9)",
    petBaseShadow: "0 10px 24px rgba(129,140,248,0.7)",
    petPupilGradient:
      "radial-gradient(circle at 30% 20%, #f9fafb, #818cf8 55%, #020617)",
    petPupilShadow: "0 0 12px rgba(129,140,248,0.95)",
    primaryButtonBg:
      "linear-gradient(135deg, rgba(129,140,248,0.32), rgba(56,189,248,0.35))",
    primaryButtonBorder: "1px solid rgba(129,140,248,0.8)",
    primaryButtonShadow:
      "0 16px 34px rgba(15,23,42,0.97), 0 0 0 1px rgba(15,23,42,0.95)",
    secondaryButtonBg:
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(129,140,248,0.28))",
    secondaryButtonBorder: "1px solid rgba(148,163,184,0.78)",
    secondaryButtonShadow:
      "0 12px 26px rgba(15,23,42,0.97), 0 0 0 1px rgba(15,23,42,0.95)"
  }
};

type VoiceGender = "female" | "male";

function App() {

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<LanguageKey>("python");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [petHappy, setPetHappy] = useState(false);
  const [petAngry, setPetAngry] = useState(false);
  const [petTapCount, setPetTapCount] = useState(0);
  const [showGreeting, setShowGreeting] = useState(true);
  const [voiceGender, setVoiceGender] = useState<VoiceGender>("female");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const codeLinesRef = useRef<HTMLDivElement>(null);
  const outputLinesRef = useRef<HTMLDivElement>(null);

  const theme = LANGUAGE_THEMES[language];

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      if (voices && voices.length) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const explainCode = async () => {

    setLoading(true);
    setOutput("");

    try {

      const response = await fetch("http://127.0.0.1:8000/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, language })
      });

      const data = await response.json();

      const formatted = data.explanations.map((e: string) => "• " + e);

      setOutput(formatted.join("\n\n"));

    } catch {

      setOutput("Error generating explanation.");

    }

    setLoading(false);
  };

  const clearCode = () => {

    setCode("");

  };

  const copyExplanation = () => {

    navigator.clipboard.writeText(output);

  };

  const toggleSpeech = () => {

    if (!output) return;

    if (speaking) {

      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;

    }

    const utterance = new SpeechSynthesisUtterance(output);

    const voices =
      (availableVoices && availableVoices.length
        ? availableVoices
        : window.speechSynthesis.getVoices()) || [];

    if (!voices.length) {
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
      return;
    }

    const lowerName = (v: SpeechSynthesisVoice) => v.name.toLowerCase();

    const isFemaleName = (name: string) =>
      name.includes("zira") ||
      name.includes("samantha") ||
      name.includes("aria") ||
      name.includes("eva") ||
      name.includes("jenny") ||
      name.includes("hazel") ||
      name.includes("linda") ||
      name.includes("susan") ||
      name.includes("heera") ||
      name.includes("heli") ||
      name.includes("female");

    const isMaleName = (name: string) =>
      name.includes("guy") ||
      name.includes("ryan") ||
      name.includes("christopher") ||
      name.includes("jacob") ||
      name.includes("david") ||
      name.includes("mark") ||
      name.includes("george") ||
      name.includes("john") ||
      name.includes("mike") ||
      name.includes("alex") ||
      name.includes("daniel") ||
      name.includes("male");

    const femaleCandidates =
      voices.filter(v => isFemaleName(lowerName(v))) || [];

    const maleCandidates =
      voices.filter(v => isMaleName(lowerName(v))) || [];

    const englishFemale =
      femaleCandidates.find(v => v.lang.toLowerCase().startsWith("en")) ||
      femaleCandidates[0];

    const englishMale =
      maleCandidates.find(v => v.lang.toLowerCase().startsWith("en")) ||
      maleCandidates[0];

    const fallbackEnglish = voices.find(v =>
      v.lang.toLowerCase().startsWith("en")
    );

    let preferred: SpeechSynthesisVoice | null = null;

    if (voiceGender === "female") {
      preferred = englishFemale || fallbackEnglish || voices[0];
    } else {
      preferred = englishMale || fallbackEnglish || voices[0];
    }

    utterance.voice = preferred;

    utterance.rate = 0.85;
    utterance.pitch = 1.1;

    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);

    setSpeaking(true);

  };

  const generateLineNumbers = (text: string) =>
    text.split("\n").map((_, i) => i + 1).join("\n");

  const handleScroll = (e: any, ref: any) => {

    ref.current.scrollTop = e.target.scrollTop;

  };

  const handleInteractiveMove = (e: React.MouseEvent<HTMLDivElement>) => {

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const maxAngle = 10;

    setTilt({
      x: x * maxAngle,
      y: y * maxAngle
    });

  };

  const handleInteractiveLeave = () => {

    setTilt({ x: 0, y: 0 });

  };

  const handlePetTap = () => {

    const nextCount = petTapCount + 1;
    setPetTapCount(nextCount);

    if (nextCount >= 6) {

      setPetAngry(true);
      setPetTapCount(0);

      setTimeout(() => {
        setPetAngry(false);
      }, 900);

      return;

    }

    setPetHappy(true);

    setTimeout(() => {
      setPetHappy(false);
    }, 260);

  };

  return (

    <div
      style={{
        ...styles.page,
        background: theme.pageBackground,
        backgroundImage: theme.pageBackgroundImage
      }}
    >

      <div style={styles.header}>
        <h1
          style={{
            ...styles.title,
            backgroundImage: theme.headerTitleGradient,
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}
        >
          COGU
        </h1>

        <p style={styles.subtitle}>
          Meet COGU – your friendly code explainer. Paste any snippet, pick a
          language, and get a simple, step‑by‑step breakdown.
        </p>
      </div>

      {/* Top Bot */}

      <div
        style={styles.interactive}
        onMouseMove={handleInteractiveMove}
        onMouseLeave={handleInteractiveLeave}
      >

        {showGreeting && (
          <div
            style={{
              ...styles.greetingBubble,
              borderColor: theme.accentStrong,
              boxShadow: "0 18px 40px rgba(15,23,42,0.96)"
            }}
          >
            <div style={styles.greetingTitle}>COGU</div>
            <div style={styles.greetingText}>
              Hey, I&apos;m COGU. Drop in your code, choose a language, and I&apos;ll
              walk you through what it does.
            </div>
          </div>
        )}

        <div
          style={{
            ...styles.petOrbit,
            animation:
              petHappy && !petAngry ? "pet-shiver 0.28s ease-out" : "none"
          }}
        >
          <div
            style={{
              ...styles.petAura,
              background: theme.petAuraGradient,
              opacity: petHappy ? 1 : 0.9,
              transform: petHappy ? "scale(1.04)" : "scale(1)"
            }}
          />

          <div style={styles.petBody}>
            <div
              onClick={handlePetTap}
              style={{
                ...styles.petHead,
                background: theme.petHeadBg,
                border: theme.petHeadBorder,
                transform: `translate(${tilt.x * 0.4}px, ${tilt.y * 0.2}px) rotate(${tilt.x * 1.1}deg)`
              }}
            >
              <div style={styles.petFace}>
                <div style={styles.petEye}>
                  <div
                    style={{
                      ...(petAngry
                        ? styles.petPupilAngry
                        : {
                            ...styles.petPupil,
                            background: theme.petPupilGradient,
                            boxShadow: theme.petPupilShadow
                          }),
                      transform: `translate(${tilt.x * 0.5}px, ${tilt.y * 0.3}px)`
                    }}
                  />
                </div>
                <div style={styles.petEye}>
                  <div
                    style={{
                      ...(petAngry
                        ? styles.petPupilAngry
                        : {
                            ...styles.petPupil,
                            background: theme.petPupilGradient,
                            boxShadow: theme.petPupilShadow
                          }),
                      transform: `translate(${tilt.x * 0.5}px, ${tilt.y * 0.3}px)`
                    }}
                  />
                </div>
              </div>
              <div style={styles.petMouth} />
            </div>

            <div style={styles.petBase}>
              <div
                style={{
                  ...styles.petBaseInner,
                  background: theme.petBaseGradient,
                  boxShadow: theme.petBaseShadow
                }}
              />
            </div>
          </div>

          <div style={styles.petShadow} />
        </div>

      </div>
      {/* Language Tabs + Voice selector */}

      <div style={styles.tabsRow}>

        <div style={styles.tabs}>

          {(["python", "javascript", "cpp"] as LanguageKey[]).map(lang => {

            const isActive = language === lang;

            return (

              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  ...styles.tab,
                  background: isActive ? theme.tabActiveBg : theme.tabInactiveBg,
                  border: isActive
                    ? theme.tabActiveBorder
                    : theme.tabInactiveBorder,
                  boxShadow: isActive
                    ? theme.tabActiveShadow
                    : theme.tabInactiveShadow
                }}
              >
                {lang === "cpp"
                  ? "C++"
                  : lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>

            );

          })}

        </div>

        <div style={styles.voiceSelectorWrapper}>
          <label style={styles.voiceLabel}>
            Voice
            <select
              value={voiceGender}
              onChange={e => setVoiceGender(e.target.value as VoiceGender)}
              style={styles.voiceSelect}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </label>
        </div>

      </div>

      {/* Editors */}

      <div style={styles.editorRow}>

        {/* CODE */}

        <div
          style={{
            ...styles.panel,
            background: theme.panelBackground,
            border: theme.panelBorder
          }}
        >

          <div
            style={{
              ...styles.panelHeader,
              background: theme.panelHeaderBg
            }}
          >
            Code Snippet
          </div>

          <div style={styles.editorWrapper}>

            <div ref={codeLinesRef} style={styles.lineNumbers}>
              <pre>{generateLineNumbers(code)}</pre>
            </div>

            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              onScroll={e => handleScroll(e, codeLinesRef)}
              placeholder="Paste your code here..."
              style={styles.textarea}
            />

          </div>

        </div>

        {/* EXPLANATION */}

        <div
          style={{
            ...styles.panel,
            background: theme.panelBackground,
            border: theme.panelBorder
          }}
        >

          <div
            style={{
              ...styles.panelHeader,
              background: theme.panelHeaderBg
            }}
          >
            Explanation
          </div>

          <div style={styles.editorWrapper}>

            <div ref={outputLinesRef} style={styles.lineNumbers}>
              <pre>{generateLineNumbers(output)}</pre>
            </div>

            <textarea
              value={output}
              readOnly
              onScroll={e => handleScroll(e, outputLinesRef)}
              placeholder="Explanation will appear here..."
              style={styles.textarea}
            />

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div style={styles.buttonRow}>

        <button
          onClick={clearCode}
          style={{
            ...styles.secondaryBtn,
            background: "transparent",
            border: "1px dashed rgba(148,163,184,0.9)",
            boxShadow: "none"
          }}
          className="secondary-btn"
        >
          Clear Code
        </button>

        <button
          onClick={explainCode}
          style={{
            ...styles.primaryBtn,
            background: theme.primaryButtonBg,
            border: theme.primaryButtonBorder,
            boxShadow: theme.primaryButtonShadow
          }}
          className="primary-btn"
        >
          {loading ? "Generating..." : "Explain Code"}
        </button>

        <button
          onClick={toggleSpeech}
          style={{
            ...styles.secondaryBtn,
            background: theme.secondaryButtonBg,
            border: theme.secondaryButtonBorder,
            boxShadow: theme.secondaryButtonShadow
          }}
          className="secondary-btn"
        >
          🔊 Voice Output
        </button>

        <button
          onClick={copyExplanation}
          style={{
            ...styles.secondaryBtn,
            background: theme.secondaryButtonBg,
            border: theme.secondaryButtonBorder,
            boxShadow: theme.secondaryButtonShadow
          }}
          className="secondary-btn"
        >
          Copy Explanation
        </button>

      </div>

    </div>
  );
}

const styles: any = {

  page: {

    minHeight: "100vh",
    color: "white",
    padding: "40px",
    fontFamily: "sans-serif",
    textAlign: "center"

  },

  title: {

    fontSize: "36px",
    marginBottom: "8px",
    letterSpacing: "0.03em"

  },

  subtitle: {

    marginTop: "4px",
    fontSize: "14px",
    maxWidth: "640px",
    color: "#9ca3af"

  },

  header: {

    maxWidth: "960px",
    margin: "0 auto 26px",
    textAlign: "left"

  },

  tabsRow: {

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "22px",
    maxWidth: "960px",
    marginLeft: "auto",
    marginRight: "auto"

  },

  tabs: {

    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: 0

  },

  tab: {

    padding: "8px 18px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.5)",
    color: "white",
    cursor: "pointer",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.9))",
    boxShadow: "0 8px 22px rgba(15,23,42,0.95)",
    backdropFilter: "blur(14px)",
    fontSize: "13px",
    letterSpacing: "0.04em",
    textTransform: "uppercase"

  },

  voiceSelectorWrapper: {

    display: "flex",
    alignItems: "center"

  },

  voiceLabel: {

    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: "#9ca3af",
    letterSpacing: "0.08em",
    textTransform: "uppercase"

  },

  voiceSelect: {

    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.7)",
    background: "rgba(15,23,42,0.95)",
    color: "#e5e7eb",
    outline: "none",
    cursor: "pointer",
    backdropFilter: "blur(12px)"

  },

  editorRow: {

    display: "flex",
    gap: "20px",
    marginBottom: "20px"

  },

  panel: {

    flex: 1,
    background: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155"

  },

  panelHeader: {

    padding: "10px",
    borderBottom: "1px solid #334155",
    fontWeight: 600

  },

  editorWrapper: {

    display: "flex",
    height: "260px",
    borderRadius: "0 0 10px 10px",
    overflow: "hidden"

  },

  lineNumbers: {

    background: "#020617",
    padding: "12px 8px",
    color: "#64748b",
    fontFamily: "monospace",
    fontSize: "14px",
    lineHeight: "22px",
    width: "52px",
    textAlign: "right",
    boxSizing: "border-box",
    borderRight: "1px solid #111827",
    overflow: "hidden",
    userSelect: "none"

  },

  textarea: {

    flex: 1,
    padding: "12px",
    border: "none",
    outline: "none",
    resize: "none",
    background: "#020617",
    color: "#f8fafc",
    fontFamily: "monospace",
    fontSize: "14px",
    lineHeight: "22px",
    overflow: "auto"

  },

  buttonRow: {

    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "15px"

  },

  primaryBtn: {

    padding: "10px 22px",
    borderRadius: "999px",
    border: "1px solid rgba(59,130,246,0.75)",
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.16), rgba(129,140,248,0.28))",
    color: "white",
    cursor: "pointer",
    boxShadow:
      "0 14px 30px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.9)",
    backdropFilter: "blur(18px)",
    fontWeight: 600,
    letterSpacing: "0.03em"

  },

  secondaryBtn: {

    padding: "10px 18px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.7)",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.75), rgba(30,64,175,0.32))",
    color: "white",
    cursor: "pointer",
    boxShadow:
      "0 10px 24px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)",
    backdropFilter: "blur(18px)",
    fontWeight: 500,
    letterSpacing: "0.02em"

  },

  interactive: {

    marginTop: "10px",
    marginBottom: "26px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    padding: "30px 0",
    perspective: "900px"

  },

  petOrbit: {

    position: "relative",
    width: "200px",
    height: "170px"

  },

  petAura: {

    position: "absolute",
    inset: "0",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.35), transparent 55%)," +
      "radial-gradient(circle at 80% 100%, rgba(244,114,182,0.35), transparent 55%)",
    opacity: 0.9,
    filter: "blur(1px)"

  },

  petBody: {

    position: "absolute",
    inset: "26px 32px 30px",
    borderRadius: "999px",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0",
    backdropFilter: "none"

  },

  petHead: {

    width: "92px",
    height: "64px",
    borderRadius: "26px",
    background: "#020617",
    border: "1px solid rgba(148,163,184,0.7)",
    boxShadow: "0 10px 25px rgba(15,23,42,0.9)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.10s ease-out"

  },

  petFace: {

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    padding: "0 10px"

  },

  petEye: {

    width: "17px",
    height: "17px",
    borderRadius: "999px",
    background: "rgba(15,23,42,1)",
    border: "1px solid rgba(148,163,184,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"

  },

  petPupil: {

    width: "9px",
    height: "9px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 30% 20%, #f9fafb, #38bdf8 55%, #0f172a)",
    boxShadow: "0 0 10px rgba(56,189,248,0.9)",
    transition: "transform 0.08s ease-out"

  },

  petPupilAngry: {

    width: "9px",
    height: "9px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 30% 20%, #fee2e2, #dc2626 55%, #450a0a)",
    boxShadow: "0 0 12px rgba(248,113,113,0.95)",
    transition: "transform 0.08s ease-out"

  },

  petMouth: {

    width: "26px",
    height: "11px",
    borderRadius: "0 0 999px 999px",
    borderBottom: "2px solid rgba(148,163,184,0.9)",
    marginTop: "6px",
    alignSelf: "center"

  },

  petBase: {

    width: "84px",
    height: "26px",
    borderRadius: "16px",
    background:
      "linear-gradient(to right, rgba(15,23,42,1), rgba(30,64,175,1))",
    border: "1px solid rgba(30,64,175,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 24px rgba(30,64,175,0.8)"

  },

  petBaseInner: {

    width: "70%",
    height: "38%",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 30% 0%, rgba(248,250,252,0.9), rgba(59,130,246,0.4))",
    boxShadow: "0 0 18px rgba(129,140,248,0.9)"

  },

  petShadow: {

    position: "absolute",
    bottom: "6px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "140px",
    height: "22px",
    borderRadius: "999px",
    background: "radial-gradient(circle, rgba(15,23,42,1), transparent 70%)",
    opacity: 0.9,
    filter: "blur(3px)"

  },

  greetingBubble: {

    maxWidth: "420px",
    padding: "14px 18px",
    borderRadius: "18px",
    border: "1px solid rgba(148,163,184,0.7)",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
    backdropFilter: "blur(18px)",
    textAlign: "left"

  },

  greetingTitle: {

    fontSize: "13px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "4px"

  },

  greetingText: {

    fontSize: "14px",
    color: "#e5e7eb",
    lineHeight: 1.5

  }

};

export default App;