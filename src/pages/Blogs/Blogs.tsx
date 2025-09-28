import {
  ArrowRight,
  Copy,
  Filter,
  Search,
  Settings2,
  Share2,
} from "lucide-react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Formatted from "../../components/Formatted";
import { blogList } from "../../data/blogList";
import { useEffect, useRef } from "react";
import Tooltip from "../../components/Tooltip";
import Popover from "../../components/Popover";
import { Link, Navigate, useParams } from "react-router-dom";
import CodeBlock, { Code } from "../../components/CodeBlock";
import useLayout from "../../components/useLayout";
import { links } from "../../data/links";
import usePageTitle from "../../components/setPageTitle";
import type { SectionLink } from "../../components/LayoutContext";

export default function Blogs() {
  const { setLayout } = useLayout();
  useEffect(() => {
    setLayout({ links: links });

    return () => {
      setLayout({});
    };
  }, []);

  usePageTitle("My blogs");

  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-10">
      <Formatted>
        <h1>A small collection of my writings.</h1>
      </Formatted>
      <div
        onClick={() => searchRef.current?.focus()}
        className="flex items-center gap-4 rounded-full border-2 border-neutral-200 bg-neutral-100 px-6 py-4 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div>
          <Search className="h-6 w-6" />
        </div>
        <span className="w-full text-lg">
          <input
            ref={searchRef}
            placeholder="Search"
            className="w-full outline-0"
          ></input>
        </span>
        <Popover content={<>asd</>} position="bottom">
          <Tooltip
            content={
              <span>Filter results based on constraints (date, read time)</span>
            }
          >
            <Filter className="h-6 w-6" />
          </Tooltip>
        </Popover>
        <Tooltip
          content={
            <span>
              Search content in different fields (title, excerpt, article)
            </span>
          }
        >
          <button
            onClick={(e) => {
              // ...
              e.stopPropagation();
            }}
          >
            <Settings2 className="h-6 w-6 rotate-90" />
          </button>
        </Tooltip>
      </div>
      {blogList.map((blog, i) => (
        <article key={i}>
          <BlogCard
            key={blog.slug}
            title={blog.title}
            excerpt={blog.excerpt}
            date={blog.date}
            readTime={blog.readTime}
            url={`/blogs/${blog.slug}`}
          />
        </article>
      ))}
    </div>
  );
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: Date;
  readTime: number;
  url: string;
}

function BlogCard({ title, excerpt, date, readTime, url }: BlogCardProps) {
  return (
    <Card className="flex flex-col items-start gap-8 p-8">
      <Formatted className="text-sm leading-tight">
        <h2 className="my-0">{title}</h2>
        <p className="my-0 whitespace-pre text-neutral-600 dark:text-neutral-400">
          {`${date?.toDateString()}   •   ${readTime} mins read`}
        </p>
        <p className="line-clamp-3 text-neutral-700 dark:text-neutral-300">
          {excerpt}
        </p>
      </Formatted>
      <div className="flex gap-4">
        <Link to={url}>
          <Button style="accent" className="group flex gap-2">
            <span className="font-bold">Read More</span>
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Tooltip content={<span>Share blog.</span>} position="bottom">
          <Button
            style="transparent"
            className="flex items-center justify-center"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </Tooltip>
        <Tooltip content={<span>Copy blog URL.</span>} position="bottom">
          <Button
            style="transparent"
            className="flex items-center justify-center"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </Tooltip>
      </div>
    </Card>
  );
}

export function Blog() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/blogs" replace />;
  const blog = blogList.find((b) => b.slug === slug)!;
  if (!blog) return <Navigate to="/blogs" replace />;

  const { setLayout } = useLayout();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateSections);
    };

    const updateSections = () => {
      const nodeList = Array.from(
        container.querySelectorAll("h1,h2,h3,h4,h5,h6"),
      ) as HTMLElement[];
      const sections: SectionLink[] = nodeList.map((el) => {
        const text = (el.textContent || "").trim();
        const id =
          el.id ||
          text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]/g, "");
        if (!el.id) el.id = id;
        el.classList.add("scroll-mt-40");
        return {
          link: `#${id}`,
          content: text,
          tooltip: `Go to ${text} blog section`,
        };
      });
      setLayout({ sections, links });
    };

    updateSections();

    const observer = new MutationObserver(() => {
      scheduleUpdate();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      setLayout({});
    };
  }, [slug]);

  usePageTitle(`${blog.title} - Anstro Pleuton`);

  const Content = blog.content;

  return (
    <div className="flex flex-col gap-10">
      <Formatted className="text-lg leading-loose">
        <h1>{blog.title}</h1>
        <p className="my-0 whitespace-pre text-neutral-600 dark:text-neutral-400">
          {`${blog.date?.toDateString()}   •   ${blog.readTime} mins read`}
        </p>
        <hr />
        <div ref={containerRef}>
          <Content
            key={slug}
            components={{
              pre: CodeBlock,
              code: Code,
            }}
          />
        </div>
      </Formatted>
    </div>
  );
}
