import request from 'umi-request';

/**
 * Requests a URL, returning a promise.
 *
 */
export default function myRequest(
  url,
  body = {},
  method = 'POST',
) {
  const options = { method, body };

  const makeUrlSearch = (body) => {
    let _urlSearch = '';
    Object.keys(body).map((param, i) => {
      let val = body[param];
      if (val !== null && typeof val !== "undefined") {
        _urlSearch += `${i ? '&' : ''}${param}=${body[param]}`;
      }
      return 0;
    });
    return _urlSearch;
  }

  if (method === 'GET') {
    let urlSearch = makeUrlSearch(options.body);
    url += `?${urlSearch}`;
    delete options.body;
  } else {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };
    options.body = JSON.stringify(options.body);
  }

  return request(url, options)
    .then(response => response)
    .catch(e => {
      return {code: 0, msg: e};
    });
}