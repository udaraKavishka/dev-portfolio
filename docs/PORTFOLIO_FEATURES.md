# Portfolio feature backlog

Tracking the recommendations from the portfolio research pass. Mark `[x]` yourself once a completed item has been reviewed and accepted — Claude won't check items off.

- [ ] **1. Project case-study pages** (`/projects/[slug]`) — MDX-based detail pages for a few of the deepest DevOps/infra projects: problem → architecture/approach → your contribution → outcome. Reuses the blog's MDX pipeline (`lib/posts.ts` pattern, shared MDX components).
- [ ] **2. Theme persistence + system preference** — save the dark/light choice to `localStorage` and default to `prefers-color-scheme` on first visit, instead of always defaulting to dark.
- [ ] **3. Architecture diagrams on case studies** — embed real infra diagrams (Docker/K8s/Terraform/AWS) in the case-study MDX, same convention as blog post images.
- [ ] **4. RSS feed for the blog** (`/rss.xml`) — hand-built RSS 2.0 route from existing `getAllPosts()`.
- [ ] **5. Micro-interactions on project cards** — subtle framer-motion hover polish (scale/glow), staying consistent with the terminal theme.

Implementation details for each item are in the plan history; ask to pick up the next item when ready.
