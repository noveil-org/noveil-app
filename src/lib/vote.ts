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
  openCenteredPopup(url.toString());
}

function openCenteredPopup(url: string, width = 500, height = 600) {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  window.open(
    url,
    '_blank',
    `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no,toolbar=no,status=no,menubar=no,location=no,dependent=yes,modal=yes,titlebar=no`
  );
}
