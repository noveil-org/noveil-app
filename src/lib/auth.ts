import {
  PUBLIC_IDENA_APP_BASE_URL,
  PUBLIC_AUTH_SERVER_URL,
  PUBLIC_APP_BASE_URL
} from '$env/static/public';

export async function idenaLogin(token: string | null, addr: string | null) {
  if (addr) {
    alert('Already logged in!')
  } else {
    const params = new URLSearchParams({
      token: token ?? "",
      callback_url: PUBLIC_APP_BASE_URL,
      nonce_endpoint: `${PUBLIC_AUTH_SERVER_URL}/v1/start-session`,
      authentication_endpoint: `${PUBLIC_AUTH_SERVER_URL}/v1/authenticate`,
      favicon_url: `${PUBLIC_APP_BASE_URL}/favicon.ico`
    });
    const url = new URL(`${PUBLIC_IDENA_APP_BASE_URL}/dna/signin`);
    url.search = params.toString();
    window.open(url.toString(), "_self");
  }
}
