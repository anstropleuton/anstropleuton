import Button from "../../components/Button";
import { ArrowRight } from "lucide-react";
import Tooltip from "../../components/Tooltip";
import Introduction from "./introduction.mdx";
import AdventureIntro from "./adventure-intro.mdx";
import Formatted from "../../components/Formatted";
import profilePicture from "../../assets/Anstro Pleuton NGC 602 Hubble Chandra.png";
import { useEffect, useMemo } from "react";
import useLayout from "../../components/useLayout";
import { links } from "../../data/links";
import usePageTitle from "../../components/setPageTitle";
import type { SectionLink } from "../../components/LayoutContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  const itsMeLink = useMemo<SectionLink>(
    () => ({
      link: "#its-me",
      content: <span>It's me</span>,
      tooltip: <span>Hello!</span>,
    }),
    [],
  );

  const adventureLink = useMemo<SectionLink>(
    () => ({
      link: "#adventure",
      content: <span>Adventure</span>,
      tooltip: <span>Learn about my Journey!</span>,
    }),
    [],
  );

  const { setLayout } = useLayout();
  useEffect(() => {
    setLayout({ sections: [itsMeLink, adventureLink], links: links });

    return () => {
      setLayout({});
    };
  }, [itsMeLink, adventureLink]);

  usePageTitle("Anstro Pleuton - It's me!");

  return (
    <div className="flex flex-col gap-32">
      <div className="flex items-center gap-32 not-md:flex-col not-md:gap-24">
        <div className="max-h-96 max-w-96 p-10">
          <img src={profilePicture} className="rounded-full" />
        </div>
        <article className="flex flex-col gap-2 not-md:text-center">
          <span className="text-2xl font-bold">I enjoy...</span>
          <span className="text-5xl font-bold">
            Building{" "}
            <span className="text-purple-600 dark:text-purple-400">
              systems, tools, frameworks
            </span>
            .
          </span>
          <span className="mt-4 text-2xl font-bold">
            All in{" "}
            <span className="text-purple-600 dark:text-purple-400">C++23</span>{" "}
            and beyond!
          </span>
        </article>
      </div>
      <Formatted className="flex flex-col gap-10 text-xl leading-loose">
        <hr />
        <section id="its-me" className="scroll-mt-40">
          <Introduction />
        </section>
        <hr />
        <section id="adventure" className="scroll-mt-40">
          <AdventureIntro />
        </section>
      </Formatted>
      <div className="flex">
        <Tooltip
          content={<span>Read the rest of the adventure here.</span>}
          position="right"
        >
          <Link to="#/blogs/early-adventure">
            <Button style="accent" className="group flex gap-2">
              <span className="text-lg font-bold">Continue Reading</span>
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
