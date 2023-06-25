import mysqldump from "mysqldump";
import moment from "moment/moment.js";
import { randomUUID } from 'crypto'

import compress_file from "./compress.js";
import { db_constants } from "../constants/db.js";
import send_discord_message from "../functions/send_message.js";

async function make_backup() {
  const date = moment().format('DD-MM-YYYY');
  const filename = `${randomUUID()}-${db_constants.name}-${date}.sql`
  
  try {
    await mysqldump({
      connection: {
        host: db_constants.host,
        user:db_constants.user,
        password: db_constants.password,
        database: db_constants.name,
      },
      dumpToFile: `./backups/${filename}`,
    });
   
    await compress_file(`./backups/${filename}`);

    await send_discord_message({
      content: null,
      embeds: [
        {
          title: "Backup realizado com sucesso!",
          description:
            'O backup do banco de dados foi concluído com sucesso! O arquivo de backup comprimido foi salvo com o nome "teste{timestamp}.sql.gz" no diretório de backups.',
          color: 4718336,
          image: {
            url: "https://pbs.twimg.com/media/Ee1OncjXYAAXRp7.jpg",
          },
        },
      ],
      attachments: [],
    });
  } catch (error) {
    console.log(error)
   
    await send_discord_message({
      content: null,
      embeds: [
        {
          title: "Erro ao realizar backup!",
          description:
            'Desculpe, ocorreu um erro ao realizar o backup do banco de dados. Verifique as configurações de conexão e certifique-se de que o banco de dados esteja acessível. Se o problema persistir, entre em contato com o suporte técnico para obter assistência adicional.',
          color: 15400960,
          image: {
            url: "https://preview.redd.it/0g75x7lp1xf31.jpg?auto=webp&s=1ba67c4fe8dcddbdf54134a6fb3e4cd76c187415",
          },
        },
      ],
      attachments: [],
    });
  }
}

export default make_backup;
