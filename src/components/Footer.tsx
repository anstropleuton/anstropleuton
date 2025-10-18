import profilePicture from "../assets/Anstro Pleuton NGC 602 Hubble Chandra.png";
import { useLayout } from "./LayoutProvider";

export default function Footer() {
  const { links } = useLayout();

  return (
    <footer className="flex flex-col items-center border-t-2 border-t-neutral-200 bg-neutral-100 dark:border-t-neutral-800 dark:bg-neutral-900">
      <div className="w-full max-w-7xl p-8">
        <div className="flex flex-wrap justify-between gap-10">
          <div>
            <a href="/" className="flex items-center gap-4">
              <img src={profilePicture} className="h-10 w-10 rounded-full" />
              <div className="flex flex-col">
                <span className="font-bold">Anstro Pleuton</span>
                <span>Imagine an Ecosystem Builder...</span>
              </div>
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Links</span>
            {links.map((item, i) => (
              <a key={i} href={item.url}>
                <span className="text-sm font-bold">{item.title}</span>
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold">Socials</span>
            <a
              href="https://github.com/anstropleuton"
              className="flex items-center gap-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/24/Github_logo_svg.svg"
                className="h-6 w-6 invert-100 dark:invert-0"
              />
              <span className="text-sm font-bold">GitHub</span>
            </a>
            <a
              href="https://github.com/anstropleuton"
              className="flex items-center gap-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                className="h-6 w-6"
              />
              <span className="text-sm font-bold">YouTube</span>
            </a>
          </div>
        </div>
      </div>
      <hr className="h-0.5 w-full border-none bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex w-full max-w-7xl justify-center p-8">
        <span className="text-center text-sm">
          &copy; 2025 | Made with passion by Anstro Pleuton.
        </span>
      </div>
    </footer>
  );
}
