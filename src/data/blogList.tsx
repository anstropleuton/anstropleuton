import type { ComponentType } from "react";

const blogModules = import.meta.glob("../blogs/*.mdx", {
  eager: true,
}) as Record<string, any>;

interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  date: Date;
  readTime: number;
  content: ComponentType<any>;
  raw: string;
}

export const blogList = Object.entries(blogModules).map(([path, mod]) => {
  const filename = path.split("/").pop()!;

  const slug = filename.replace(/\.mdx$/, "");

  const title = mod.title ?? "Untitled";
  const excerpt = mod.excerpt ?? "Untitled";
  const date = mod.date ? new Date(mod.date) : new Date(0);
  const readTime = mod.readTime ?? 0;

  const content = mod.default;

  return {
    slug,
    title,
    excerpt,
    date,
    readTime,
    content,
  } as Blog;
});
