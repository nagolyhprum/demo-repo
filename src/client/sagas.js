import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import { LIST_FETCH_REQUEST, LIST_FETCH_SUCCEEDED, LIST_FETCH_FAILED } from "./actions/total"

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchList(action) {
   try {
      const list = yield Promise.resolve([]);
      yield put({type: LIST_FETCH_SUCCEEDED, list });
   } catch (e) {
      yield put({type: LIST_FETCH_FAILED, message: e.message});
   }
}

function* mySaga() {
  yield all([
    takeLatest(LIST_FETCH_REQUEST, fetchList)
  ]);
}

export default mySaga;