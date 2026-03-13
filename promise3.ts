// Re implement the above functions this time as async functions along with await, and test them using async await based promise consumption

import { promises as fs } from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const __filepath = fileURLToPath(import.meta.url);
const __dirpath = path.dirname(__filepath);

async function getFileType(
  path: string,
): Promise<"File" | "Directory" | "OTHER"> {
  try {
    const stats = await fs.stat(path);
    if (stats.isFile()) return "File";
    if (stats.isDirectory()) return "Directory";
    return "OTHER";
  } catch {
    throw new Error("File System Error");
  }
}

async function getFileContents(p: string): Promise<string | string[]> {
  try {
    const type = await getFileType(p);
    if (type === "File") return p;
    if (type === "Directory") return await fs.readdir(p);
    return p;
  } catch {
    throw new Error("File System Error");
  }
}

async function getFileSize(p: string): Promise<number> {
  try {
    const contents = await getFileContents(p);
    const stats = await fs.stat(p);

    if (!Array.isArray(contents)) return stats.size;
    else {
      const fileSizeList = contents.map(async (file) => {
        const fullPath = path.join(p, file);
        const stats = await fs.stat(fullPath);
        return stats.size;
      });

      const sizes = await Promise.all(fileSizeList);

      return sizes.reduce((acc, s) => acc + s, 0);
    }
  } catch {
    throw new Error("File System Failed");
  }
}

async function main() {
  try {
    const type = await getFileType(__dirpath);
    console.log("File Type:", type);

    const content = await getFileContents(__dirpath);
    console.log("Folder contents:", content);

    const size = await getFileSize(__dirpath);
    console.log("Folder Size:", size);
  } catch (err) {
    console.log(err);
  }
}

main();
