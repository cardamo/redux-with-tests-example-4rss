import React from 'react';
import PureTable from "./PureTable";

import {connect} from 'react-redux'
import actions from '../actions'
import _orderBy from "lodash/orderBy";
import {getFilteredRows} from "./VanillaTable";
import {createSelector} from "@reduxjs/toolkit";

const filterAndSort = (data, search, sort) => {
  return _orderBy(getFilteredRows(data, search), sort[0], sort[1])
};

const rowsSelector = createSelector(
  state => state.table,
  state => state.students.data,
  ({search, sort}, students) => filterAndSort(students, search, sort)
);

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
