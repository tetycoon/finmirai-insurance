"use client";

import { useState } from "react";
import type { Article } from "@/content/articles";
import { ArticleCard } from "@/components/ui/ArticleCard";

export function ArticleBrowser({ articles }: { articles: Article[] }) {
  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      <div role="group" aria-label="Filter guides by category" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === c ? "bg-navy-900 text-white" : "bg-white text-navy-700 ring-1 ring-navy-200 hover:ring-navy-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} guides
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </>
  );
}
