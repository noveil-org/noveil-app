import { POLL_MFS_DIR } from '$env/static/private';
import { create } from 'kubo-rpc-client'

// export const ipfs = create(new URL('http://127.0.0.1:5001'))
export const ipfs = create({
  host: "localhost",
  port: 5001,
  protocol: "http"
})

export async function downloadFile(filename: string) {
  let contents = "";
  for await (const chunk of ipfs.files.read(filename)) {
    contents += new TextDecoder().decode(chunk);
  }
  return JSON.parse(contents);
}

export async function listFiles() {
  let files = new Array();
  for await (const f of ipfs.files.ls(POLL_MFS_DIR)) {
    files.push({filename: f.name, cid: f.cid.toString()});
  }
  return files;
}
