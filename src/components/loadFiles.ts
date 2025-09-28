import path from "path-browserify";

export interface File {
  path: string;
  name: string;
  ext: string;
  raw?: any;
  url: string;
  module?: any; // module / component (e.g., mdx, svg, jsx/tsx) if present
}

export interface Dir {
  path: string;
  name: string;
  files: File[];
  dirs: Dir[];
}

export function loadFilesList(rawGlob: Record<string, string>, relative = "") {
  const files: File[] = [];

  for (const key of Object.keys(rawGlob)) {
    let k = key;
    if (relative) {
      while (k.startsWith(relative)) k = k.slice(relative.length);
    }

    const filePath = path.dirname(k) === "." ? "" : path.dirname(k);
    const name = path.basename(k);
    const ext = path.extname(k);
    const raw = rawGlob[key];
    const url = new URL(key, import.meta.url).toString();

    files.push({ path: filePath, name, ext, raw, url });
  }

  return files;
}

export function buildDir(files: File[]) {
  const root: Dir = { path: "", name: "", files: [], dirs: [] };

  for (const file of files) {
    const parts = file.path ? file.path.split("/").filter(Boolean) : [];
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const dirPath = parts.slice(0, i + 1).join("/");
      let next = current.dirs.find((d) => d.name === name);
      if (!next) {
        next = { path: dirPath, name, files: [], dirs: [] };
        current.dirs.push(next);
      }
      current = next;
    }

    current.files.push(file);
  }

  return root;
}

export default function loadFiles(
  rawGlob: Record<string, string>,
  relative = "",
) {
  const files = loadFilesList(rawGlob, relative);
  return buildDir(files);
}
