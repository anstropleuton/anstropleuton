import profilePicture from "../assets/Anstro Pleuton NGC 602 Hubble Chandra.png";
import Prose from "../components/Prose";
import PlaceholderDark from "../assets/PlaceholderDark.svg";
import PlaceholderLight from "../assets/PlaceholderLight.svg";
import { useTheme } from "../components/ThemeProvider";
import { Link } from "../components/Rounded";
import { ArrowRight, ArrowUpRight, CodeXml, Download } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-32 py-32">

      <section
        id="homepage-hero"
        className="flex items-center justify-center gap-16"
      >
        <img src={profilePicture} className="h-80 w-80 rounded-full" />

        <Prose className="w-1/3">
          <article className="flex flex-col">

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

          <h1>👋 Hello</h1>
          <p>
            I am a hobbyist C++23 programmer passionate about building systems,
            tools and frameworks as open-source library projects. Over the past
            3+ years, I have been exploring the programming world with curiosity
            and creativity.
          </p>
          <p>
            Along the way, I have explored System Designing, Game Developmenet,
            Android Apps Development and Web Development. I have used various
            other programming languages, including C, Python, Rust, Kotlin, C#
            and React.
          </p>
          <p>
            I have built many programs to explore and experiment with different
            ideas, and most of my projects reflect that. I learnt from almost
            all my projects by doing it. They have served as a creative medium
            for me to tinker around systems and explore what's possible.
          </p>
          <p>
            Currently focused on Full Stack Development and AI. I prefer
            learning through building, by transforming ideas into functioning
            projects. These projects allows me to learn Frontend (React),
            Backend (Express/Node/MongoDB) and AI integration
            (Python/PyTorch/TensorFlow).
          </p>

          <div className="mt-10 flex gap-4">
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

            <article className="relative flex items-center justify-center gap-16">
              <div>
                <h1>✅ Task Manager</h1>
                <p>
                  Task Manager lets you create and manage, mark them as complete
                  when you are done.
                </p>
                <p>
                  Powered by AI, Task Manager lets you organize long term tasks
                  using tags, manage priorities, predict deadline and smart
                  reminder to never miss a task again.
                </p>

                <div className="mt-10 flex gap-4">
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

              <div className="relative min-w-[600px]">
                <span className="pointer-events-none absolute top-0 right-0 text-[300px] blur-[200px] select-none">
                  ✅
                </span>
                <img
                  src={
                    useTheme().resolvedTheme === "dark"
                      ? PlaceholderDark
                      : PlaceholderLight
                  }
                  className="relative w-[600px]"
                />
              </div>
            </article>

            <article className="relative flex items-center justify-center gap-16">
              <div className="relative min-w-[600px]">
                <span className="pointer-events-none absolute bottom-0 left-0 text-[300px] blur-[200px] select-none">
                  🗒️
                </span>

                <img
                  src={
                    useTheme().resolvedTheme === "dark"
                      ? PlaceholderDark
                      : PlaceholderLight
                  }
                  className="relative w-[600px]"
                />
              </div>

              <div>
                <h1>🗒️ Notes Manager</h1>
                <p>
                  Notes Manager helps you instantly take notes in various
                  formats and organize them.
                </p>
                <p>
                  Powered by AI, Notes Manager helps you reformat and organize
                  notes using tags, provide summaries and efficient search.
                </p>
                <p>
                  Supports Markdown, RST and many other note format. Import and
                  export yout notes to keep them safe.
                </p>

                <div className="mt-10 flex gap-4">
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
            </article>

            <article className="relative flex items-center justify-center gap-16">
              <div>

                <h1>🔐 Password Manager</h1>
                <p>
                  Password Manager allows you to manage passwords securely, and
                  completely offline.
                </p>
                <p>
                  Check for password strength using AI, generate new, completely
                  unique and random passwords for maximum security.
                </p>

                <div className="mt-10 flex gap-4">
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

              <div className="relative min-w-[600px]">
                <span className="pointer-events-none absolute right-0 bottom-0 text-[300px] blur-[200px] select-none">
                  🔐
                </span>

                <img
                  src={
                    useTheme().resolvedTheme === "dark"
                      ? PlaceholderDark
                      : PlaceholderLight
                  }
                  className="relative w-[600px]"
                />
              </div>
            </article>

            <article className="relative flex items-center justify-center gap-16">
              <div className="relative min-w-[600px]">
                <span className="pointer-events-none absolute top-0 left-0 text-[300px] blur-[200px] select-none">
                  🖼️
                </span>

                <img
                  src={
                    useTheme().resolvedTheme === "dark"
                      ? PlaceholderDark
                      : PlaceholderLight
                  }
                  className="relative w-[600px]"
                />
              </div>

              <div>

                <h1>🖼️ Media Manager</h1>
                <p>
                  All-in-one Media Manager lets you organize your photos, videos
                  and musics efficiently.
                </p>
                <p>
                  Utilize AI to categorize your assets to effortlessly find them
                  in a gallery. Automatically detect duplicate media and reduce
                  redundancy easily.
                </p>

                <div className="mt-10 flex gap-4">
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
            </article>

          </div>
        </Prose>
      </section>

      <hr className="h-0.5 w-full border-none bg-neutral-200 dark:bg-neutral-800" />

      <section id="adventure">
        <Prose>

          <h1>🧭 Past Adventure</h1>
          <p>
            The year is 2021, and COVID-19 just struck my country. 15 year old
            me went to my native village, and I got trapped. I can no longer
            travel back to home due to lockdown restrictions. Figuring ways to
            pass my time, I decided to try make my own game. I did not have a
            computer at that time, so I had to resort to my Mom's mobile phone.
            I used an Android app (whose name I cannot remember anymore), and
            built a small game. Just a really tiny shooter game.
          </p>
          <p>
            Unfortunately, the mobile phone overheated and died permanently. So
            I had to use my old Samsung Galaxy Tab 4. It was running Android
            4.4.2, and had 8 GB storage + 1.24 GB RAM. Though, I had a SD Card
            of 32 GB storage.
          </p>
          <p>
            My tab did not support that app I was using, so that is when I
            gotten into programming. I discovered Unity, and the fact that it
            uses C# for scripting. I decided to learn C# in my tab, so I can
            start making game after I get back to home and have a computer (it
            will be a long while even after coming home). This means, C#... is
            my first programming language... whether I like it or not.
          </p>

          <div className="mt-10 flex gap-4">
            <Link url="" className="group flex items-center gap-2 px-6">
              <span className="font-bold">Read More</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </Prose>
      </section>

      <hr className="h-0.5 w-full border-none bg-neutral-200 dark:bg-neutral-800" />

      <section id="contact">
        <Prose className="prose-a:underline">

          <h1>✉️ Contact</h1>
          <p>
            Contact me by emailing:{" "}
            <a href="mailto:anstro.pleuton@gmail.com" className="text-">
              anstro.pleuton@gmail.com
            </a>
            .
          </p>

          <p>Or by using Socials:</p>
          <ul>
            <li>
              <a href="https://github.com/anstropleuton">GitHub</a>
            </li>
          </ul>

        </Prose>
      </section>
    </div>
  );
}
