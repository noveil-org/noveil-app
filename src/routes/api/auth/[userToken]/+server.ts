import type { RequestHandler, RequestEvent } from './$types';

import { PUBLIC_AUTH_SERVER_URL } from '$env/static/public';
import { IDENA_API_BASE_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { IdenaUserStatus } from '$lib/idena';

export const GET: RequestHandler = async (e: RequestEvent) => {
  const url = new URL('/v1/get-account', PUBLIC_AUTH_SERVER_URL);
  const { userToken } = e.params
  url.searchParams.set('token', userToken);
  let resp = await fetch(url);
  if (resp.status != 404) {
    let jsonResp = await resp.json();
      if (jsonResp.success) {
        let resp2 = await fetch(`${IDENA_API_BASE_URL}/Identity/${jsonResp.data.address}`);
      let data2 = await resp2.json();
      let res = data2.result;
      return json({
        success: jsonResp.success,
        address: jsonResp.success ? jsonResp.data.address : null,
        state: res.state
      });
    } else {
      return json({ success: false, address: null, state: IdenaUserStatus[IdenaUserStatus.Undefined] });
    }
  } else {
    return json({ success: false, address: null, state: IdenaUserStatus[IdenaUserStatus.Undefined] });
  }
}