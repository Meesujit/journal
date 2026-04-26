"use client";

import dynamic from "next/dynamic";
import { buildGraph, type GraphData, type GithubUser } from "@/src/type";
import { useEffect, useState } from "react";

const GitHubGraph = dynamic(() => import("@/src/components/graph"), { ssr: false });

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; graphData: GraphData; user: GithubUser };

export default function GithubProfile() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api");
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        const { user, repos, commitsMap } = await res.json();
        if (!user || !Array.isArray(repos)) throw new Error("Unexpected API shape");
        setState({ status: "ok", graphData: buildGraph(user, repos, commitsMap ?? {}), user });
      } catch (err) {
        setState({ status: "error", message: err instanceof Error ? err.message : "Unknown error" });
      }
    }
    load();
  }, []);

  if (state.status === "loading") {
    return (
      // Light background by default — theme will override via CSS vars
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 font-mono">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
          style={{ animation: "spin 1s linear infinite" }}>
          <circle cx="16" cy="16" r="14" stroke="#d0d7de" strokeWidth="3" className="dark:stroke-[#1e1e1e]" />
          <circle cx="16" cy="16" r="14" stroke="#1a7f37" strokeWidth="3"
            strokeDasharray="40 50" strokeLinecap="round"
            className="dark:stroke-[#3fb950]" />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </svg>
        <p className="text-sm text-[#57606a] dark:text-[#666]">Fetching repositories…</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center font-mono text-sm text-[#cf222e] dark:text-[#f85149]">
        Error: {state.message}
      </div>
    );
  }

  return <GitHubGraph graphData={state.graphData} user={state.user} />;
}