// src/pages/FileExplorer.tsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import type {
  Dir as DirType,
  File as FileType,
} from "../../components/loadFiles";
import path from "path-browserify";
import { twMerge } from "tailwind-merge";
import { useEffect, useMemo, useState } from "react";
import {
  Folder,
  FileImage as FileImageIcon,
  FileVideo as FileVideoIcon,
  FileAudio as FileAudioIcon,
  FileText as FileTextIcon,
  File as FileIcon,
  Copy,
  ArrowUpRight,
} from "lucide-react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { FileList, FileViewer } from "../../components/File";
import { extToKindMap, moduleExts } from "../../components/fileType";
import CodeBlock, { Code } from "../../components/CodeBlock";
import usePageTitle from "../../components/setPageTitle";
import useLayout from "../../components/useLayout";
import { links } from "../../data/links";
import Formatted from "../../components/Formatted";

interface FileExplorerProps {
  dir: DirType;
  className?: string;
}

function joinPath(...segments: Array<string | undefined | null>) {
  const parts = segments
    .filter(Boolean)
    .flatMap((s) => String(s).split(path.sep).filter(Boolean));
  return "/" + parts.map((p) => encodeURIComponent(p)).join("/");
}

export default function FileExplorer({
  dir: rootDir,
  className,
}: FileExplorerProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [copiedPreview, setCopiedPreview] = useState(false);
  const { setLayout } = useLayout();
  useEffect(() => {
    setLayout({ links: links });

    return () => {
      setLayout({});
    };
  }, []);

  usePageTitle(`View ${location.pathname}`);

  const { cwdPath, currentDir, invalidPath, lastValidPath, isFile, file } =
    useMemo(() => {
      const cwd: string[] = [];
      let invalid = false;
      let lastValid = "/";
      let cur: DirType = rootDir;
      let foundFile: FileType | null = null;
      let fileFlag = false;

      const segments = location.pathname
        .split(path.sep)
        .filter(Boolean)
        .map((s) => {
          try {
            return decodeURIComponent(s);
          } catch {
            return s;
          }
        });

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const nextDir = cur.dirs.find((d) => d.name === seg);
        if (nextDir) {
          cur = nextDir;
          cwd.push(seg);
          lastValid = "/" + cwd.join("/");
          continue;
        }

        if (i === segments.length - 1) {
          const maybeFile = cur.files.find((f) => f.name === seg);
          if (maybeFile) {
            foundFile = maybeFile;
            fileFlag = true;
            break;
          }
        }

        invalid = true;
        lastValid = "/" + cwd.join("/");
        break;
      }

      return {
        cwdPath: cwd,
        currentDir: cur,
        invalidPath: invalid,
        lastValidPath: lastValid,
        isFile: fileFlag,
        file: foundFile,
      };
    }, [rootDir, location.pathname]);

  useEffect(() => {
    if (invalidPath) {
      navigate(lastValidPath || "/", { replace: true });
    }
  }, [invalidPath, lastValidPath, navigate]);

  // Copy when in file-view mode (existing)
  async function copyRaw() {
    if (!file) return;
    try {
      await navigator.clipboard.writeText(file.raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  // Copy for the preview card
  async function copyPreviewRaw(previewFile: FileType | null | undefined) {
    if (!previewFile) return;
    try {
      await navigator.clipboard.writeText(previewFile.raw);
      setCopiedPreview(true);
      setTimeout(() => setCopiedPreview(false), 1500);
    } catch {}
  }

  const pathNodes = cwdPath.flatMap((segment, i) => {
    const to = joinPath(...cwdPath.slice(0, i + 1));
    return [
      <Link key={`breadcrumb-${i}-${segment}`} to={to}>
        <Button className="rounded-xl">
          <span>{segment}</span>
        </Button>
      </Link>,
      i < cwdPath.length - 1 && (
        <span key={`sep-${i}`} className="px-2">
          /
        </span>
      ),
    ];
  });

  if (isFile && file) {
    if (pathNodes.length > 0) {
      pathNodes.push(
        <span key="sep-last" className="px-2">
          /
        </span>,
      );
    }
    pathNodes.push(
      <Button
        uninteractable={true}
        key="file-breadcrumb"
        className="rounded-xl bg-neutral-100 dark:bg-neutral-800"
        aria-current="page"
      >
        <span>{file.name}</span>
      </Button>,
    );
  }

  const dirNodes = currentDir.dirs.map((d) => {
    const to = d.path ? joinPath(d.path) : joinPath(currentDir.path, d.name);
    return (
      <Link key={`dir-${to}`} to={to}>
        <Button className="rounded-xl">
          <div className="flex items-center gap-4">
            <Folder className="h-6 w-6" />
            <span className="truncate">{d.name}</span>
          </div>
        </Button>
      </Link>
    );
  });

  const fileNodes = currentDir.files.map((f) => {
    const kindMap = extToKindMap();
    const type = kindMap[f.ext.slice(1)] ?? null;
    const kindIcon =
      type === "image" ? (
        <FileImageIcon className="h-6 w-6" />
      ) : type === "video" ? (
        <FileVideoIcon className="h-6 w-6" />
      ) : type === "audio" ? (
        <FileAudioIcon className="h-6 w-6" />
      ) : type === "text" ? (
        <FileTextIcon className="h-6 w-6" />
      ) : (
        <FileIcon className="h-6 w-6" />
      );

    const to = joinPath(currentDir.path, f.name);
    return (
      <Link key={`file-${to}`} to={to}>
        <Button
          className="rounded-xl"
          aria-label={`Open file ${f.name}`}
          data-type="file"
        >
          <div className="flex items-center gap-4">
            {kindIcon}
            <span className="truncate">{f.name}</span>
          </div>
        </Button>
      </Link>
    );
  });

  const mergedClasses = twMerge(`flex flex-col gap-8`, className);

  // Determine preview file for the directory view:
  // Prefer readme.mdx (case-insensitive), otherwise if only 1 file in dir use that.
  const previewFile: FileType | null = useMemo(() => {
    if (!currentDir) return null;
    const readme = currentDir.files.find(
      (f) => f.name.toLowerCase() === "readme.mdx",
    );
    if (readme) return readme;
    if (currentDir.files.length === 1) return currentDir.files[0];
    return null;
  }, [currentDir]);

  // If we're at a file-specific route, render the full FileViewer (unchanged)
  // The existing FileViewer is in components/File.tsx — keep same behavior for single-file route.
  if (isFile && file) {
    return (
      <div className="flex flex-col gap-10 overflow-hidden">
        <Formatted>
          <h1>View the source code of my old projects.</h1>
        </Formatted>
        <FileViewer
          file={file}
          pathNodes={pathNodes}
          copied={copied}
          copyRaw={copyRaw}
          className={mergedClasses}
        />
      </div>
    );
  }

  // ---------------------------------------------------------
  // Helper: render the preview content (image/video/audio/text/module)
  // ---------------------------------------------------------
  function renderPreviewContent(pf: FileType) {
    const ext =
      pf.ext && pf.ext.length > 0
        ? String(pf.ext).replace(/^\./, "").toLowerCase()
        : (() => {
            const m = pf.name.match(/\.([^.]+)$/);
            return m ? m[1].toLowerCase() : "";
          })();

    const kindMap = extToKindMap();
    const type = kindMap[ext] ?? null;

    const isModuleFile = moduleExts.includes(ext);

    // Module rendering (MDX, jsx, etc.)
    if (isModuleFile && pf.module) {
      // Use the module function's source (string) as a version key.
      // This will change when the compiled MDX changes (empty <-> non-empty).
      const moduleSource = String(pf.module || "");
      const trimmed = moduleSource.trim();
      // Avoid rendering tiny/empty compiled modules — treat them as "no content".
      if (trimmed.length === 0 || trimmed.length < 40) {
        return (
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            No preview available for this file type.
          </div>
        );
      }
      // remountKey changes whenever the compiled module source changes.
      const remountKey = `${pf.path ?? pf.name}:${trimmed.length}`;

      const Component = pf.module as any;
      return (
        <Formatted className="text-lg leading-loose">
          <Component
            key={remountKey}
            components={{
              pre: CodeBlock,
              code: Code,
            }}
          />
        </Formatted>
      );
    }

    switch (type) {
      case "image":
        return pf.url ? (
          <div className="flex w-full justify-center">
            <img
              src={pf.url}
              alt={pf.name}
              className="max-h-[50vh] w-full rounded-md object-contain"
            />
          </div>
        ) : (
          <div className="text-sm text-neutral-500">No preview available</div>
        );

      case "video":
        return pf.url ? (
          <div className="flex w-full justify-center">
            <video
              src={pf.url}
              controls
              className="max-h-[50vh] w-full rounded-md bg-black"
            >
              Your browser does not support the video element.
            </video>
          </div>
        ) : (
          <div className="text-sm text-neutral-500">No preview available</div>
        );

      case "audio":
        return pf.url ? (
          <div className="flex w-full flex-col gap-2">
            <audio src={pf.url} controls className="w-full" />
          </div>
        ) : (
          <div className="text-sm text-neutral-500">No preview available</div>
        );

      case "text":
        if (pf.raw !== undefined && typeof pf.raw === "string") {
          // Show as code block with language class if ext present
          return (
            <Formatted>
              <CodeBlock>
                <code className={`language-${pf.ext.slice(1)}`}>{pf.raw}</code>
              </CodeBlock>
            </Formatted>
          );
        }
        return (
          <div className="text-sm text-neutral-500">No preview available</div>
        );

      default:
        return (
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            No preview available for this file type.
          </div>
        );
    }
  }

  // Small helper to render file icon for preview header
  function previewKindIcon(pf: FileType) {
    const ext =
      pf.ext && pf.ext.length > 0
        ? String(pf.ext).replace(/^\./, "").toLowerCase()
        : (() => {
            const m = pf.name.match(/\.([^.]+)$/);
            return m ? m[1].toLowerCase() : "";
          })();
    const kindMap = extToKindMap();
    const type = kindMap[ext] ?? null;
    return type === "image" ? (
      <FileImageIcon className="h-8 w-8" />
    ) : type === "video" ? (
      <FileVideoIcon className="h-8 w-8" />
    ) : type === "audio" ? (
      <FileAudioIcon className="h-8 w-8" />
    ) : type === "text" ? (
      <FileTextIcon className="h-8 w-8" />
    ) : (
      <FileIcon className="h-8 w-8" />
    );
  }

  // Render directory list + optional preview card (compact)
  return (
    <div className="flex flex-col gap-10 overflow-hidden">
      <Formatted>
        <h1>View the source code of my old projects.</h1>
      </Formatted>

      <FileList
        pathNodes={pathNodes}
        dirNodes={dirNodes}
        fileNodes={fileNodes}
        className={mergedClasses}
      />

      {previewFile && (
        <Card className={mergedClasses}>
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                {previewKindIcon(previewFile)}
                <div className="truncate">
                  <div className="truncate text-lg font-medium">
                    {previewFile.name}
                  </div>
                  <div className="truncate text-sm text-neutral-500 dark:text-neutral-400">
                    {previewFile.ext ? previewFile.ext.slice(1) : "file"} •{" "}
                    {previewFile.path ?? ""}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyPreviewRaw(previewFile)}
                  aria-label={`Copy raw ${previewFile.name}`}
                >
                  <Button className="flex cursor-pointer gap-2 rounded-xl">
                    <Copy className="h-5 w-5" />
                    {copiedPreview ? "Copied" : "Copy Raw"}
                  </Button>
                </button>

                <a href={previewFile.url} className="no-underline">
                  <Button className="flex gap-2 rounded-xl">
                    Open Raw <ArrowUpRight className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>

            <div>{renderPreviewContent(previewFile)}</div>
          </div>
        </Card>
      )}
    </div>
  );
}
