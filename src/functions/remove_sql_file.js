import { rmSync } from "node:fs";

import sendDiscordMessage from "./send_message.js";

async function removeSqlFile(path) {
  try {
    rmSync(path);
  } catch (err) {
    await sendDiscordMessage("error", {
      content: "Erro ao remover arquivo SQL",
      description: "Erro ao remover arquivo SQL",
      title: "Erro",
    });
  }
}

export default removeSqlFile;
