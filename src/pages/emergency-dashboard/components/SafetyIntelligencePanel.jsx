import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { askGemini } from "../../../utils/geminiapi";

const SafetyIntelligencePanel = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [error, setError] = useState(null);

  const handleAsk = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await askGemini(input);

      setAiResponse(res.response);
      setIsEmergency(res.is_emergency);

    } catch (err) {
      console.error(err);
      setError("AI failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-card rounded-2xl p-4 md:p-6 shadow-glow-md">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Brain" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold">Safety Intelligence (AI)</h3>
      </div>

      {/* INPUT */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe what is happening... (e.g. someone is following me)"
        className="w-full p-3 rounded-lg bg-background border border-border text-sm resize-none mb-3"
        rows={3}
      />

      <Button
        onClick={handleAsk}
        loading={loading}
        disabled={loading}
        iconName="Send"
        fullWidth
      >
        {loading ? "Thinking..." : "Ask AI"}
      </Button>

      {/* ERROR */}
      {error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
          {error}
        </div>
      )}

      {/* RESPONSE */}
      {aiResponse && (
        <div
          className={`mt-4 p-4 rounded-xl border ${
            isEmergency
              ? "bg-red-500/10 border-red-500 text-red-600"
              : "bg-green-500/10 border-green-500 text-green-600"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon
              name={isEmergency ? "AlertTriangle" : "CheckCircle"}
              size={20}
            />
            <p className="font-semibold">
              {isEmergency ? "Danger Detected" : "Situation Seems Safe"}
            </p>
          </div>

          <p className="text-sm whitespace-pre-line text-foreground">
            {aiResponse}
          </p>

         {isEmergency && (
  <div className="mt-4 p-4 rounded-xl bg-red-600/10 border border-red-600 animate-pulse">
    <div className="flex items-center gap-2 mb-2 text-red-600">
      <Icon name="Siren" size={22} />
      <span className="font-bold text-lg">AI DETECTED DANGER</span>
    </div>

    <p className="text-sm text-red-700 mb-3">
      Your situation sounds dangerous. You should activate SOS immediately.
    </p>

    <button
      onClick={() => {
        window.dispatchEvent(new Event("AI_EMERGENCY_DETECTED"));
      }}
      className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition"
    >
      🚨 ACTIVATE SOS NOW
    </button>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default SafetyIntelligencePanel;
