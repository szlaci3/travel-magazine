import { getArticles, getUsers } from '../services/services';

export default {
  namespace: 'global',

  state: {},

  effects: {
    *_getArticles({ payload }, { call, put }) {
      const response = yield call(getArticles, payload);
      yield put({
        type: 'getArticlesReducer',
        payload: response,
      });
    },
    *_getUsers({ payload }, { call, put }) {
      const response = yield call(getUsers, payload);
      yield put({
        type: 'getUsersReducer',
        payload: response,
      });
    },
  },
  reducers: {
    getArticlesReducer(state, action) {
      return {
        ...state,
        articlesRes: action.payload,
      };
    },
    getUsersReducer(state, action) {
      return {
        ...state,
        usersRes: action.payload,
      };
    },
  },
};
