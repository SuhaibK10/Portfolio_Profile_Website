import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

/* ─── Prose typography for MDX reading experience ───────────────────
   Max reading width and line-height are enforced by the article page
   layout. These components style the individual elements.
──────────────────────────────────────────────────────────────────── */

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => (
      <h1
        className="font-heading text-3xl font-semibold leading-tight tracking-tight
                   text-foreground md:text-4xl"
        {...props}
      >
        {children}
      </h1>
    ),

    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2
        className="mt-12 mb-4 font-heading text-xl font-semibold leading-snug
                   text-foreground md:text-2xl"
        {...props}
      >
        {children}
      </h2>
    ),

    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
      <h3
        className="mt-8 mb-3 font-heading text-lg font-semibold leading-snug text-foreground"
        {...props}
      >
        {children}
      </h3>
    ),

    p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
      <p
        className="mt-6 font-body text-[1.0625rem] leading-[1.9] text-foreground-secondary
                   first:mt-0"
        {...props}
      >
        {children}
      </p>
    ),

    ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
      <ul
        className="mt-6 space-y-2 font-body text-[1.0625rem] leading-[1.9]
                   text-foreground-secondary"
        {...props}
      >
        {children}
      </ul>
    ),

    ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
      <ol
        className="mt-6 list-decimal space-y-2 pl-5 font-body text-[1.0625rem]
                   leading-[1.9] text-foreground-secondary"
        {...props}
      >
        {children}
      </ol>
    ),

    li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
      <li className="pl-1" {...props}>
        {children}
      </li>
    ),

    blockquote: ({ children, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className="my-8 border-l-2 border-gold/50 pl-6 font-body text-[1.0625rem]
                   leading-[1.9] text-foreground-secondary/80"
        {...props}
      >
        {children}
      </blockquote>
    ),

    hr: (props: ComponentPropsWithoutRef<"hr">) => (
      <hr className="my-12 border-border/40" {...props} />
    ),

    strong: ({ children, ...props }: ComponentPropsWithoutRef<"strong">) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),

    em: ({ children, ...props }: ComponentPropsWithoutRef<"em">) => (
      <em className="not-italic" {...props}>
        {children}
      </em>
    ),

    code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
      <code
        className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-sm
                   text-foreground/90"
        {...props}
      >
        {children}
      </code>
    ),

    pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
      <pre
        className="my-8 overflow-x-auto rounded-xl border border-border bg-card
                   p-6 font-mono text-sm leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    ),

    a: ({ children, href, ...props }: ComponentPropsWithoutRef<"a">) => (
      <a
        href={href}
        className="text-foreground underline decoration-border underline-offset-3
                   transition-colors duration-200 hover:decoration-gold/60"
        {...props}
      >
        {children}
      </a>
    ),
  };
}
