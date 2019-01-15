// import {
//   delay
// } from 'redux-saga'
import {
  all,
  call,
  // takeEvery,
  put,
  takeLatest,
} from "redux-saga/effects";

import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("/graphql", {
 credentials: "include",
});

const mutation = () => client.request(`
  mutation {
    hello(value : "abc")
  }
`).then((data) => console.log(data));

const query = () => client.request(`
  query {
    hello
  }
`).then((data) => console.log(data));

// query().then(mutation).then(query);

const getList = () => new Promise((resolve) => {
  resolve(["a", "b", "c"]);
});

import { LIST_FETCH_FAILED, LIST_FETCH_REQUEST, LIST_FETCH_SUCCEEDED } from "./actions/total";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchList() { // action
   try {
      const list = yield call(getList);
      // iterator.next('bar');
      // iterator.throw(new Error('bar'));
      yield put({type: LIST_FETCH_SUCCEEDED, list });
   } catch (e) {
      yield put({type: LIST_FETCH_FAILED, message: e.message});
   }
}

function* mySaga() {
  yield all([
    takeLatest(LIST_FETCH_REQUEST, fetchList),
  ]);
}

export default mySaga;
