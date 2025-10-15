import profilePicture from "../assets/Anstro Pleuton NGC 602 Hubble Chandra.png";
import { useLayout } from "./LayoutProvider";

export default function Footer() {
  const { links } = useLayout();

  return (
    <footer className="flex flex-col items-center border-t-2 border-t-neutral-200 bg-neutral-100 dark:border-t-neutral-800 dark:bg-neutral-900">
      <div className="w-full max-w-7xl p-8">
        <div className="flex justify-between gap-2">
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
