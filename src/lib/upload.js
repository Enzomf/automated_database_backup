import { join } from 'node:path';
import firebase_admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { __dirname } from '../constants/fs.js';

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', '..', 'firebase-key.json'), 'utf8')
);

firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL,
});

const bucket = firebase_admin.storage().bucket();

async function make_upload(filename, filepath) {
  
  await bucket.upload(filepath)
}

export default make_upload;
