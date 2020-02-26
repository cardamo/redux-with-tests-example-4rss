import _orderBy from "lodash/orderBy";
import {createSelector} from "@reduxjs/toolkit";

export const getFilteredRows = (students, search) => {
  if (!search) {
    return students;
  }

  try {
    const searchRegex = new RegExp(search, 'i'); // no escaping is a feature!
    return students.filter(row => [row.name, row.githubId, row.locationName].find(str => searchRegex.test(str)));
  } catch (e) {
    // ignore filter if regexp is not parsable
    return students;
  }
};

const filterAndSort = (data, search, sort) => {
  return _orderBy(getFilteredRows(data, search), sort[0], sort[1])
};

export const rowsSelector = createSelector(
  state => state.table,
  state => state.students.data,
  ({search, sort}, students) => filterAndSort(students, search, sort)
);
