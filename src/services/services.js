import myRequest from '@/utils/myRequest';

let SERVERIP = 'http://localhost:3000/';

export async function fakeError(params) {
  return myRequest(`${SERVERIP}fake-error`, params, 'GET');
}

export async function getArticles(params) {
  return myRequest(`${SERVERIP}articles`, params, 'GET');
}

export async function postArticles(params) {
  return myRequest(`${SERVERIP}articles`, params, 'POST');
}

export async function getUsers(params) {
  return myRequest(`${SERVERIP}users`, params, 'GET');
}





