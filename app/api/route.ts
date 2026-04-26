import { NextResponse } from "next/server";
import type { GithubRepo, GithubCommit, GithubUser } from "@/src/type";

const BASE = "https://api.github.com";

function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchAllPages<T>(url: string): Promise<T[]> {
  const results: T[] = [];
  let page = 1;
  while (true) {
    const sep = url.includes("?") ? "&" : "?";
    const res = await fetch(`${url}${sep}per_page=100&page=${page}`, {
      headers: ghHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) break;
    const data: T[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    results.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return results;
}

async function fetchCommits(fullName: string, perRepo = 8): Promise<GithubCommit[]> {
  const res = await fetch(
    `${BASE}/repos/${fullName}/commits?per_page=${perRepo}`,
    { headers: ghHeaders(), next: { revalidate: 300 } }
  );
  if (res.status === 409 || res.status === 403 || !res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function batchFetch<T>(
  items: string[],
  fn: (item: string) => Promise<T>,
  batchSize = 5,
  delayMs = 150
): Promise<Record<string, T>> {
  const result: Record<string, T> = {};
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const settled = await Promise.allSettled(batch.map(fn));
    settled.forEach((res, idx) => {
      if (res.status === "fulfilled") result[batch[idx]] = res.value;
    });
    if (i + batchSize < items.length)
      await new Promise((r) => setTimeout(r, delayMs));
  }
  return result;
}

export async function GET() {
  try {
    // ── 1. Authenticated user ──────────────────
    const userRes = await fetch(`${BASE}/user`, {
      headers: ghHeaders(),
      next: { revalidate: 600 },
    });
    if (!userRes.ok) throw new Error(`User fetch failed: ${userRes.status}`);
    const user: GithubUser = await userRes.json();

    // ── 2. Check Organizations ──────────────────
    const orgsRes = await fetch(`${BASE}/user/orgs`, {
      headers: ghHeaders(),
      next: { revalidate: 600 },
    });
    const orgs: { login: string }[] = await orgsRes.json();
    console.log(`[github-api] Organizations found: ${orgs.map((o) => o.login).join(", ")}`);

    // ── 3. ALL repos the token can see (public + private) ────────────────────
    //    /user/repos?visibility=all&affiliation=owner,collaborator,organization_member
    const allRepos: GithubRepo[] = await fetchAllPages(
      `${BASE}/user/repos?sort=pushed&affiliation=owner,collaborator,organization_member&visibility=all`
    );

    console.log(`[github-api] Total repos found: ${allRepos.length}`);
    console.log(`[github-api] Private repos found: ${allRepos.filter(r => r.private).length}`);
    if (allRepos.filter(r => r.private).length === 0) {
        console.log("[github-api] No private repos found. Tip: Check if GITHUB_TOKEN has 'repo' scope (Classic) or 'All repositories' access (Fine-grained).");
    }


    // ── 4. Commits for top 15 most-recently-pushed ───────────────────────────
    //    Use full_name ("Meesujit/repo") so private repos resolve correctly
    const topRepos = allRepos.slice(0, 15);
    const commitsByFullName = await batchFetch(
      topRepos.map((r) => r.full_name),
      (fullName) => fetchCommits(fullName, 8),
      5,
      150
    );

    // Re-key by short name (graph builder uses repo.name)
    const commitsMap: Record<string, GithubCommit[]> = {};
    for (const repo of topRepos) {
      commitsMap[repo.name] = commitsByFullName[repo.full_name] ?? [];
    }

    return NextResponse.json(
      { user, repos: allRepos, commitsMap },
      { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch (err) {
    console.error("[github-api]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}