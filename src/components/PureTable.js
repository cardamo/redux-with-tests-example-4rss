import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import logo from "../logo.svg";


const PureTable = props => {
    const {loading, session, sort, search, rows, onSearchChange, onSort, onMount} = props;

    useEffect(() => onMount(), [onMount]);

    if (loading) {
      return <img src={logo} className="App-logo" alt="logo"/>
    }

    const createPropsForTh = (column) => {
      const [property, direction] = sort;
      let className = 'sortable ';
      if (property === column) {
        className += direction;
      }

      const nextDirection = property === column && direction === 'asc' ? 'desc' : 'asc';

      return {
        onClick: () => onSort(column, nextDirection),
        className,
      }
    };

    return <div>
      <section>
        Current Session:
        <pre>
          {JSON.stringify(session, null, 2)}
        </pre>
      </section>
      <section>
        <label htmlFor='search'>Search </label>
        <input type='text' value={search} onChange={e => onSearchChange(e.target.value)}/>
      </section>
      <table>
        <thead className='sticky'>
        <tr>
          <th {...createPropsForTh('githubId', sort)}>Github ID</th>
          <th {...createPropsForTh('locationName', sort)}>Location</th>
          <th {...createPropsForTh('isActive', sort)}>Active</th>
        </tr>
        </thead>
        <tbody>
        {rows.map(row => <tr key={row.id}>
          <td><a href={`https://github.com/${row.githubId}`}>{row.githubId}</a></td>
          <td>{row.locationName}</td>
          <td>{row.isActive ? 'yes' : 'no'}</td>
        </tr>)}
        </tbody>
      </table>
    </div>
};

PureTable.propTypes = {
  loading: PropTypes.bool,
  session: PropTypes.object,
  sort: PropTypes.array,
  search: PropTypes.string,
  rows: PropTypes.array,
  onSearchChange: PropTypes.func,
  onSort: PropTypes.func,
  onMount: PropTypes.func,
};

export const defaultProps = {
  loading: false,
  search: '',
  sort: [],
  rows: [],
  onSort: () => {},
  onMount: () => {},
  onSearchChange: () => {},
};

export default PureTable;