import path from "path-browserify";
import { buildDir } from "../components/loadFiles";
import type { File as FileType } from "../components/loadFiles";

/**
 * IMPORTANT:
 * import.meta.glob MUST use a literal pattern. That's why these patterns are explicit long literals.
 *
 * Three eager globs:
 *  - raw text imports (?raw) for many text/source file types
 *  - url imports (?url) for images/audio/video/fonts/pdf/etc.
 *  - module imports (default export) for mdx/svg/jsx/tsx (components)
 *
 * We merge them by key so a file may have raw/url/module fields.
 */

// ======== LITERAL GLOB PATTERNS (must be literal strings) ========

// Raw text/source files (import as string)
const textGlob = import.meta.glob(
  "../old-projects/**/*.{txt,md,markdown,json,csv,xml,yaml,yml,ini,toml,log,rst,html,htm,css,scss,less,sql,js,ts,jsx,tsx,c,cpp,h,hpp,java,kt,swift,go,rs,py,rb,php,pl,sh,bash,ps1}",
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);

// Media / binary / fonts (import as URL)
const urlGlob = import.meta.glob(
  "../old-projects/**/*.{png,jpg,jpeg,gif,webp,avif,bmp,tiff,ico,heic,mp4,webm,ogv,mov,mkv,avi,flv,mp3,wav,ogg,m4a,flac,aac,woff,woff2,ttf,otf,eot,pdf}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

// Module-capable files: mdx and svg (and JSX/TSX if you compile them to components)
// treat these as module imports (default export is component)
const moduleGlob = import.meta.glob(
  "../old-projects/**/*.{mdx,svg,jsx,tsx}",
  {
    eager: true,
    import: "default",
  },
);

// ======== Merge logic (same approach as earlier examples) ========

function makeFileEntry(key: string, data: { raw?: any; url?: string; module?: any }): FileType {
  // Trim leading "../" occurrences to match previous behavior in loadFilesList(..., "../")
  let k = key;
  while (k.startsWith("../")) k = k.slice(3);

  const filePath = path.dirname(k) === "." ? "" : path.dirname(k);
  const name = path.basename(k);
  const ext = path.extname(k);

  // prefer explicit url from ?url import; otherwise produce a URL that points to the static asset
  const url = data.url ? data.url : new URL(key, import.meta.url).toString();
  const raw = data.raw;

  return { path: filePath, name, ext, raw, url, module: data.module };
}

const map = new Map<string, Partial<{ raw: any; url: string; module: any }>>();

for (const [k, v] of Object.entries(textGlob)) {
  map.set(k, { ...(map.get(k) ?? {}), raw: v as string });
}

for (const [k, v] of Object.entries(urlGlob)) {
  map.set(k, { ...(map.get(k) ?? {}), url: v as string });
}

for (const [k, v] of Object.entries(moduleGlob)) {
  // v is the module default export (because we used import: "default")
  map.set(k, { ...(map.get(k) ?? {}), module: v });
}

const files: FileType[] = [];
for (const [k, entry] of map.entries()) {
  files.push(makeFileEntry(k, entry as any));
}

export const oldProjectFiles = buildDir(files);
