import type { RequestHandler, RequestEvent } from './$types';
import { json } from '@sveltejs/kit';
import { downloadFile } from '$lib/ipfs';

export const GET: RequestHandler = async (e: RequestEvent) => {
  const { cid } = e.params;
  let contents = downloadFile(cid);
  return json({contents: contents});
}
