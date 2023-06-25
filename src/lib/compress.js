import zlib from 'node:zlib'
import { createReadStream , createWriteStream} from 'node:fs'


async function compress_file(file_path){
    
    const gzip = zlib.createGzip()
    const readStream = createReadStream(file_path);
    const writeStream = createWriteStream(file_path + '.gz')
   
    readStream.pipe(gzip).pipe(writeStream);

    readStream.on('error', error => console.log(error))
  
    readStream.on('end', ()=> console.log('backup realizado com sucesso'))
}




export default compress_file