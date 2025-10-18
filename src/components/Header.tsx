import { Button, Link } from "./Rounded";
import profilePicture from "../assets/Anstro Pleuton NGC 602 Hubble Chandra.png";
import { useLayout } from "./LayoutProvider";
import { useTheme } from "./ThemeProvider";
import { Menu, Moon, Sun, SunMoon } from "lucide-react";

export default function Header() {
  const { links } = useLayout();

  const theme = useTheme();
  const themeIcon =
    theme.theme === "dark" ? (
      <Moon className="h-6 w-6" />
    ) : theme.theme === "light" ? (
      <Sun className="h-6 w-6" />
    ) : (
      <SunMoon className="h-6 w-6" />
    );
  const nextTheme =
    theme.theme === "dark"
      ? "light"
      : theme.theme === "light"
        ? "system"
        : "dark";

  return (
    <header className="sticky top-0 z-[100] flex w-full items-center justify-center border-b-2 border-b-neutral-200 p-2 px-8 backdrop-blur-3xl dark:border-b-neutral-800">
      <div className="flex w-full max-w-7xl justify-between gap-2">
        <div className="flex gap-2">
          <Link url="/" className="flex items-center gap-2 px-4">
            <img src={profilePicture} className="h-6 w-6 rounded-full" />
            <span className="text-sm font-bold">Anstro Pleuton</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => theme.setTheme(nextTheme)} className="px-4">
            <span className="text-sm font-bold">{themeIcon}</span>
          </Button>
          <nav className="flex gap-2 not-md:hidden">
            {links.map((item, i) => (
              <Link key={i} url={item.url} className="px-4">
                <span className="text-sm font-bold">{item.title}</span>
              </Link>
            ))}
          </nav>
          <Button onClick={() => {}} className="px-4">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
