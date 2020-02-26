import React from 'react';
import {connect} from 'react-redux'
import actions from '../actions'
import PureTable from "./PureTable";
import {rowsSelector} from "../store/selectors";

const mapStateToProps = (state) => {
  let {search, sort} = state.table;
  return {
    session: state.session.data,
    loading: state.session.loading || state.students.loading,
    error: state.session.error || state.students.error,
    rows: rowsSelector(state),
    search, sort,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      dispatch(actions.fetchSession());
      dispatch(actions.fetchStudents());
    },
    onSearchChange: (search) => dispatch({type: 'TABLE_SEARCH', payload: search}),
    onSort: (property, direction) => dispatch(actions.onSort(property, direction)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(PureTable);
