# Talvia

**Talvia** is a GitHub Profile Insights tool that lets you explore any GitHub user's repositories, languages, contributions, and more — all in one clean, dark-themed dashboard.

![Talvia](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)

---

## Features

- 🔍 **Profile Search** — Enter any GitHub username to instantly pull up their profile
- 📊 **Contribution Stats** — View commits, pull requests, issues, and code reviews for the current year
- 🗂️ **Top Repositories** — Browse a user's most recent public repositories with star counts and primary language
- 📈 **Language Breakdown** — Visual bar showing the distribution of programming languages across public repos
- 🔥 **Most Active Repos** — Bar chart of repos ranked by total commit count
- 🤝 **External PRs Merged** — Count of merged pull requests made to repositories owned by others
- 🏢 **Organizations** — List of GitHub organizations the user belongs to
- 🌙 **Dark Mode** — GitHub-inspired dark UI out of the box

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + Radix UI |
| Data Fetching | [Apollo Client](https://www.apollographql.com/docs/react/) |
| API | [GitHub GraphQL API v4](https://docs.github.com/en/graphql) |
| Icons | [Lucide React](https://lucide.dev/) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A GitHub Personal Access Token with the following scopes:
  - `read:user`
  - `read:org`
  - `repo` (public repositories)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/NSTKrishna/Talvia.git
   cd Talvia/my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the `my-app` directory:

   ```env
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. On the home page, type a GitHub username into the search bar and press **Enter** or click the arrow button.
2. The profile dashboard loads with the user's stats and insights.
3. Click any repository name to open it on GitHub.
4. Click the **TALVIA** heading to return to the search page.

---

## Project Structure

```
my-app/
├── app/
│   ├── [username]/       # Dynamic profile page
│   ├── api/              # GitHub GraphQL queries, API helpers, and types
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Home / search page
├── components/           # Reusable UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...config files
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## License

This project is open source. Feel free to use, modify, and distribute it.
