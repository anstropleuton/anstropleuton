// src/Header.tsx
import { useState } from "react";
import useTheme from "../components/useTheme";
import { Menu, Moon, Sun, SunMoon } from "lucide-react";
import Tooltip from "../components/Tooltip";
import Button from "../components/Button";
import Modal from "../components/Modal";
import profilePicture from "../assets/Anstro Pleuton NGC 602 Hubble Chandra.png";
import useLayout from "../components/useLayout";
import {
  HorizontalScrollArea,
  VerticalScrollArea,
} from "../components/ScrollArea";
import { Link } from "react-router-dom";

export default function Header() {
  const context = useLayout();
  if (!context) throw new Error("Header must be used inside LayoutProvider");
  const sections = context.layout?.sections || [];
  const links = context.layout?.links || [];

  const [navMenuOpened, setNavMenuOpened] = useState<boolean>();

  const { theme, setTheme } = useTheme();

  const themeIcon =
    theme === "light" ? (
      <Sun className="h-6 w-6" />
    ) : theme === "dark" ? (
      <Moon className="h-6 w-6" />
    ) : (
      <SunMoon className="h-6 w-6" />
    );

  function toggleTheme() {
    const newTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(newTheme);
  }

  const themeToggle = (
    <Tooltip
      content={
        <span>
          Toggle between dark, light and system theme.
          <br />
          Current theme: {theme}
        </span>
      }
      position="bottom"
    >
      <button onClick={toggleTheme}>
        <Button className="flex items-center gap-2 select-none">
          {themeIcon}
        </Button>
      </button>
    </Tooltip>
  );

  const menuToggle = (
    <Tooltip content={<span>Toggle Navigation Menu.</span>} position="bottom">
      <button onClick={() => setNavMenuOpened(!navMenuOpened)}>
        <Button className="flex items-center gap-2 select-none">
          <Menu className="h-6 w-6" />
        </Button>
      </button>
    </Tooltip>
  );

  const sectionNodes = sections.map((section, i) => (
    <button key={i} onClick={() => setNavMenuOpened(false)}>
      <a href={section.link}>
        <Tooltip content={section.tooltip} position="bottom">
          <Button
            className="flex items-center gap-2 select-none"
            style="transparent"
          >
            {section.content}
          </Button>
        </Tooltip>
      </a>
    </button>
  ));

  const linkNodes = links.map((link, i) => (
    <button key={i} onClick={() => setNavMenuOpened(false)}>
      <Link to={link.link ?? ""}>
        <Tooltip content={link.tooltip} position="bottom">
          <Button className="flex items-center gap-2 select-none">
            {link.content}
          </Button>
        </Tooltip>
      </Link>
    </button>
  ));

  return (
    <header className="sticky top-0 border-b-2 border-b-neutral-200 bg-white/60 py-2 backdrop-blur-3xl transition-colors dark:border-b-neutral-800 dark:bg-black/60">
      <div className="mx-auto flex max-w-6xl justify-between gap-8 px-10 not-md:px-6">
        <div className="flex shrink-0 gap-2">
          <Link to="#/#">
            <Tooltip content={<span>Homepage.</span>} position="bottom">
              <Button className="flex items-center gap-2 select-none">
                <img src={profilePicture} className="h-6 w-6 rounded-full" />
                <span className="font-bold">Anstro Pleuton</span>
              </Button>
            </Tooltip>
          </Link>
        </div>
        <nav className="min-w-0 not-md:hidden">
          <HorizontalScrollArea>
            <div className="flex gap-2">{sectionNodes}</div>
          </HorizontalScrollArea>
        </nav>
        <nav className="flex shrink-0 gap-2 not-md:hidden">
          {linkNodes}
          {themeToggle}
        </nav>
        <div className="hidden gap-2 not-md:flex">{menuToggle}</div>
      </div>
      <Modal
        opened={navMenuOpened}
        onClose={() => setNavMenuOpened(false)}
        position="right"
        className="m-auto mt-17 mr-6"
      >
        <div className="rounded-2xl bg-neutral-200 p-4 dark:bg-neutral-800">
          <div className="flex max-h-[60vh] flex-col gap-4">
            {themeToggle}
            {sections.length != 0 && (
              <hr className="h-0.5 border-none bg-neutral-300 dark:bg-neutral-700" />
            )}
            {sections.length > 0 && (
              <nav className="flex min-h-0">
                <VerticalScrollArea>
                  <div className="flex flex-col gap-2">{sectionNodes}</div>
                </VerticalScrollArea>
              </nav>
            )}
            {links.length != 0 && (
              <hr className="h-0.5 border-none bg-neutral-300 dark:bg-neutral-700" />
            )}
            {links && links.length > 0 && (
              <nav className="flex flex-col gap-2">{linkNodes}</nav>
            )}
          </div>
        </div>
      </Modal>
    </header>
  );
}
