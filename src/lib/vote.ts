import { PUBLIC_APP_EXTERNAL_URL } from "$env/static/public";

export async function vote(index: number, cid: string, userAddr: string) {
  const message = JSON.stringify({
    poll_selection: index,
    user_address: userAddr,
    poll_cid: cid
  });
  const callback_url = new URL(`${PUBLIC_APP_EXTERNAL_URL}/api/votes`);
  callback_url.searchParams.set("message", message);
  const url = `https://app.idena.io/dna/sign?message=${message}&callback_url=${callback_url.toString()}`;
  window.open(url.toString());
}
