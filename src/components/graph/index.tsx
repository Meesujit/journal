"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { ReactNode } from "react";
import ForceGraph3D, {
  type ForceGraphMethods,
  type NodeObject,
} from "react-force-graph-3d";
import {
  GitCommit, GitFork, Star, ExternalLink,
  Users, Code, X, Lock,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { GraphData, GraphLink, GraphNode, GithubCommit, GithubUser } from "@/src/type";

// ─── Node accent colours (same in both themes) ───────────────────────────────
const NODE_COLORS: Record<GraphNode["type"], string> = {
  profile: "#f0c040",
  repo:    "#58a6ff",
  commit:  "#3fb950",
  author:  "#bc8cff",
};
const NODE_LABELS: Record<GraphNode["type"], string> = {
  profile: "Profile",
  repo:    "Repository",
  commit:  "Commit",
  author:  "Author",
};

// ─── Theme token maps ─────────────────────────────────────────────────────────
function tokens(dark: boolean) {
  return dark
    ? {
        bg:          "#0a0a0a",
        bgGraph:     "#0a0a0a",
        surface:     "#111111",
        surfaceHigh: "#161616",
        border:      "#1e1e1e",
        borderBright:"#2a2a2a",
        text:        "#e8e8e8",
        textMid:     "#999999",
        textDim:     "#555555",
        green:       "#3fb950",
        greenDim:    "#0e4429",
        blue:        "#58a6ff",
        purple:      "#bc8cff",
        orange:      "#f0883e",
        red:         "#f85149",
      }
    : {
        bg:          "#ffffff",
        bgGraph:     "#f6f8fa",
        surface:     "#ffffff",
        surfaceHigh: "#f6f8fa",
        border:      "#d0d7de",
        borderBright:"#afb8c1",
        text:        "#1f2328",
        textMid:     "#57606a",
        textDim:     "#8c959f",
        green:       "#1a7f37",
        greenDim:    "#dafbe1",
        blue:        "#0969da",
        purple:      "#8250df",
        orange:      "#bc4c00",
        red:         "#cf222e",
      };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(d?: string) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("en", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(d));
}
function shortSha(sha: string) { return sha.slice(0, 7); }
function getLinkId(v: unknown): string {
  if (typeof v === "object" && v !== null && "id" in v)
    return String((v as { id: unknown }).id);
  return String(v);
}

// ─── Detail helpers ───────────────────────────────────────────────────────────
function Row({ label, value, t }: { label: string; value: ReactNode; t: ReturnType<typeof tokens> }) {
  return (
    <div style={{ borderBottom: `1px solid ${t.border}`, padding: "9px 0" }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: t.textDim, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: t.text, wordBreak: "break-word", lineHeight: 1.5 }}>{value ?? "—"}</div>
    </div>
  );
}

function Stat({ icon, value, label, color, t }: { icon: ReactNode; value: ReactNode; label: string; color: string; t: ReturnType<typeof tokens> }) {
  return (
    <div style={{ border: `1px solid ${t.border}`, borderRadius: 8, padding: "10px 12px", flex: 1, background: t.surfaceHigh }}>
      <div style={{ color }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: t.text, marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ─── Panels ───────────────────────────────────────────────────────────────────
function ProfilePanel({ node, allCommits, t }: { node: GraphNode; allCommits: GithubCommit[]; t: ReturnType<typeof tokens> }) {
  const u = node.profile!;
  return (
    <div>
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${t.border}` }}>
        <img src={u.avatar_url} alt={u.login} style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${t.borderBright}` }} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{u.name ?? u.login}</div>
          <div style={{ fontSize: 12, color: t.textDim }}>@{u.login}</div>
          {u.bio && <div style={{ fontSize: 12, color: t.textMid, marginTop: 4, lineHeight: 1.4 }}>{u.bio}</div>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Stat icon={<Code size={14} />} value={u.public_repos} label="Public Repos" color={t.blue} t={t} />
        <Stat icon={<Users size={14} />} value={u.followers} label="Followers" color={t.purple} t={t} />
        <Stat icon={<GitCommit size={14} />} value={allCommits.length} label="Commits" color={t.green} t={t} />
      </div>
      <Row label="Member since" value={fmt(u.created_at)} t={t} />
      <a href={u.html_url} target="_blank" rel="noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 12, fontWeight: 600, color: t.blue, textDecoration: "none", border: `1px solid ${t.blue}`, borderRadius: 6, padding: "6px 12px" }}>
        View on GitHub <ExternalLink size={12} />
      </a>
    </div>
  );
}

function RepoPanel({ node, commits, t }: { node: GraphNode; commits: GithubCommit[]; t: ReturnType<typeof tokens> }) {
  const r = node.repo!;
  return (
    <div>
      {r.private && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: t.textMid, border: `1px solid ${t.border}`, borderRadius: 4, padding: "3px 8px", marginBottom: 12 }}>
          <Lock size={11} /> Private repository
        </div>
      )}
      <Row label="Description" value={r.description ?? "No description"} t={t} />
      <Row label="Language" value={r.language} t={t} />
      <Row label="Default branch" value={r.default_branch} t={t} />
      <Row label="Last pushed" value={fmt(r.pushed_at)} t={t} />
      <Row label="Created" value={fmt(r.created_at)} t={t} />
      <div style={{ display: "flex", gap: 8, margin: "14px 0" }}>
        <Stat icon={<Star size={14} />} value={r.stargazers_count} label="Stars" color={t.orange} t={t} />
        <Stat icon={<GitFork size={14} />} value={r.forks_count} label="Forks" color={t.blue} t={t} />
        <Stat icon={<GitCommit size={14} />} value={commits.length} label="Commits" color={t.green} t={t} />
      </div>
      {r.topics && r.topics.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
          {r.topics.map((topic) => (
            <span key={topic} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, border: `1px solid ${t.blue}33`, color: t.blue, background: `${t.blue}11` }}>{topic}</span>
          ))}
        </div>
      )}
      {commits.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: t.textDim, margin: "14px 0 8px" }}>Recent Commits</div>
          {commits.slice(0, 6).map((c) => (
            <div key={c.sha} style={{ border: `1px solid ${t.border}`, borderRadius: 6, padding: "8px 10px", marginBottom: 6, background: t.surfaceHigh }}>
              <div style={{ fontSize: 12, color: t.text, fontWeight: 500, lineHeight: 1.4, marginBottom: 4 }}>{c.commit.message.split("\n")[0]}</div>
              <div style={{ fontSize: 11, color: t.textDim }}>
                <span style={{ color: t.green, fontFamily: "monospace" }}>{shortSha(c.sha)}</span>
                {" · "}{c.author?.login ?? c.commit.author.name}
                {" · "}{fmt(c.commit.author.date)}
              </div>
            </div>
          ))}
        </div>
      )}
      <a href={r.html_url} target="_blank" rel="noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 12, fontWeight: 600, color: t.text, textDecoration: "none", background: t.surfaceHigh, border: `1px solid ${t.border}`, borderRadius: 6, padding: "6px 12px" }}>
        Open Repository <ExternalLink size={12} />
      </a>
    </div>
  );
}

function CommitPanel({ node, t }: { node: GraphNode; t: ReturnType<typeof tokens> }) {
  const c = node.commit!;
  return (
    <div>
      <Row label="SHA" value={<span style={{ fontFamily: "monospace", color: t.green }}>{c.sha}</span>} t={t} />
      <Row label="Message" value={c.commit.message} t={t} />
      <Row label="Author" value={c.author?.login ?? c.commit.author.name} t={t} />
      <Row label="Date" value={fmt(c.commit.author.date)} t={t} />
      {c.html_url && (
        <a href={c.html_url} target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 12, fontWeight: 600, color: t.text, textDecoration: "none", background: t.surfaceHigh, border: `1px solid ${t.border}`, borderRadius: 6, padding: "6px 12px" }}>
          View Commit <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}

function AuthorPanel({ node, commits, t }: { node: GraphNode; commits: GithubCommit[]; t: ReturnType<typeof tokens> }) {
  return (
    <div>
      <Row label="GitHub username" value={node.label ?? node.id} t={t} />
      <Row label="Commits in graph" value={commits.length} t={t} />
      {commits.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: t.textDim, margin: "14px 0 8px" }}>Their Commits</div>
          {commits.slice(0, 5).map((c) => (
            <div key={c.sha} style={{ border: `1px solid ${t.border}`, borderRadius: 6, padding: "8px 10px", marginBottom: 6, background: t.surfaceHigh }}>
              <div style={{ fontSize: 12, color: t.text }}>{c.commit.message.split("\n")[0]}</div>
              <div style={{ fontSize: 11, color: t.textDim, marginTop: 4 }}>
                <span style={{ fontFamily: "monospace", color: t.green }}>{shortSha(c.sha)}</span>
                {" · "}{fmt(c.commit.author.date)}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
type GraphProps = { graphData: GraphData; user: GithubUser };
type GNO = NodeObject<GraphNode>;

export default function GitHubGraph({ graphData, user }: GraphProps) {
  const graphRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(undefined);
  const { resolvedTheme } = useTheme();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = resolvedTheme === "dark";
  const t = tokens(isDark);

  const activeNode = selectedNode ?? graphData.nodes.find((n) => n.type === "profile") ?? null;

  const allCommits = useMemo(() =>
    graphData.nodes.filter((n) => n.type === "commit" && n.commit).map((n) => n.commit!),
    [graphData.nodes]
  );

  const relatedCommits = useMemo(() => {
    if (!activeNode) return [];
    if (activeNode.type === "commit" && activeNode.commit) return [activeNode.commit];
    const linkedIds = new Set(
      graphData.links
        .filter((l) => getLinkId(l.source) === activeNode.id || getLinkId(l.target) === activeNode.id)
        .map((l) => getLinkId(l.source) === activeNode.id ? getLinkId(l.target) : getLinkId(l.source))
    );
    return graphData.nodes
      .filter((n) => n.type === "commit" && linkedIds.has(n.id) && n.commit)
      .map((n) => n.commit!);
  }, [activeNode, graphData]);

  const authorCommits = useMemo(() => {
    if (!activeNode || activeNode.type !== "author") return [];
    return allCommits.filter((c) => c.author?.login === activeNode.id);
  }, [activeNode, allCommits]);

  useEffect(() => {
    const update = () => {
      setDimensions({
        width:  Math.max(320, window.innerWidth - 400),
        height: window.innerWidth < 768 ? 400 : window.innerHeight - 65,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleClick = useCallback((node: GNO) => {
    setSelectedNode(node);
    if (node.x !== undefined && node.y !== undefined && node.z !== undefined) {
      const dist = 90;
      const ratio = 1 + dist / Math.hypot(node.x, node.y, node.z);
      graphRef.current?.cameraPosition(
        { x: node.x * ratio, y: node.y * ratio, z: node.z * ratio },
        { x: node.x, y: node.y, z: node.z },
        900
      );
    }
  }, []);

  const stats = useMemo(() => ({
    repos:   graphData.nodes.filter((n) => n.type === "repo").length,
    commits: graphData.nodes.filter((n) => n.type === "commit").length,
    authors: graphData.nodes.filter((n) => n.type === "author").length,
  }), [graphData.nodes]);

  // Don't render until theme is resolved to avoid flash
  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace", display: "flex", flexDirection: "column" }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: `1px solid ${t.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: t.surface, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={user.avatar_url} alt={user.login} style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${t.borderBright}` }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1 }}>{user.name ?? user.login}</div>
            <div style={{ fontSize: 11, color: t.textDim, marginTop: 2 }}>@{user.login} · Graph Explorer</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {([["Repos", stats.repos, t.blue], ["Commits", stats.commits, t.green], ["Authors", stats.authors, t.purple]] as const).map(([l, v, c]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: c, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 10, color: t.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Graph canvas */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {/* Legend */}
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, padding: "7px 12px", display: "flex", gap: 14, boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.1)" }}>
            {Object.entries(NODE_LABELS).map(([type, label]) => (
              <span key={type} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: t.textMid }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: NODE_COLORS[type as GraphNode["type"]], display: "inline-block" }} />
                {label}
              </span>
            ))}
          </div>

          <ForceGraph3D<GraphNode, GraphLink>
            ref={graphRef}
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor={t.bgGraph}
            showNavInfo={false}
            nodeRelSize={5}
            nodeVal={(n) => n.size ?? 4}
            nodeColor={(n) => NODE_COLORS[n.type]}
            nodeOpacity={0.95}
            nodeResolution={16}
            nodeLabel={(n) => `<div style="background:${t.surface};border:1px solid ${t.border};border-radius:6px;padding:8px 10px;font:600 12px monospace;color:${t.text}">${NODE_LABELS[n.type]}<br><span style="font-weight:400;color:${t.textMid}">${n.label ?? n.id}</span></div>`}
            linkColor={(l) =>
              l.type === "profile-repo" ? "rgba(240,192,64,0.4)"
              : l.type === "repo-commit" ? "rgba(88,166,255,0.35)"
              : "rgba(188,140,255,0.25)"
            }
            linkWidth={(l) => l.type === "profile-repo" ? 1.8 : l.type === "repo-commit" ? 1.3 : 0.8}
            linkOpacity={0.9}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.004}
            linkDirectionalParticleWidth={1.5}
            linkDirectionalParticleColor={(l) =>
              l.type === "profile-repo" ? NODE_COLORS.profile
              : l.type === "repo-commit" ? NODE_COLORS.repo
              : NODE_COLORS.author
            }
            onNodeClick={handleClick}
            onBackgroundClick={() => setSelectedNode(null)}
            enableNodeDrag
          />
        </div>

        {/* Detail panel */}
        <div style={{
          width: 380,
          background: t.surface,
          borderLeft: `1px solid ${t.border}`,
          overflowY: "auto",
          padding: 20,
          flexShrink: 0,
        }}>
          {activeNode ? (
            <>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <span style={{
                    display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
                    textTransform: "uppercase", padding: "3px 8px", borderRadius: 4,
                    border: `1px solid ${NODE_COLORS[activeNode.type]}`,
                    color: NODE_COLORS[activeNode.type],
                    background: `${NODE_COLORS[activeNode.type]}11`,
                  }}>
                    {NODE_LABELS[activeNode.type]}
                  </span>
                  <h2 style={{ margin: "8px 0 0", fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.3 }}>
                    {activeNode.type === "commit"
                      ? activeNode.commit?.commit.message.split("\n")[0]
                      : activeNode.label ?? activeNode.id}
                  </h2>
                </div>
                {selectedNode && (
                  <button onClick={() => setSelectedNode(null)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: t.textDim, padding: 4, borderRadius: 4 }}>
                    <X size={15} />
                  </button>
                )}
              </div>

              {activeNode.type === "profile" && <ProfilePanel node={activeNode} allCommits={allCommits} t={t} />}
              {activeNode.type === "repo"    && <RepoPanel    node={activeNode} commits={relatedCommits} t={t} />}
              {activeNode.type === "commit"  && <CommitPanel  node={activeNode} t={t} />}
              {activeNode.type === "author"  && <AuthorPanel  node={activeNode} commits={authorCommits} t={t} />}
            </>
          ) : (
            <div style={{ color: t.textDim, fontSize: 13 }}>Click any node to inspect it.</div>
          )}
        </div>
      </div>
    </div>
  );
}
