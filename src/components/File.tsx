import {
  ArrowUpRight,
  Copy,
  FileImage as FileImageIcon,
  FileVideo as FileVideoIcon,
  FileAudio as FileAudioIcon,
  FileText as FileTextIcon,
  File as FileIcon,
} from "lucide-react";
import Button from "./Button";
import Card from "./Card";
import { HorizontalScrollArea } from "./ScrollArea";
import type { File } from "./loadFiles";
import type { ReactNode } from "react";
import Formatted from "./Formatted";
import { extToKindMap, moduleExts } from "./fileType";
import CodeBlock, { Code } from "./CodeBlock";

interface FileViewerProps {
  file: File;
  pathNodes: ReactNode[];
  copied: boolean;
  copyRaw: () => Promise<void>;
  className?: string;
}

export function FileViewer({
  file,
  pathNodes,
  copied,
  copyRaw,
  className,
}: FileViewerProps) {
  const ext = (() => {
    if (file.ext) return String(file.ext).replace(/^\./, "").toLowerCase();
    const m = file.name.match(/\.([^.]+)$/);
    return m ? m[1].toLowerCase() : "";
  })();

  const kindMap = extToKindMap();
  const type = kindMap[ext] ?? null;
  const kindIcon =
    type === "image" ? (
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

  // if this file was imported as a module/component (mdx, svg, jsx, tsx),
  // prefer rendering file.module
  const isModuleFile = moduleExts.includes(ext);

  const renderPreview = () => {
    // If it's a module ext and module exists, render the component
    if (isModuleFile && file.module) {
      const moduleSource = String(file.module || "");
      const trimmed = moduleSource.trim();

      if (trimmed.length === 0 || trimmed.length < 40) {
        return (
          <div className="text-sm text-neutral-500">No preview available</div>
        );
      }

      const remountKey = `${file.path ?? file.name}:${trimmed.length}`;
      const Component = file.module as any;
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
        return file.url ? (
          <div className="flex w-full justify-center">
            <img
              src={file.url}
              alt={file.name}
              className="max-h-[60vh] w-full rounded-md object-contain"
            />
          </div>
        ) : (
          <div className="text-sm text-neutral-500">No preview available</div>
        );

      case "video":
        return file.url ? (
          <div className="flex w-full justify-center">
            <video
              src={file.url}
              controls
              className="max-h-[60vh] w-full rounded-md bg-black"
            >
              Your browser does not support the video element.
            </video>
          </div>
        ) : (
          <div className="text-sm text-neutral-500">No preview available</div>
        );

      case "audio":
        return file.url ? (
          <div className="flex w-full flex-col gap-2">
            <audio src={file.url} controls className="w-full" />
          </div>
        ) : (
          <div className="text-sm text-neutral-500">No preview available</div>
        );

      case "text":
        // mdx and other module-texts prefer module rendering (handled above).
        // If raw exists, print it; otherwise show "No preview"
        if (file.raw !== undefined && typeof file.raw === "string") {
          return (
            <Formatted>
              <CodeBlock>
                <code className={`language-${file.ext.slice(1)}`}>
                  {file.raw}
                </code>
              </CodeBlock>
            </Formatted>
          );
        }

        return (
          <div className="text-sm text-neutral-500">No preview available</div>
        );

      default:
        return null;
    }
  };

  const previewNode = renderPreview();

  return (
    <div className="flex w-full flex-col gap-10 overflow-auto">
      <Card className={className}>
        <div className="min-w-0">
          <HorizontalScrollArea>
            <div className="flex items-center gap-2">{pathNodes}</div>
          </HorizontalScrollArea>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {kindIcon}
              <div>
                <div className="text-lg font-medium">{file.name}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {ext ? ext : "file"} • {file.path ?? ""}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={copyRaw}>
                <Button className="flex cursor-pointer gap-2 rounded-xl">
                  <Copy className="h-6 w-6" />{" "}
                  {copied ? "Copied Raw" : "Copy Raw"}
                </Button>
              </button>

              <a href={file.url} className="no-underline">
                <Button className="flex gap-2 rounded-xl">
                  Open Raw <ArrowUpRight className="h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>

          {previewNode ? (
            <div>{previewNode}</div>
          ) : (
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              No preview available for this file type.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

interface FileList {
  pathNodes: ReactNode[];
  dirNodes: ReactNode[];
  fileNodes: ReactNode[];
  className?: string;
}

export function FileList({
  pathNodes,
  dirNodes,
  fileNodes,
  className,
}: FileList) {
  return (
    <div className="flex w-full flex-col gap-10 overflow-auto">
      <Card className={className}>
        <div className="min-w-0">
          <HorizontalScrollArea>
            <div className="flex items-center gap-2">{pathNodes}</div>
          </HorizontalScrollArea>
        </div>

        <div className="flex flex-col gap-2">
          {dirNodes}
          {fileNodes}
        </div>
      </Card>
    </div>
  );
}
