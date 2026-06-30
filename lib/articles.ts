export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
}

export const ARTICLES: Article[] = [
  {
    slug:        "software-development-is-changing",
    title:       "Software Development Is Changing",
    excerpt:
      "The way software gets built is shifting underneath us. The tools we reach for, the problems worth solving, and the expectations around speed are all in motion.",
    readingTime: "4 min read",
    publishedAt: "May 2026",
  },
  {
    slug:        "why-understanding-systems-matters-more-than-tools",
    title:       "Why Understanding Systems Matters More Than Tools",
    excerpt:
      "Frameworks get deprecated. Syntax changes. The instinct to understand what's actually happening under the hood — that's what compounds.",
    readingTime: "4 min read",
    publishedAt: "Mar 2026",
  },
  {
    slug:        "writing-compounds",
    title:       "Writing Compounds",
    excerpt:
      "Writing is the most underrated engineering skill. It sharpens thinking, creates leverage, and compounds over a career in ways that code alone cannot.",
    readingTime: "3 min read",
    publishedAt: "Feb 2026",
  },
  {
    slug:        "human-ai-collaboration-and-the-future-of-work",
    title:       "Human-AI Collaboration and the Future of Work",
    excerpt:
      "We're at the beginning of a shift in how knowledge work happens. The organizations and individuals who understand this early are positioning for significant leverage.",
    readingTime: "6 min read",
    publishedAt: "Jan 2026",
  },
];
