import { join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { __dirname } from "../constants/fs.js";

function verifyFolderExistsOrCreate(folderName) {
  return new Promise((resolve) => {
    const folderPath = join(__dirname, "..", "..", "backups", folderName);

    const dirExists = existsSync(folderPath);

    if (!dirExists) {
      mkdirSync(folderPath, { recursive: true }, (error) => {
        resolve(false);
      });
    }
    resolve(true);
  });
}

export { verifyFolderExistsOrCreate };
