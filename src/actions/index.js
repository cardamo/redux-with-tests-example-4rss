import {fetchSession} from "../api/dataApi";

const actions = {
    // side effects are handled by saga
    fetchStudents: () => ({type: 'STUDENTS_FETCH'}),

    // thunk version of a side effect
    fetchSession: () => (dispatch, getState) => {
      const {session} = getState();
      if (session.data && session.data.githubId) {
        // load session one time
        return;
      }

      dispatch({type: 'SESSION_FETCH'});
      fetchSession().then(
        session => dispatch({type: 'SESSION_FETCH_OK', payload: session}),
        error => dispatch({type: 'SESSION_FETCH_ERR', payload: error}));
    },

    onSort: (property, direction) => ({type: 'TABLE_SORT', payload: [property, direction]}),
    onSearchChange: (search) => ({type: 'TABLE_SEARCH', payload: search}),
  }
;

export default actions;