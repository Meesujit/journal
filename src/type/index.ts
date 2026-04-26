// ==============================
// GitHub API Types
// ==============================

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  fork: boolean;
  topics: string[];
}

export interface GithubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url: string;
}

export interface ContributionDay {
  date: string;        // "2024-04-26"
  count: number;
}

// ==============================
// Graph Types
// ==============================

export type NodeType = "profile" | "repo" | "commit" | "author";

export interface GraphNode {
  id: string;
  type: NodeType;
  label?: string;
  size?: number;
  color?: string;
  repo?: GithubRepo;
  commit?: GithubCommit;
  profile?: GithubUser;
}

export interface GraphLink {
  source: string;
  target: string;
  type?: "profile-repo" | "repo-commit" | "commit-author";
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export type CommitsMap = Record<string, GithubCommit[]>;

// ==============================
// Utility
// ==============================

export function dedupeNodes(nodes: GraphNode[]): GraphNode[] {
  const map = new Map<string, GraphNode>();
  for (const node of nodes) {
    if (!map.has(node.id)) map.set(node.id, node);
  }
  return Array.from(map.values());
}

export function buildGraph(
  user: GithubUser,
  repos: GithubRepo[],
  commitsMap: CommitsMap
): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Profile node
  nodes.push({
    id: user.login,
    type: "profile",
    label: user.name ?? user.login,
    profile: user,
    size: 14,
  });

  for (const repo of repos) {
    nodes.push({
      id: repo.name,
      type: "repo",
      label: repo.name,
      repo,
      size: 8,
    });

    links.push({ source: user.login, target: repo.name, type: "profile-repo" });

    const commits = Array.isArray(commitsMap[repo.name])
      ? commitsMap[repo.name]
      : [];

    for (const commit of commits) {
      nodes.push({
        id: commit.sha,
        type: "commit",
        label: commit.commit.message.split("\n")[0],
        commit,
        size: 3,
      });

      links.push({ source: repo.name, target: commit.sha, type: "repo-commit" });

      if (commit.author) {
        nodes.push({
          id: commit.author.login,
          type: "author",
          label: commit.author.login,
          size: 5,
        });

        links.push({
          source: commit.sha,
          target: commit.author.login,
          type: "commit-author",
        });
      }
    }
  }

  return { nodes: dedupeNodes(nodes), links };
}