let defaultSessionState = {
  data: {},
  loading: false,
};
let defaultStudentsState = {
  data: [],
  loading: false,
};
let defaultTableState = {
  sort: [],
  search: '',
};

const session = (state = defaultSessionState, action) => {
  switch (action.type) {
    case 'SESSION_FETCH':
      return {...state, loading: true};
    case 'SESSION_FETCH_OK':
      return {...state, data: action.payload, loading: false};
    default:
      return state;
  }
};


const students = (state = defaultStudentsState, action) => {
  switch (action.type) {
    case 'STUDENTS_FETCH':
      return {...state, loading: true};
    case 'STUDENTS_FETCH_OK':
      return {...state, data: action.payload, loading: false};
    case 'STUDENTS_FETCH_ERR':
      return {...state, error: action.error, loading: false};
    default:
      return state;
  }
};


const table = (state = defaultTableState, action) => {
  switch (action.type) {
    case 'TABLE_SORT':
      return {...state, sort: action.payload};
    case 'TABLE_SEARCH':
      return {...state, search: action.payload};
    default:
      return state;
  }
};

export default {session, students, table};
