import { json } from '@sveltejs/kit';
import type { RequestHandler, RequestEvent } from './$types';
import { db } from '$lib/db';

export const GET: RequestHandler = async (e: RequestEvent) => {
  console.log(e.url.searchParams);
  const message = JSON.parse(e.url.searchParams.get("message") ?? "{}");
  const signature = e.url.searchParams.get("signature");
  let dbResp = await db.votes.create({ data: { ...message, vote_signature: signature } });
  return json(dbResp);
}
