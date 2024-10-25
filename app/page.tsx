"use client";

import { useEffect, useState } from "react";

interface AgentResponse {
  poem: string;
  walletAddress: string;
  walletName: string;
  network: string;
}

export default function Home() {
  const [response, setResponse] = useState<AgentResponse | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const res = await fetch("/api/agent-response");
        const data = await res.json();
        setResponse(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching poem:", error);
        setIsLoading(false);
      }
    };

    fetchPoem();
  }, []);

  useEffect(() => {
    if (response?.poem && displayText.length < response.poem.length) {
      const timer = setTimeout(() => {
        setDisplayText(response.poem.slice(0, displayText.length + 1));
      }, 10); // Adjust typing speed here
      return () => clearTimeout(timer);
    }
  }, [response?.poem, displayText]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-pulse">Loading poem...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="max-w-2xl w-full border border-white/20 rounded-lg p-6">
        <div className="font-mono space-y-6">
          <div className="min-h-[200px] text-white whitespace-pre-line">
            {displayText}
          </div>
          {response && displayText.length === response.poem.length && (
            <div className="text-white/70 text-sm mt-8 border-t border-white/20 pt-4">
              You can fund the wallet at{" "}
              <span className="text-emerald-400">{response.walletAddress}</span>{" "}
              or <span className="text-emerald-400">{response.walletName}</span>{" "}
              on <span className="text-emerald-400">{response.network}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
