import * as url from 'node:url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export { 
    __dirname,
    __filename
}