import profilePicture from "../assets/Anstro Pleuton NGC 602 Hubble Chandra.png";
import Tooltip from "../components/Tooltip";
import useLayout from "../components/useLayout";

export default function Footer() {
  const context = useLayout();
  if (!context) throw new Error("Footer must be used inside LayoutProvider");
  const sections = context.layout?.sections || [];
  const links = context.layout?.links || [];

  const githubLink = (
    <Tooltip
      content={<span>Link to my GitHub profile.</span>}
      position="bottom"
    >
      <a
        href="https://github.com/anstropleuton"
        className="flex items-center gap-2"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/24/Github_logo_svg.svg"
          className="h-6 w-6 invert-100 dark:invert-0"
        />
        <span>GitHub</span>
      </a>
    </Tooltip>
  );

  const youtubeLink = (
    <Tooltip
      content={<span>Link to my YouTube channel.</span>}
      position="bottom"
    >
      <a
        href="https://youtube.com/@anstropleuton"
        className="flex items-center gap-2"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
          className="h-6 w-6"
        />
        <span>YouTube</span>
      </a>
    </Tooltip>
  );

  const sectionNodes = sections.map((section, i) => (
    <Tooltip key={i} content={section.tooltip} position="bottom">
      <a href={section.link}>{section.content}</a>
    </Tooltip>
  ));

  const linkNodes = links.map((link, i) => (
    <Tooltip key={i} content={link.tooltip} position="bottom">
      <a href={link.link}>{link.content}</a>
    </Tooltip>
  ));

  return (
    <footer className="mt-16 flex flex-col gap-10 border-t-2 border-t-neutral-300 bg-neutral-200 py-8 dark:border-t-neutral-700 dark:bg-neutral-800 transition-colors">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-between px-10 not-md:px-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={profilePicture} className="h-6 w-6 rounded-full"></img>
            <span className="font-bold">Anstro Pleuton</span>
          </div>
          <span className="text-sm">Imagine an ecosystem builder.</span>
        </div>
        {sections && sections.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-bold">Sections</span>
            {sectionNodes}
          </div>
        )}
        {links.length != 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-bold">Links</span>
            {linkNodes}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <span className="font-bold">Socials</span>
          {githubLink}
          {youtubeLink}
        </div>
      </div>
      <hr className="h-0.5 border-none bg-neutral-300 dark:bg-neutral-700" />
      <div className="mx-auto flex w-full max-w-6xl justify-center px-10 not-md:px-6">
        <span>Copyright &copy; 2025 Anstro Pleuton. All rights reserved.</span>
      </div>
    </footer>
  );
}
