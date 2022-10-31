import request from 'umi-request';

const SERVERIP = 'http://localhost:3000/';

export async function fakeError(params) {
  return request.get(`${SERVERIP}fake-error`, {params});
}

export async function getArticles(params) {
  return request.get(`${SERVERIP}articles`, {params});
}

export async function postArticles(data) {
  return request.post(`${SERVERIP}articles`, {data});
}

export async function putArticles(data) {
  return request.put(`${SERVERIP}articles/${data.id}`, {data});
}

export async function deleteArticle(data) {
  return request.delete(`${SERVERIP}articles/${data.id}`);
}

export async function getUsers(params) {
  return request.get(`${SERVERIP}users`, {params});
}
