import React from 'react';
import PureTable, {defaultProps} from "../components/PureTable";
import '../App'
import students from "../api/students";

export default {
  title: 'PureTable',
  component: PureTable,
};

export const Loading = () => <PureTable loading={true}/>;
export const NoDataSortAsc = () => <PureTable {...defaultProps} sort={['locationName', 'asc']}/>;
export const WithDataSortDesc = () => <PureTable {...defaultProps} rows={students.data.slice(0, 5)} sort={['githubId', 'desc']} />;
