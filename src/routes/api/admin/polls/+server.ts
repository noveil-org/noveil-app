import type { RequestHandler, RequestEvent } from './$types';
import { json } from '@sveltejs/kit';
import { ipfs, listFiles } from '$lib/ipfs';
import { POLL_MFS_DIR } from '$env/static/private';

export const GET: RequestHandler = async () => {
  return json({files: listFiles()});
}

export const POST: RequestHandler = async (e: RequestEvent) => {
  const req = await e.request.json();
  const uuid = crypto.randomUUID()
  const filename = `${uuid}.json`;
  await ipfs.files.write(`${POLL_MFS_DIR}/${filename}`, JSON.stringify(req), { create: true });
  return json({filename: filename});
}
