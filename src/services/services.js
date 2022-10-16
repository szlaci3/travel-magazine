import myRequest from '@/utils/myRequest';

let SERVERIP = 'http://localhost:3000/';

export async function getPosts(params) {
  return myRequest(`${SERVERIP}fake-error`, params, 'GET');
}

// export async function getPosts(params) {
//   return myRequest(`${SERVERIP}posts`, params, 'GET');
// }

export async function postPosts(params) {
  return myRequest(`${SERVERIP}posts`, params, 'POST');
}





