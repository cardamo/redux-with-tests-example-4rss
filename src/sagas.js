import {call, select, put, takeEvery, take} from 'redux-saga/effects'
import {fetchStudents} from './api/dataApi'

function* onStudentsFetch(action) {
  let session = yield select(state => state.session);

  if (!session.data.githubId) {
    yield take('SESSION_FETCH_OK');
    session = yield select(state => state.session);
  }

  const students = yield call(fetchStudents, session.data);
  yield put({type: 'STUDENTS_FETCH_OK', payload: students})
}

export default function*() {
  yield takeEvery("STUDENTS_FETCH", onStudentsFetch);
}