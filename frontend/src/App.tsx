import React, { useMemo, useRef, useEffect, useState } from "react";

type LanguageKey = "python" | "javascript" | "cpp";

type LanguageTheme = {
  pageBackground: string;
  pageBackgroundImage: string;

  // glassy overlay
  pageGlassOverlay: string;
  pageGlassOverlayBlurPx: number;

  accent: string;
  accentSoft: string;
  accentStrong: string;

  textPrimary: string;
  textMuted: string;
  textSoft: string;

  headerBadgeBg: string;
  headerBadgeBorder: string;
  headerTitleGradient: string;

  tabActiveBg: string;
  tabInactiveBg: string;
  tabActiveBorder: string;
  tabInactiveBorder: string;
  tabActiveShadow: string;
  tabInactiveShadow: string;
  tabTextActive: string;
  tabTextInactive: string;

  panelBackground: string;
  panelBorder: string;
  panelHeaderBg: string;
  panelHeaderText: string;
  panelHeaderDivider: string;

  editorGutterBg: string;
  editorGutterText: string;
  editorGutterBorder: string;
  editorBg: string;
  editorText: string;
  editorPlaceholder: string;
  editorSelection: string;

  botBubbleBg: string;
  botBubbleBorder: string;
  botBubbleTitle: string;
  botBubbleText: string;
  botBubbleShadow: string;

  petAuraGradient: string;
  petHeadBg: string;
  petHeadBorder: string;
  petEyeBg: string;
  petEyeBorder: string;
  petMouthBorder: string;
  petBaseGradient: string;
  petBaseBorder: string;
  petBaseShadow: string;
  petPupilGradient: string;
  petPupilShadow: string;
  petShadow: string;

  primaryButtonBg: string;
  primaryButtonBorder: string;
  primaryButtonShadow: string;
  secondaryButtonBg: string;
  secondaryButtonBorder: string;
  secondaryButtonShadow: string;

  selectBg: string;
  selectBorder: string;
  selectText: string;
  focusRing: string;
};

const LANGUAGE_THEMES: Record<LanguageKey, LanguageTheme> = {
  python: {
    pageBackground: "#020617",
    pageBackgroundImage:
      "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.22), transparent 55%)," +
      "radial-gradient(circle at 100% 100%, rgba(45,212,191,0.16), transparent 55%)," +
      "linear-gradient(to bottom, #020617, #020617 40%, #020617)",
    pageGlassOverlay:
      "radial-gradient(circle at 20% 0%, rgba(34,211,238,0.12), transparent 60%)," +
      "radial-gradient(circle at 85% 110%, rgba(168,85,247,0.10), transparent 55%)," +
      "linear-gradient(135deg, rgba(2,6,23,0.38), rgba(2,6,23,0.58))",
    pageGlassOverlayBlurPx: 18,
    accent: "#22d3ee",
    accentSoft: "rgba(34,211,238,0.25)",
    accentStrong: "rgba(34,211,238,0.65)",
    textPrimary: "#f8fafc",
    textMuted: "rgba(226,232,240,0.72)",
    textSoft: "rgba(148,163,184,0.85)",
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
    tabTextActive: "#f8fafc",
    tabTextInactive: "rgba(226,232,240,0.78)",
    panelBackground:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
    panelBorder: "1px solid rgba(30,64,175,0.7)",
    panelHeaderBg:
      "linear-gradient(90deg, rgba(15,23,42,0.9), rgba(34,211,238,0.18))",
    panelHeaderText: "rgba(248,250,252,0.9)",
    panelHeaderDivider: "rgba(148,163,184,0.35)",
    editorGutterBg: "rgba(2,6,23,0.92)",
    editorGutterText: "rgba(148,163,184,0.8)",
    editorGutterBorder: "rgba(15,23,42,0.9)",
    editorBg: "rgba(2,6,23,0.9)",
    editorText: "#f8fafc",
    editorPlaceholder: "rgba(148,163,184,0.75)",
    editorSelection: "rgba(34,211,238,0.18)",
    botBubbleBg:
      "linear-gradient(135deg, rgba(15,23,42,0.72), rgba(34,211,238,0.10))",
    botBubbleBorder: "rgba(34,211,238,0.55)",
    botBubbleTitle: "rgba(148,163,184,0.9)",
    botBubbleText: "rgba(248,250,252,0.92)",
    botBubbleShadow: "0 18px 46px rgba(15,23,42,0.96)",
    petAuraGradient:
      "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.45), transparent 55%)," +
      "radial-gradient(circle at 80% 100%, rgba(45,212,191,0.4), transparent 55%)",
    petHeadBg: "#020617",
    petHeadBorder: "1px solid rgba(148,163,184,0.7)",
    petEyeBg: "rgba(15,23,42,1)",
    petEyeBorder: "1px solid rgba(148,163,184,0.7)",
    petMouthBorder: "rgba(148,163,184,0.9)",
    petBaseGradient:
      "linear-gradient(to right, rgba(15,23,42,1), rgba(34,211,238,1))",
    petBaseBorder: "1px solid rgba(34,211,238,0.9)",
    petBaseShadow: "0 10px 24px rgba(34,211,238,0.7)",
    petPupilGradient:
      "radial-gradient(circle at 30% 20%, #f9fafb, #22d3ee 55%, #0f172a)",
    petPupilShadow: "0 0 12px rgba(34,211,238,0.95)",
    petShadow:
      "radial-gradient(circle, rgba(15,23,42,1), transparent 72%)",
    primaryButtonBg:
      "linear-gradient(135deg, rgba(34,211,238,0.28), rgba(59,130,246,0.4))",
    primaryButtonBorder: "1px solid rgba(34,211,238,0.7)",
    primaryButtonShadow:
      "0 16px 34px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)",
    secondaryButtonBg:
      "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(34,211,238,0.32))",
    secondaryButtonBorder: "1px solid rgba(148,163,184,0.7)",
    secondaryButtonShadow:
      "0 12px 26px rgba(15,23,42,0.96), 0 0 0 1px rgba(15,23,42,0.9)",
    selectBg: "rgba(15,23,42,0.85)",
    selectBorder: "rgba(34,211,238,0.45)",
    selectText: "rgba(248,250,252,0.92)",
    focusRing: "0 0 0 3px rgba(34,211,238,0.25)"
  },
  javascript: {
    // "Sunset Circuit" — warm, playful, very different from Python
    pageBackground: "#0b1020",
    pageBackgroundImage:
      "radial-gradient(circle at 14% 8%, rgb(255, 249, 249), transparent 55%)," +
      "radial-gradient(circle at 92% 20%, rgba(129, 126, 126, 0.87), transparent 55%)," +
      "radial-gradient(circle at 70% 120%, rgba(188, 171, 206, 0.16), transparent 60%)," +
      "linear-gradient(135deg, #c2d0ff, #626790 55%, #000000)",
    pageGlassOverlay:
      "linear-gradient(135deg, rgba(225, 147, 147, 0.04), rgba(234, 108, 108, 0.02))," +
      "radial-gradient(circle at 20% 30%, rgba(251,191,36,0.08), transparent 55%)," +
      "radial-gradient(circle at 80% 80%, rgba(251,113,133,0.07), transparent 55%)",
    pageGlassOverlayBlurPx: 22,
    accent: "#000000",
    accentSoft: "rgba(218, 178, 77, 0.93)",
    accentStrong: "rgba(237, 94, 94, 0.75)",
    textPrimary: "#fff7ed",
    textMuted: "rgba(0, 0, 0, 0.92)",
    textSoft: "rgb(0, 0, 0)",
    headerBadgeBg: "rgba(15,12,22,0.82)",
    headerBadgeBorder: "rgba(251,191,36,0.55)",
    headerTitleGradient:
      "linear-gradient(120deg, #0f0f0f, #62474b, #c084fc)",
    tabActiveBg:
      "linear-gradient(135deg, rgba(20,12,35,0.88), rgba(251,191,36,0.22))",
    tabInactiveBg: "rgba(18,12,28,0.55)",
    tabActiveBorder: "1px solid rgba(239, 133, 80, 0.85)",
    tabInactiveBorder: "1px solid rgba(243, 156, 227, 0.35)",
    tabActiveShadow:
      "0 12px 34px rgba(126, 132, 168, 0.92), 0 0 0 1px rgba(135, 106, 141, 0.9)",
    tabInactiveShadow: "0 8px 20px rgba(103, 105, 124, 0.9)",
    tabTextActive: "#dfcbbc",
    tabTextInactive: "rgba(255,237,213,0.78)",
    panelBackground:
      "linear-gradient(145deg, rgba(98, 77, 131, 0.92), rgba(35,12,28,0.78))",
    panelBorder: "1px solid rgba(224, 168, 219, 0.45)",
    panelHeaderBg:
      "linear-gradient(90deg, rgba(18,12,28,0.92), rgba(248, 131, 102, 0.14))",
    panelHeaderText: "rgba(255,247,237,0.92)",
    panelHeaderDivider: "rgba(251,191,36,0.22)",
    editorGutterBg: "rgba(12,8,18,0.86)",
    editorGutterText: "rgba(255,237,213,0.55)",
    editorGutterBorder: "rgba(251,191,36,0.16)",
    editorBg: "rgba(10,7,16,0.82)",
    editorText: "#fff7ed",
    editorPlaceholder: "rgba(255,237,213,0.55)",
    editorSelection: "rgba(251,191,36,0.14)",
    botBubbleBg:
      "linear-gradient(135deg, rgba(133, 114, 165, 0.74), rgba(251,113,133,0.10))",
    botBubbleBorder: "rgba(238, 212, 118, 0.55)",
    botBubbleTitle: "rgba(4, 4, 4, 0.75)",
    botBubbleText: "rgba(0, 0, 0, 0.92)",
    botBubbleShadow: "0 18px 52px rgba(144, 132, 179, 0.95)",
    petAuraGradient:
      "radial-gradient(circle at 25% 0%, rgba(197, 154, 200, 0.59), transparent 58%)," +
      "radial-gradient(circle at 85% 100%, rgba(181, 146, 146, 0.81), transparent 58%)",
    petHeadBg: "rgba(10,7,16,0.92)",
    petHeadBorder: "1px solid rgba(255, 255, 255, 0.65)",
    petEyeBg: "rgba(10,7,16,1)",
    petEyeBorder: "1px solid rgba(251,191,36,0.35)",
    petMouthBorder: "rgba(244, 243, 242, 0.75)",
    petBaseGradient:
      "linear-gradient(90deg, rgba(18,12,28,1), rgb(243, 188, 239), rgba(251,113,133,1))",
    petBaseBorder: "1px solid rgba(238, 153, 88, 0.75)",
    petBaseShadow: "0 12px 26px rgba(251,191,36,0.45)",
    petPupilGradient:
      "radial-gradient(circle at 30% 20%, #fff7ed, #e1e2db 55%, #1a0b1d)",
    petPupilShadow: "0 0 14px rgba(244, 216, 147, 0.93)",
    petShadow: "radial-gradient(circle, rgba(8,6,14,1), transparent 72%)",
    primaryButtonBg:
      "linear-gradient(135deg, rgba(251,191,36,0.24), rgba(251,113,133,0.22), rgba(192,132,252,0.20))",
    primaryButtonBorder: "1px solid rgba(251,191,36,0.7)",
    primaryButtonShadow:
      "0 16px 38px rgba(8,6,14,0.97), 0 0 0 1px rgba(8,6,14,0.9)",
    secondaryButtonBg:
      "linear-gradient(135deg, rgba(18,12,28,0.86), rgba(251,113,133,0.14))",
    secondaryButtonBorder: "1px solid rgba(251,113,133,0.35)",
    secondaryButtonShadow:
      "0 12px 30px rgba(8,6,14,0.97), 0 0 0 1px rgba(8,6,14,0.9)",
    selectBg: "rgba(18,12,28,0.82)",
    selectBorder: "rgba(251,191,36,0.45)",
    selectText: "rgba(255,247,237,0.92)",
    focusRing: "0 0 0 3px rgba(251,191,36,0.18)"
  },
  cpp: {
    // "Crystalline Noir" — Sharp, glass-like monochrome with structural depth
    pageBackground: "#000000",
    pageBackgroundImage:
      "linear-gradient(215deg, rgba(255, 255, 255, 0.03) 0%, transparent 40%)," +
      "linear-gradient(125deg, rgba(255, 255, 255, 0.02) 0%, transparent 50%)," +
      "linear-gradient(0deg, #050505 0%, #000000 100%)",
    pageGlassOverlay:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
    pageGlassOverlayBlurPx: 8, // Kept low to avoid "wrinkle" artifacts but provide depth
    accent: "#ffffff",
    accentSoft: "rgba(255, 255, 255, 0.08)",
    accentStrong: "rgba(255, 255, 255, 0.95)",
    textPrimary: "#ffffff",
    textMuted: "rgba(255, 255, 255, 0.4)",
    textSoft: "rgba(255, 255, 255, 0.7)",
    headerBadgeBg: "rgba(255, 255, 255, 0.05)",
    headerBadgeBorder: "rgba(255, 255, 255, 0.2)",
    headerTitleGradient: "linear-gradient(120deg, #ffffff 30%, #888888 100%)",
    tabActiveBg: "rgba(255, 255, 255, 0.15)", // Translucent white glass look
    tabInactiveBg: "rgba(255, 255, 255, 0.02)",
    tabActiveBorder: "1px solid rgba(255, 255, 255, 0.4)",
    tabInactiveBorder: "1px solid rgba(255, 255, 255, 0.1)",
    tabActiveShadow: "0 8px 32px rgba(0, 0, 0, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.05)",
    tabInactiveShadow: "none",
    tabTextActive: "#ffffff",
    tabTextInactive: "rgba(255, 255, 255, 0.5)",
    panelBackground: "rgba(10, 10, 10, 0.8)", // Semi-transparent panels
    panelBorder: "1px solid rgba(255, 255, 255, 0.15)",
    panelHeaderBg: "rgba(255, 255, 255, 0.03)",
    panelHeaderText: "rgba(255, 255, 255, 0.9)",
    panelHeaderDivider: "rgba(255, 255, 255, 0.1)",
    editorGutterBg: "transparent",
    editorGutterText: "rgba(255, 255, 255, 0.3)",
    editorGutterBorder: "rgba(255, 255, 255, 0.05)",
    editorBg: "rgba(0, 0, 0, 0.4)",
    editorText: "#ffffff",
    editorPlaceholder: "rgba(255, 255, 255, 0.25)",
    editorSelection: "rgba(255, 255, 255, 0.1)",
    botBubbleBg: "rgba(20, 20, 20, 0.6)",
    botBubbleBorder: "1px solid rgba(255, 255, 255, 0.2)",
    botBubbleTitle: "rgba(255, 255, 255, 0.5)",
    botBubbleText: "rgba(255, 255, 255, 0.9)",
    botBubbleShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
    petAuraGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)",
    petHeadBg: "#050505",
    petHeadBorder: "1px solid rgba(255, 255, 255, 0.3)",
    petEyeBg: "#000000",
    petEyeBorder: "1px solid rgba(255, 255, 255, 0.2)",
    petMouthBorder: "rgba(255, 255, 255, 0.4)",
    petBaseGradient: "linear-gradient(90deg, #222, #fff, #222)",
    petBaseBorder: "1px solid rgba(255, 255, 255, 0.5)",
    petBaseShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
    petPupilGradient: "radial-gradient(circle at 30% 20%, #fff, #555 60%, #000)",
    petPupilShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
    petShadow: "none",
    primaryButtonBg: "rgba(255, 255, 255, 0.1)", // Glass button
    primaryButtonBorder: "1px solid rgba(255, 255, 255, 0.5)",
    primaryButtonShadow: "inset 0 0 15px rgba(255, 255, 255, 0.05)",
    secondaryButtonBg: "rgba(255, 255, 255, 0.02)",
    secondaryButtonBorder: "1px solid rgba(255, 255, 255, 0.1)",
    secondaryButtonShadow: "none",
    selectBg: "rgba(20, 20, 20, 0.8)",
    selectBorder: "rgba(255, 255, 255, 0.2)",
    selectText: "#ffffff",
    focusRing: "0 0 0 2px rgba(255, 255, 255, 0.3)"
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

  const runtimeStyles = useMemo(() => {
    const isFinePointer =
      typeof window !== "undefined" &&
      "matchMedia" in window &&
      window.matchMedia("(pointer: fine)").matches;

    return {
      interactive: {
        ...(styles.interactive as React.CSSProperties),
        cursor: isFinePointer ? "none" : "default"
      } as React.CSSProperties
    };
  }, []);

  const editorBaseStyle = useMemo<React.CSSProperties>(
    () => ({
      ...styles.textarea,
      background: theme.editorBg,
      color: theme.editorText,
      caretColor: theme.accent
    }),
    [theme]
  );

  const editorFocusStyle = useMemo<React.CSSProperties>(
    () => ({
      boxShadow: theme.focusRing,
      outline: "none"
    }),
    [theme]
  );

  const [focusedEditor, setFocusedEditor] = useState<"code" | "output" | null>(
    null
  );

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
        backgroundImage: theme.pageBackgroundImage,
        color: theme.textPrimary
      }}
    >
      {/* glass overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: theme.pageGlassOverlay,
          backdropFilter: `blur(${theme.pageGlassOverlayBlurPx}px)`,
          WebkitBackdropFilter: `blur(${theme.pageGlassOverlayBlurPx}px)`,
          opacity: 1,
          zIndex: 0
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>

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

        <p style={{ ...styles.subtitle, color: theme.textMuted }}>
          Meet COGU – your friendly code explainer. Paste any snippet, pick a
          language, and get a simple, step‑by‑step breakdown.
        </p>
      </div>

      {/* Top Bot */}

      <div
        style={runtimeStyles.interactive}
        onMouseMove={handleInteractiveMove}
        onMouseLeave={handleInteractiveLeave}
      >

        {showGreeting && (
          <div
            style={{
              ...styles.greetingBubble,
              borderColor: theme.botBubbleBorder,
              background: theme.botBubbleBg,
              boxShadow: theme.botBubbleShadow
            }}
          >
            <div style={{ ...styles.greetingTitle, color: theme.botBubbleTitle }}>
              COGU
            </div>
            <div style={{ ...styles.greetingText, color: theme.botBubbleText }}>
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
                <div
                  style={{
                    ...styles.petEye,
                    background: theme.petEyeBg,
                    border: theme.petEyeBorder
                  }}
                >
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
                <div
                  style={{
                    ...styles.petEye,
                    background: theme.petEyeBg,
                    border: theme.petEyeBorder
                  }}
                >
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
              <div
                style={{
                  ...styles.petMouth,
                  borderBottom: `2px solid ${theme.petMouthBorder}`
                }}
              />
            </div>

            <div style={styles.petBase}>
              <div
                style={{
                  ...styles.petBaseInner,
                  background: theme.petBaseGradient,
                  boxShadow: theme.petBaseShadow,
                  border: theme.petBaseBorder
                }}
              />
            </div>
          </div>

          <div style={{ ...styles.petShadow, background: theme.petShadow }} />
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
                    : theme.tabInactiveShadow,
                  color: isActive ? theme.tabTextActive : theme.tabTextInactive
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
          <label style={{ ...styles.voiceLabel, color: theme.textSoft }}>
            Voice
            <select
              value={voiceGender}
              onChange={e => setVoiceGender(e.target.value as VoiceGender)}
              style={{
                ...styles.voiceSelect,
                background: theme.selectBg,
                border: `1px solid ${theme.selectBorder}`,
                color: theme.selectText,
                boxShadow: "none"
              }}
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
              background: theme.panelHeaderBg,
              color: theme.panelHeaderText,
              borderBottom: `1px solid ${theme.panelHeaderDivider}`
            }}
          >
            Code Snippet
          </div>

          <div style={styles.editorWrapper}>

            <div
              ref={codeLinesRef}
              style={{
                ...styles.lineNumbers,
                background: theme.editorGutterBg,
                color: theme.editorGutterText,
                borderRight: `1px solid ${theme.editorGutterBorder}`
              }}
            >
              <pre>{generateLineNumbers(code)}</pre>
            </div>

            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              onScroll={e => handleScroll(e, codeLinesRef)}
              placeholder="Paste your code here..."
              style={{
                ...editorBaseStyle,
                ...(focusedEditor === "code" ? editorFocusStyle : null)
              }}
              onFocus={() => setFocusedEditor("code")}
              onBlur={() => setFocusedEditor(null)}
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
              background: theme.panelHeaderBg,
              color: theme.panelHeaderText,
              borderBottom: `1px solid ${theme.panelHeaderDivider}`
            }}
          >
            Explanation
          </div>

          <div style={styles.editorWrapper}>

            <div
              ref={outputLinesRef}
              style={{
                ...styles.lineNumbers,
                background: theme.editorGutterBg,
                color: theme.editorGutterText,
                borderRight: `1px solid ${theme.editorGutterBorder}`
              }}
            >
              <pre>{generateLineNumbers(output)}</pre>
            </div>

            <textarea
              value={output}
              readOnly
              onScroll={e => handleScroll(e, outputLinesRef)}
              placeholder="Explanation will appear here..."
              style={{
                ...editorBaseStyle,
                ...(focusedEditor === "output" ? editorFocusStyle : null)
              }}
              onFocus={() => setFocusedEditor("output")}
              onBlur={() => setFocusedEditor(null)}
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
            border: `1px dashed ${theme.textSoft}`,
            boxShadow: "none",
            color: theme.textPrimary
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
            boxShadow: theme.primaryButtonShadow,
            color: theme.textPrimary
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
            boxShadow: theme.secondaryButtonShadow,
            color: theme.textPrimary
          }}
          className="secondary-btn"
        >
          Voice Output
        </button>

        <button
          onClick={copyExplanation}
          style={{
            ...styles.secondaryBtn,
            background: theme.secondaryButtonBg,
            border: theme.secondaryButtonBorder,
            boxShadow: theme.secondaryButtonShadow,
            color: theme.textPrimary
          }}
          className="secondary-btn"
        >
          Copy Explanation
        </button>

      </div>

      </div>
    </div>
  );
}

const styles: any = {

  page: {

    minHeight: "100vh",
    position: "relative",
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
    color: "#9ca3af",
    lineHeight: 1.45

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
    fontWeight: 650,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    fontSize: "12px"

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
    fontSize: "13px",
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