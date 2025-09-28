// Central source of truth for file extensions and helpers.
// Used by glob builders (oldProjectFiles) and by FileViewer.

export const moduleExts = [
  "mdx",
  "svg", // treat svg as component/module
  "jsx",
  "tsx",
  // add more module-capable extensions if you compile them to components at build time
];

export const rawTextExts = [
  "txt",
  "md",
  "markdown",
  "json",
  "csv",
  "xml",
  "yaml",
  "yml",
  "ini",
  "sql",
  "toml",
  "log",
  "rst",
  // source code as raw - but you may prefer to treat some as modules; adjust below
  "js",
  "ts",
  "c",
  "cpp",
  "h",
  "hpp",
  "java",
  "kt",
  "swift",
  "go",
  "rs",
  "py",
  "rb",
  "php",
  "pl",
  "sh",
  "bash",
  "ps1",
  "css",
  "scss",
  "less",
  "html",
  "htm",
];

export const imageExts = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "avif",
  "bmp",
  "tiff",
  "ico",
  "heic",
  // note: svg is in moduleExts, not here
];

export const videoExts = ["mp4", "webm", "ogv", "mov", "mkv", "avi", "flv"];

export const audioExts = ["mp3", "wav", "ogg", "m4a", "flac", "aac"];

export const urlExts = [
  // ext types that should prefer ?url import (media, fonts, binary)
  ...imageExts,
  ...videoExts,
  ...audioExts,
  // fonts & binary media
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  "pdf",
];

// helper that populates ext => type mapping
export type FileTypeKind = "image" | "video" | "audio" | "text" | "unknown";

export function extToKindMap(): Record<string, FileTypeKind> {
  const map: Record<string, FileTypeKind> = {};
  for (const e of imageExts) map[e] = "image";
  for (const e of videoExts) map[e] = "video";
  for (const e of audioExts) map[e] = "audio";
  for (const e of [...rawTextExts, ...moduleExts]) map[e] = "text";
  return map;
}

// helpers to build glob patterns
function globFor(exts: string[]) {
  if (exts.length === 0) return "";
  if (exts.length === 1) return `**/*.${exts[0]}`;
  return `**/*.{${exts.join(",")}}`;
}

export const rawTextGlob = globFor(rawTextExts);
export const urlGlob = globFor(urlExts);
export const moduleGlob = globFor(moduleExts);

// also export a combined list for convenience
export const allKnownExts = Array.from(
  new Set([...moduleExts, ...rawTextExts, ...urlExts]),
);
