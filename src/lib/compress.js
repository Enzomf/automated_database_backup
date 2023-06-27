import zlib from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";

import sendDiscordMessage from "../functions/send_message.js";
import removeSqlFile from "../functions/remove_sql_file.js";
import make_upload from './upload.js'

async function compressFile(filePath) {
  const gzip = zlib.createGzip();
  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(filePath + ".gz");

  readStream.pipe(gzip).pipe(writeStream);

  readStream.on("error", async (error) => {
    console.log(error);
    await sendDiscordMessage("error", {
      title: "Erro ao realizar backup!",
      description: `Desculpe, ocorreu um erro ao realizar a compressão do arquivo de backup. Verifique as configurações de conexão e certifique-se de que o banco de dados esteja acessível. Se o problema persistir, entre em contato com o suporte técnico para obter assistência adicional. ERRO: ${error}`,
    });
  });

  readStream.on("close", async () => {
    await removeSqlFile(filePath)
    await make_upload('', filePath +'.gz')
  });
}

export default compressFile;
