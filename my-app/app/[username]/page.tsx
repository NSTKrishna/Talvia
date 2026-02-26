"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Copy,
  Share2,
  ExternalLink,
  Star,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Eye,
  Building2,
  Wifi,
} from "lucide-react";
import {
  getGithubUser,
  getGithubRepos,
  getGithubCommit,
} from "../api/github.api";
import { useEffect, useState } from "react";
import { GithubRepo, GithubUser, GithubCommit } from "../api/types";

export default function ProfilePage() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [commit, setCommit] = useState<GithubCommit | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;

  useEffect(() => {
    if (!username) return;

    async function loadData() {
      try {
        setLoading(true);
        const userRes = await getGithubUser(username);
        const repoRes = await getGithubRepos(username, 10);
        const commitRes = await getGithubCommit(username, 10);

        setUser(userRes.data.user);
        setRepos(repoRes.data.user.repositories.nodes);
        setCommit(commitRes.data.user);
      } catch (err) {
        console.error("Error loading GitHub data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [username]);

  const langColorMap: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Go: "#00ADD8",
    Rust: "#dea584",
    Python: "#3572A5",
    C: "#555555",
    "C++": "#f34b7d",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Swift: "#F05138",
  };

  const languages = (() => {
    const counts: Record<string, number> = {};
    repos.forEach((repo) => {
      const lang = repo.primaryLanguage?.name;
      if (lang) counts[lang] = (counts[lang] || 0) + 1;
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        value: Math.round((count / total) * 100),
        color: langColorMap[name] || "#8b949e",
      }));
  })();

  const topLangs = languages.slice(0, 3).map((l) => l.name);

  const externalMergedPRs = (() => {
    if (!user) return 0;
    let count = 0;
    const prByRepo =
      user.contributionsCollection.pullRequestContributionsByRepository;
    for (const repoContrib of prByRepo) {
      const repoOwner = repoContrib.repository.owner.login;
      if (repoOwner.toLowerCase() === user.login.toLowerCase()) continue;
      for (const node of repoContrib.contributions.nodes) {
        if (node.pullRequest.state === "MERGED") count++;
      }
    }
    return count;
  })();

  const orgs = user?.organizations?.nodes ?? [];

  const activeRepos = (commit?.repositories?.nodes ?? [])
    .map((repo) => ({
      name: repo.name,
      commits: repo.defaultBranchRef?.target?.history.totalCount ?? 0,
    }))
    .sort((a, b) => b.commits - a.commits)
    .slice(0, 5);

  const maxCommits = activeRepos[0]?.commits || 1;

  const grid = [
    [3, 2, 0, 4, 1, 3, 2, 0, 1, 4, 2, 3],
    [0, 3, 4, 1, 2, 0, 3, 1, 4, 2, 0, 3],
    [2, 0, 1, 3, 4, 2, 1, 3, 0, 2, 4, 1],
    [1, 4, 2, 0, 3, 1, 4, 0, 2, 3, 1, 2],
    [0, 2, 3, 1, 0, 4, 2, 3, 1, 0, 3, 4],
  ];

  const gridColor = (level: number) => {
    if (level === 0) return "bg-[#161b22]";
    if (level === 1) return "bg-[#ff8c00]/20";
    if (level === 2) return "bg-[#ff8c00]/40";
    if (level === 3) return "bg-[#ff8c00]/65";
    return "bg-[#ff8c00]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-2 border-[#ff8c00] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8b949e] text-sm font-mono">Loading profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e8eaed] font-mono">
      {/* ═══════════ NAVBAR ═══════════ */}
      <div>
        <h1
          className="px-6 py-4 text-2xl font-bold cursor-pointer hover:text-[#ff8c00] transition-colors"
          onClick={() => router.push("/")}
        >
          TALVIA
        </h1>
      </div>
      {/* ═══════════ HEADER ═══════════ */}
      <header className="border-b border-[#21262d] px-6 md:px-10 py-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-start gap-8">
          {/* Left — avatar + info */}
          <div className="flex gap-5 flex-1 min-w-0">
            {/* Avatar with orange left accent */}
            <div className="relative flex-shrink-0">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-[#ff8c00]" />
              <Image
                src={user?.avatarUrl ?? ""}
                alt={user?.name ?? "GitHub avatar"}
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20 rounded-md ml-2 bg-[#161b22]"
              />
              <span className="absolute -bottom-0.5 right-0 size-3 rounded-full bg-[#ff8c00] border-2 border-[#0d1117]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#e8eaed] truncate">
                  {user?.name ?? "—"}
                </h1>
                <a
                  href={user?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#ff8c00] transition-colors"
                >
                  <ExternalLink className="size-4" />
                </a>
                <button className="text-[#8b949e] hover:text-[#ff8c00] transition-colors">
                  <Copy className="size-4" />
                </button>
                <button className="text-[#8b949e] hover:text-[#ff8c00] transition-colors">
                  <Share2 className="size-4" />
                </button>
              </div>
              <p className="text-[#8b949e] text-sm mt-0.5">
                @{user?.login ?? "—"}
              </p>
              <p className="text-[#8b949e] text-sm mt-2 italic">
                {user?.bio ?? ""}
              </p>
            </div>
          </div>

          {/* Right — stats + contribution grid */}
          <div className="flex items-start gap-8 flex-shrink-0">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#e8eaed]">
                  {user?.repositories.totalCount ?? "—"}
                </div>
                <p className="text-[10px] text-[#8b949e] uppercase tracking-[0.15em] mt-0.5">
                  Repos
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#e8eaed]">
                  {user?.followers.totalCount ?? "—"}
                </div>
                <p className="text-[10px] text-[#8b949e] uppercase tracking-[0.15em] mt-0.5">
                  Followers
                </p>
              </div>
            </div>

            {/* Contribution grid */}
            <div className="hidden lg:flex flex-col gap-[3px]">
              {grid.map((row, ri) => (
                <div key={ri} className="flex gap-[3px]">
                  {row.map((level, ci) => (
                    <div
                      key={ci}
                      className={`size-[10px] rounded-[2px] ${gridColor(level)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ ABOUT ═══════════ */}
      <section className="px-6 md:px-10 py-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[10px] text-[#8b949e] uppercase tracking-[0.2em] mb-4">
            About
          </h2>
          <div className="rounded-lg border border-[#21262d] bg-[#161b22] p-6">
            <p className="text-[#c9d1d9] text-sm leading-relaxed">
              {user?.name ?? "This user"} maintains{" "}
              {user?.repositories.totalCount ?? 0} public repositories spanning{" "}
              {topLangs.join(", ") || "various languages"}. Has{" "}
              {user?.followers.totalCount ?? 0} followers and follows{" "}
              {user?.following.totalCount ?? 0} developers on GitHub.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ INSIGHTS LABEL ═══════════ */}
      <div className="px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto border-t border-[#21262d] pt-6">
          <h2 className="text-[10px] text-[#8b949e] uppercase tracking-[0.2em] text-center mb-6">
            Insights
          </h2>
        </div>
      </div>

      {/* ═══════════ 3-COLUMN GRID ═══════════ */}
      <section className="px-6 md:px-10 pb-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-5">
          {/* ──── LEFT COLUMN ──── */}
          <div className="space-y-5">
            {/* This Year */}
            <div className="rounded-lg border border-[#21262d] bg-[#161b22] p-5">
              <p className="text-[10px] text-[#8b949e] uppercase tracking-[0.15em] mb-5">
                This Year
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center size-8 rounded-md bg-[#ff8c00]/15">
                    <GitCommit className="size-4 text-[#ff8c00]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#e8eaed] leading-none">
                      {user?.contributionsCollection.totalCommitContributions ??
                        "—"}
                    </p>
                    <p className="text-[10px] text-[#8b949e] uppercase tracking-wider mt-0.5">
                      Commits
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center size-8 rounded-md bg-[#ff8c00]/15">
                    <GitPullRequest className="size-4 text-[#ff8c00]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#e8eaed] leading-none">
                      {user?.contributionsCollection
                        .totalPullRequestContributions ?? "—"}
                    </p>
                    <p className="text-[10px] text-[#8b949e] uppercase tracking-wider mt-0.5">
                      PRs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center size-8 rounded-md bg-[#238636]/15">
                    <AlertCircle className="size-4 text-[#3fb950]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#e8eaed] leading-none">
                      {user?.contributionsCollection.totalIssueContributions ??
                        "—"}
                    </p>
                    <p className="text-[10px] text-[#8b949e] uppercase tracking-wider mt-0.5">
                      Issues
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center size-8 rounded-md bg-[#ff8c00]/15">
                    <Eye className="size-4 text-[#ff8c00]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#e8eaed] leading-none">
                      {user?.contributionsCollection
                        .totalPullRequestReviewContributions ?? "—"}
                    </p>
                    <p className="text-[10px] text-[#8b949e] uppercase tracking-wider mt-0.5">
                      Reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Most Active */}
            <div className="rounded-lg border border-[#21262d] bg-[#161b22] p-5">
              <p className="text-[10px] text-[#8b949e] uppercase tracking-[0.15em] mb-4">
                Most Active In
              </p>
              <div className="space-y-3">
                {activeRepos.map((repo) => (
                  <div key={repo.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#c9d1d9]">{repo.name}</span>
                      <span className="text-[#ff8c00] font-semibold tabular-nums">
                        {repo.commits}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#21262d] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(repo.commits / maxCommits) * 100}%`,
                          background:
                            "linear-gradient(90deg, #ff8c00, #ff6f00)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ──── MIDDLE COLUMN — Projects ──── */}
          <div className="rounded-lg border border-[#21262d] bg-[#161b22] p-5">
            <div className="flex items-baseline justify-between mb-4">
              <p className="text-[10px] text-[#8b949e] uppercase tracking-[0.15em]">
                Projects
              </p>
              <p className="text-[10px] text-[#8b949e]">
                {repos.length} pinned
              </p>
            </div>
            <div className="space-y-1">
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between py-3 border-b border-[#21262d] last:border-0 cursor-pointer hover:bg-[#1c2128] -mx-2 px-2 rounded transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-[#e8eaed] group-hover:text-[#ff8c00] transition-colors">
                      {repo.name}
                    </h3>
                    {repo.homepageUrl && (
                      <p className="text-xs text-[#8b949e] mt-0.5 truncate">
                        {repo.homepageUrl}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-3 flex-shrink-0 text-xs text-[#8b949e]">
                    <span>{repo.primaryLanguage?.name ?? "—"}</span>
                    <Star className="size-3 text-[#ff8c00]" />
                    <span className="text-[#ff8c00] tabular-nums">
                      {repo.stargazerCount}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ──── RIGHT COLUMN ──── */}
          <div className="space-y-5">
            {/* In Public Repos */}
            <div className="rounded-lg border border-[#21262d] bg-[#161b22] p-5">
              <p className="text-[10px] text-[#8b949e] uppercase tracking-[0.15em] mb-4">
                In Public Repos
              </p>
              <div className="flex flex-wrap gap-2">
                {topLangs.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ff8c00] text-[#0d1117]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Signals */}
            <div className="rounded-lg border border-[#21262d] bg-[#161b22] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Wifi className="size-3.5 text-[#ff8c00]" />
                <p className="text-[10px] text-[#8b949e] uppercase tracking-[0.15em]">
                  Signals
                </p>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-9 rounded-md bg-[#ff8c00]/15">
                  <GitPullRequest className="size-4 text-[#ff8c00]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#e8eaed] leading-none">
                    {externalMergedPRs}
                  </p>
                  <p className="text-[10px] text-[#8b949e] uppercase tracking-wider mt-0.5">
                    External PRs Merged
                  </p>
                </div>
              </div>
              {orgs.length > 0 ? (
                <div className="space-y-3">
                  {orgs.map((org) => (
                    <a
                      key={org.login}
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:bg-[#1c2128] -mx-2 px-2 py-1.5 rounded transition-colors"
                    >
                      <div className="flex items-center justify-center size-9 rounded-md bg-[#21262d] overflow-hidden">
                        <Image
                          src={org.avatarUrl}
                          alt={org.name ?? org.login}
                          width={36}
                          height={36}
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-[#c9d1d9]">
                          {org.name ?? org.login}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-9 rounded-md bg-[#21262d]">
                    <Building2 className="size-4 text-[#8b949e]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#8b949e]">No organizations</p>
                  </div>
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="rounded-lg border border-[#21262d] bg-[#161b22] p-5">
              <p className="text-[10px] text-[#8b949e] uppercase tracking-[0.15em] mb-4">
                Languages
              </p>
              <div className="flex h-2.5 rounded-full overflow-hidden mb-4">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="h-full first:rounded-l-full last:rounded-r-full"
                    style={{
                      width: `${lang.value}%`,
                      backgroundColor: lang.color,
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <span
                      className="size-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-[#c9d1d9]">{lang.name}</span>
                    <span className="text-[#8b949e]">{lang.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
