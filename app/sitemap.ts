import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";

const BASE_URL = "https://www.suhaibkhan.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url:           `${BASE_URL}/writing/${article.slug}`,
    changeFrequency: "yearly",
    priority:      0.6,
  }));

  return [
    {
      url:           BASE_URL,
      changeFrequency: "monthly",
      priority:      1,
    },
    ...articles,
  ];
}
