import { POLL_MFS_DIR } from '$env/static/private';
import { listFiles, downloadFile } from '$lib/ipfs';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const files = await listFiles();
  let polls = new Array();
  for (const f of files) {
    const content = await downloadFile(`${POLL_MFS_DIR}/${f.filename}`);
    polls.push({...content, cid: f.cid});
  }
  return { polls };
}) satisfies PageServerLoad;
