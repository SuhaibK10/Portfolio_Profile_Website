import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    // Activates the Rust-based MDX compiler for Turbopack (dev).
    // For webpack (production), withMDX() below handles the loader instead.
    mdxRs: true,
  },
};

// withMDX() injects webpack loader rules that Turbopack cannot serialize,
// causing "loader undefined for match" errors in dev. NEXT_MDX_RS=1 is set
// by the dev script so we know to skip withMDX() and rely on mdxRs alone.
const withMDX = createMDX({});
const isTurbopack = Boolean(process.env.NEXT_MDX_RS);

export default isTurbopack ? nextConfig : withMDX(nextConfig);
