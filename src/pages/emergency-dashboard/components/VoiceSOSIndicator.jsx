import React, { useEffect, useRef, useState } from "react";
import Icon from "../../../components/AppIcon";

const BASE_URL = "https://black-widow-woman-safety.onrender.com";

const VoiceSOSIndicator = () => {
  const [listening, setListening] = useState(false);
  const [lastText, setLastText] = useState("");
  const recognitionRef = useRef(null);

  // ===============================
  // INIT SPEECH RECOGNITION
  // ===============================
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const text = event.results[event.results.length - 1][0].transcript;
      console.log("🎙️ Heard:", text);
      setLastText(text);
      // ==============================
      // Send to Gemini
      // ==============================
      try {
        const res = await fetch(`${BASE_URL}/gemini/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });

        const data = await res.json();

        console.log("🧠 Gemini:", data);

        if (data.is_emergency === true) {
          console.log("🚨 AI DETECTED EMERGENCY VIA VOICE");

          // ===============================
          // 🔥 Trigger SOS automatically
          // ===============================
          window.dispatchEvent(new Event("AI_EMERGENCY_DETECTED"));
        }
      } catch (err) {
        console.warn("Gemini voice check failed");
      }
    };

    recognition.onerror = (e) => {
      console.warn("Speech error", e);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  // ===============================
  // TOGGLE LISTENING
  // ===============================
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="w-full bg-card rounded-2xl p-4 shadow-glow-md border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon
            name="Mic"
            size={24}
            className={listening ? "text-red-500 animate-pulse" : "text-muted-foreground"}
          />
          <div>
            <p className="font-semibold">Voice Emergency Detection</p>
            <p className="text-xs text-muted-foreground">
              Say “help”, “someone is following me”, “I’m in danger”
            </p>
          </div>
        </div>

        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            listening
              ? "bg-red-600 text-white"
              : "bg-muted text-foreground"
          }`}
        >
          {listening ? "STOP" : "START"}
        </button>
      </div>

      {lastText && (
        <div className="mt-3 text-xs text-muted-foreground">
          Last heard: <span className="italic">"{lastText}"</span>
        </div>
      )}
    </div>
  );
};

export default VoiceSOSIndicator;
