import profilePicture from "../assets/Anstro Pleuton NGC 602 Hubble Chandra.png";
import Prose from "../components/Prose";
import rlmsGameplay from "../assets/RLMS Gameplay.gif";
import crystalguiDemo from "../assets/CrystalGUI Demo.gif";
import engenideLogo from "../assets/Engenide Logo.svg";
import { Link } from "../components/Rounded";
import { ArrowRight, ArrowUpRight, CodeXml, Download } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-32 py-32">
      <section
        id="homepage-hero"
        className="relative flex items-center justify-center gap-16 not-lg:flex-col"
      >
        <img src={profilePicture} className="h-80 w-80 rounded-full" />
        <Prose className="w-1/3 not-lg:w-full not-lg:text-center">
          <article className="flex flex-col">
            <img
              src={profilePicture}
              className="pointer-events-none absolute -top-50 right-0 h-[300px] w-[300px] rounded-full opacity-50 blur-3xl select-none"
            />
            <img
              src={profilePicture}
              className="pointer-events-none absolute -bottom-50 left-0 h-[200px] w-[200px] rounded-full opacity-50 blur-3xl select-none"
            />
            <h2>I enjoy...</h2>
            <h1>
              Building{" "}
              <span className="text-purple-600 dark:text-purple-400">
                Systems, Tools, Frameworks
              </span>
              .
            </h1>
          </article>
        </Prose>
      </section>
      <hr className="h-0.5 w-full border-none bg-neutral-200 dark:bg-neutral-800" />
      <section id="introduction">
        <Prose>
          <div className="relative">
            <span className="pointer-events-none absolute top-0 left-0 text-[300px] opacity-25 blur-3xl select-none">
              👋
            </span>
            <h1>👋 Hello</h1>
            <p>
              I am a hobbyist C++23 programmer passionate about building
              systems, tools and frameworks as open-source library projects.
              Over the past 3+ years, I have been exploring the programming
              world with curiosity and creativity.
            </p>
            <p>
              Along the way, I have explored System Designing, Game
              Developmenet, Android Apps Development and Web Development. I have
              used various other programming languages, including C, Python,
              Rust, Kotlin, C# and React.
            </p>
            <p>
              I have built many programs to explore and experiment with
              different ideas, and most of my projects reflect that. I learnt
              from almost all my projects by doing it. They have served as a
              creative medium for me to tinker around systems and explore what's
              possible.
            </p>
            <p>
              Currently focused on Full Stack Development and AI. I prefer
              learning through building, by transforming ideas into functioning
              projects. These projects allows me to learn Frontend (React),
              Backend (Express/Node/MongoDB) and AI integration
              (Python/PyTorch/TensorFlow).
            </p>
          </div>
          <div className="mt-10 flex items-start gap-4 not-sm:flex-col">
            <Link
              url=""
              className="group flex items-center gap-2 px-6"
              style="accent"
            >
              <span className="font-bold">See My Work</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link url="" className="group flex items-center gap-2 px-6">
              <span className="font-bold">Download Résumé</span>
              <Download />
            </Link>
          </div>
        </Prose>
      </section>
      <hr className="h-0.5 w-full border-none bg-neutral-200 dark:bg-neutral-800" />
      <section id="projects">
        <Prose className="flex flex-col gap-4">
          <h1>⚙️ Featured Projects</h1>
          <div className="flex flex-col gap-64 py-32">
            <article className="flex flex-row items-center justify-center gap-16 not-xl:flex-col selection:bg-red-400! dark:selection:bg-red-600!">
              <div>
                <h1>🚩 RLMS - Logically Solvable Minesweeper</h1>
                <p>
                  A fully ceatured Minesweeper remake with logically solvable
                  board generation, dark mode and modern features with polished
                  interface.
                </p>
                <p>
                  This project demonstrates my algorithmic thinking, efficient
                  game logic and attention to UX details under constraints.
                </p>
                <div className="mt-10 flex items-start gap-4 not-sm:flex-col">
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">Online Demo</span>
                    <ArrowUpRight />
                  </Link>
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">View Source</span>
                    <CodeXml />
                  </Link>
                </div>
              </div>
              <div className="relative min-w-[600px] not-sm:min-w-[400px]">
                <span className="pointer-events-none absolute top-0 right-0 text-[300px] opacity-50 blur-[100px] select-none not-sm:text-[150px]">
                  🟥
                </span>
                <img src={rlmsGameplay} className="relative" />
              </div>
            </article>
            <article className="flex flex-row-reverse items-center justify-center gap-16 not-xl:flex-col selection:bg-green-400! dark:selection:bg-green-600!">
              <div>
                <h1>🧩 Fluxins - Expression Parser</h1>
                <p>
                  Fluxins is a self-contained C++23 mathematical expression
                  parser library built using Pratt parser technique. It
                  interprets arithmetic and functional expressions dynamically,
                  caches its results for reuse, all with zero dependencies.
                </p>
                <p>
                  This project highlights my deeper understanding of API design
                  and software architecture in library development.
                </p>
                <div className="mt-10 flex items-start gap-4 not-sm:flex-col">
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">Online Demo</span>
                    <ArrowUpRight />
                  </Link>
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">View Source</span>
                    <CodeXml />
                  </Link>
                </div>
              </div>
              <div className="relative min-w-[600px] not-sm:min-w-[400px]">
                <span className="pointer-events-none absolute bottom-0 left-0 text-[300px] opacity-50 blur-[100px] select-none not-sm:text-[150px]">
                  🟩
                </span>
                <div className="relative rounded-4xl bg-white">
                  <CodeBlock language="cpp">{`\
#include <print>
#include <memory>
#include <string>

#include "fluxins/fluxins.hpp"

int main(){
    auto cfg = std::make_shared<fluxins::config>();

    fluxins::expression expr("a + 2", cfg);
    expr.set_variable("a", 3);

    expr.parse();
    expr.evaluate();

    float result = expr;
    std::println("Result of {}: {}",
        (std::string)expr, result); // 5
}\
`}</CodeBlock>
                </div>
              </div>
            </article>
            <article className="flex flex-row items-center justify-center gap-16 not-xl:flex-col selection:bg-yellow-400! dark:selection:bg-yellow-600!">
              <div>
                <h1>🎨 Rounded Rectangle - raylib Example Contribution</h1>
                <p>
                  A clean, demonstrative and beginner-friendly example program
                  created for raylib to demonstrate creation of a rounded
                  rectangle using mathematical formula and shader programming in
                  C.
                </p>
                <p>
                  This project signifies my contribution to the open source
                  libraries as oppose to focusing solely on personal project. It
                  is now merged into the raylib project's official examples set.
                </p>
                <div className="mt-10 flex items-start gap-4 not-sm:flex-col">
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">Online Demo</span>
                    <ArrowUpRight />
                  </Link>
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">View Source</span>
                    <CodeXml />
                  </Link>
                </div>
              </div>
              <div className="relative min-w-[600px] not-sm:min-w-[400px]">
                <span className="pointer-events-none absolute right-0 bottom-0 text-[300px] opacity-50 blur-[100px] select-none not-sm:text-[150px]">
                  🟧
                </span>
                <img
                  src="https://github.com/raysan5/raylib/blob/master/examples/shaders/shaders_rounded_rectangle.png?raw=true"
                  className="relative w-[600px] rounded-2xl not-sm:w-[400px]"
                  style={{
                    filter: "hue-rotate(-160deg) brightness(1.2)",
                  }}
                />
              </div>
            </article>
            <article className="flex flex-row-reverse items-center justify-center gap-16 not-xl:flex-col selection:bg-violet-400! dark:selection:bg-violet-600!">
              <div>
                <h1>🔮 Hypnotizing Double Pendulum - Visualization</h1>
                <p>
                  A mathematically beautiful, physics-based R&D visualization
                  project to create cool visuals using thousands of simple
                  physics-based Double Pendulums simulation and tracing their
                  colors.
                </p>
                <p>
                  This project focuses on my ability to utilize my research into
                  creating a ready project.
                </p>
                <div className="mt-10 flex items-start gap-4 not-sm:flex-col">
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">Online Demo</span>
                    <ArrowUpRight />
                  </Link>
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">View Source</span>
                    <CodeXml />
                  </Link>
                </div>
              </div>
              <div className="relative min-w-[600px] not-sm:min-w-[400px]">
                <span className="pointer-events-none absolute top-0 left-0 text-[300px] opacity-50 blur-[100px] select-none not-sm:text-[150px]">
                  🟪
                </span>
                <iframe
                  className="relative w-[600px] rounded-2xl not-sm:w-[400px]"
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/hqWp7yCpDnU?si=BfYZk2JfNkYP0b-8"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </article>
            <article className="flex flex-row items-center justify-center gap-16 not-xl:flex-col selection:bg-blue-400! dark:selection:bg-blue-600!">
              <div>
                <h1>💎 Crystal GUI - Modern GUI Framework</h1>
                <p>
                  Crystal GUI is my Magnum Opus library project, a massive GUI
                  framework designed to bring simplicity and control without
                  quirks. It had great architecture, a functional layout system,
                  a customizable theming, and animation.
                </p>
                <p>
                  This project had went through several rewrites from 2021 to
                  now, and is still work-in-progress.
                </p>
                <div className="mt-10 flex items-start gap-4 not-sm:flex-col">
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">Online Demo</span>
                    <ArrowUpRight />
                  </Link>
                  <Link url="" className="group flex items-center gap-2 px-6">
                    <span className="font-bold">View Source</span>
                    <CodeXml />
                  </Link>
                </div>
              </div>
              <div className="relative min-w-[600px] not-sm:min-w-[400px]">
                <span className="pointer-events-none absolute right-0 bottom-0 text-[300px] opacity-50 blur-[100px] select-none not-sm:text-[150px]">
                  🟦
                </span>
                <img
                  src={crystalguiDemo}
                  className="relative w-[600px] rounded-2xl not-sm:w-[400px]"
                />
              </div>
            </article>
          </div>
        </Prose>
      </section>
      <hr className="h-0.5 w-full border-none bg-neutral-200 dark:bg-neutral-800" />
      <section id="philosophy">
        <Prose>
          <div className="relative">
            <h1>✨ Philosophy</h1>
          </div>
        </Prose>
      </section>
      <hr className="h-0.5 w-full border-none bg-neutral-200 dark:bg-neutral-800" />
      <section id="journey">
        <Prose>
          <div className="relative">
            <span className="pointer-events-none absolute top-0 right-0 text-[300px] opacity-25 blur-3xl select-none">
              🧭
            </span>
            <span className="pointer-events-none absolute top-1/2 left-0 text-[300px] opacity-25 blur-3xl select-none">
              🧭
            </span>
            <h1>🧭 Journey</h1>
            <h3>Early History</h3>
            <p>
              My journey as a programmer started in year 2021, when I was 15
              years old. I traveled to a village but got stuck due to COVID-19
              lockdown restrictions. I did not even have a computer to begin
              with. I got interest in programming due to bordem and curiosity.
            </p>
            <p>
              I used my Mom's phone to create my first game using an app that
              did not require programming knowledge. But that phone died of
              overheading. So I used my old 2014 Android tablet and started
              learning C# in it, using C# Shell for writing code.
            </p>
            <p>
              C# Shell was too slow in that device. That was pivotal moment, as
              I turned to using C++ instead. I used CPP-N-IDE to write C++ code,
              and I was surprised by how fast it was. I soon made progress in
              C++ and wrote many small programs in it.
            </p>
            <p>
              I later got to use my Dad's 2008 Windows Laptop, which was much
              faster compared to my tablet. I got started using raylib to write
              some graphical programs, and I like using raylib ever since.
            </p>
            <h3>Experiments Arc</h3>
            <p>
              From there, my programming journey spiraled into many experiments.
              I really was ambitious (and I continue to be, to this day), so
              many of the projects died due to large scope. Every single project
              served as a learning experience. Few finished, few abandoned, few
              lost to time.
            </p>
            <p>
              I touched many fields during my journey: App Development
              (CLI/GUI), Game Development (using raylib), Library Development,
              Framework Development, Networking, Web Development (lightly),
              Android Apps Development, Windows/Linux Apps Development (WinUI
              3/GTK), and a few others.
              <br />
              Emphasis on <em>touch</em>, I did not explore many of them in
              depth, and I visited them to see how they are all like. I stuck
              with App/Game/Library/Framework development as those are the ones
              I started with.
            </p>
            <p>
              Many smaller arcs has formed during my early journey, from
              switching to C instead of C++, to 4 revisions of one project,
              these were like unstructured programming quests.
            </p>
            <h3>Early Impact</h3>
            <p>
              As a proud user of raylib, I got to leave a mark in the community
              through contributions. This was big for me back then, even for
              small code changes. They taught me how real-world collaboration
              works, and later I helped maintain parts of raylib using Python.
              Nothing too big, though.
            </p>
            <p>
              I also stumbled across a bug in GCC. An Internal Compiler Error. I
              followed an instruction to file a bug report to Arch Linux, as
              well as upstream GCC. This allowed me to contribute on a large
              scale project. I followed through the bug report and finally it
              was fixed in GCC 14.
            </p>
            <h3>Modernization</h3>
            <p>
              During my early modern era, I did not finish a lot of projects.
              Many were ambitious projects. They had large codebase as well. I
              tweaked a lot of my programming style to make my codebase as
              maintainable as possible. I gone through iterations after
              iteration. I learnt how to make modern and maintainable codebase.
              Later I created a few smaller but completed projects.
            </p>
            <p>
              Now as it stands, I am a proud author of over 20 projects, both
              finished and unfinished, and I still like experimenting by
              researching and developing, and I am now exploring various fields
              that are alien to me, including Android App development and Web
              development.
            </p>
            <p>
              I have currently taken interest in MERN, Vite, T3, Python AI/ML/DL
              using PyTorch/TensorFlow, etc. I am also interested in learning
              Rust to increase my productivity and get a fresh new way of
              thinking about performance and memory.
            </p>
          </div>
        </Prose>
      </section>
      <hr className="h-0.5 w-full border-none bg-neutral-200 dark:bg-neutral-800" />
      <section id="other-works">
        <Prose className="flex flex-col gap-4">
          <h1>🚀 My Vision</h1>
          <div className="flex flex-col gap-64 py-32">
            <article className="flex flex-row items-center justify-center gap-16 not-xl:flex-col selection:bg-blue-400! dark:selection:bg-blue-600!">
              <div>
                <h1>
                  <img
                    className="mt-0 mb-0 inline-flex h-16 w-16"
                    src={engenideLogo}
                  />{" "}
                  Engenide - Freedom-first Programming Language
                </h1>
                <p>
                  Engenide is my dream programming language designed around the
                  idea of liberating developers from arbitrary constraints. It's
                  design is feature-overloaded to allow highly expressive
                  domain-specific code.
                </p>
                <p>
                  I have crafted a sketch document to specify Engenide's
                  features in a brief way. I do plan to write a
                  compiler/interpreter for Engenide in the future.
                </p>
              </div>
              <div className="relative min-w-[600px] not-sm:min-w-[400px]">
                <span className="pointer-events-none absolute right-0 bottom-0 text-[300px] opacity-50 blur-[100px] select-none not-sm:text-[150px]">
                  🟪
                </span>
                <img
                  src={engenideLogo}
                  className="relative w-[600px] rounded-2xl not-sm:w-[400px]"
                />
              </div>
            </article>
          </div>
        </Prose>
      </section>
    </div>
  );
}
