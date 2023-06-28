import { join } from "node:path";
import mysqldump from "mysqldump";
import { randomUUID } from "crypto";
import moment from "moment";

import compressFile from "./compress.js";
import { __dirname } from "../constants/fs.js";
import { db_constants } from "../constants/db.js";
import removeSqlFile from "../functions/remove_sql_file.js";
import sendDiscordMessage from "../functions/send_message.js";
import { verifyFolderExistsOrCreate } from "../functions/folder_exists_or_create.js";



async function makeBackup() {
  await verifyFolderExistsOrCreate(db_constants.name);

  const date = moment().format("DD-MM-YYYY");
  const filename = `${randomUUID()}-${db_constants.name}-${date}.sql`;
  const backupPath = join(__dirname, "..", "..", "backups", db_constants.name, filename);

  try {
    await mysqldump({
      connection: {
        host: db_constants.host,
        user: db_constants.user,
        password: db_constants.password,
        database: db_constants.name,
      },
      dumpToFile: backupPath,
    });

    await compressFile(backupPath, filename);
   
    await sendDiscordMessage("success", {
      title: "Backup realizado com sucesso!",
      description: `O backup do banco de dados foi concluído com sucesso! O arquivo de backup comprimido foi salvo com o nome "**${filename}**" no diretório de backups.`,
    }); 
  } catch (error) {
    console.log(error);
    await sendDiscordMessage("error", {
      title: "Erro ao realizar backup!",
      description:
        "Desculpe, ocorreu um erro ao realizar o backup do banco de dados. Verifique as configurações de conexão e certifique-se de que o banco de dados esteja acessível. Se o problema persistir, entre em contato com o suporte técnico para obter assistência adicional.",
    });

    await removeSqlFile(backupPath);
  }
}

export default makeBackup;
