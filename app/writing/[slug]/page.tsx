import { readFileSync } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ARTICLES } from "@/lib/articles";
import { useMDXComponents } from "@/mdx-components";

// useMDXComponents is a Next.js MDX convention, not a React hook.
// eslint-disable-next-line react-hooks/rules-of-hooks
const mdxComponents = useMDXComponents({});

/* ─── Static params ─────────────────────────────────────────────────── */

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

/* ─── Metadata ──────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: article.title };
}

/* ─── Page ──────────────────────────────────────────────────────────── */

type Props = { params: Promise<{ slug: string }> };

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  /* Read MDX file from the filesystem — no webpack loader needed */
  const filePath = path.join(
    process.cwd(),
    "content/writing",
    `${slug}.mdx`
  );

  let source: string;
  try {
    source = readFileSync(filePath, "utf-8");
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background px-6 py-24 md:py-32">

      {/* Back link */}
      <div className="mx-auto max-w-[700px]">
        <Link
          href="/#writing"
          className="group inline-flex items-center gap-2 font-body text-sm
                     text-muted/60 transition-colors duration-200 hover:text-foreground-secondary"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Writing
        </Link>
      </div>

      {/* Article header */}
      <header className="mx-auto mt-14 max-w-[700px]">
        <p className="font-body text-sm text-muted/50">
          {article.readingTime}&ensp;·&ensp;{article.publishedAt}
        </p>
        <h1
          className="mt-4 font-heading text-3xl font-semibold leading-tight
                     tracking-tight text-foreground md:text-[2.25rem]"
        >
          {article.title}
        </h1>
        <div className="mt-10 h-px w-full bg-border/40" />
      </header>

      {/* MDX content */}
      <article className="mx-auto mt-12 max-w-[700px]">
        <MDXRemote
          source={source}
          components={mdxComponents}
          options={{ parseFrontmatter: true }}
        />
      </article>

    </div>
  );
}
