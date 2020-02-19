import React from 'react';
import {fetchSession, fetchStudents} from "../api/dataApi";
import logo from "../logo.svg";
import _orderBy from 'lodash/orderBy';


export const getFilteredRows = (students, search) => {
  if (!search) {
    return students;
  }

  try {
    const searchRegex = new RegExp(search); // no escaping is a feature!
    return students.filter(row => [row.name, row.githubId, row.locationName].find(str => searchRegex.test(str)));
  } catch (e) {
    // ignore filter if regexp is not parsable
    return students;
  }
};

export default class VanillaTable extends React.PureComponent {

  state = {
    loading: false,
    session: {},
    students: [],
    error: null,
    sort: [],
    search: '',
  };

  componentDidMount() {
    this.setState({loading: true});
    fetchSession()
      .then(session => {
        this.setState({session});
        return fetchStudents(session);
      })
      .then(students => {
        this.setState({students, loading: false})
      })
      .catch(error => this.setState({error, loading: false}))
  }

  handleSearchChange = event => {
    this.setState({search: event.target.value})
  };

  createPropsForTh = column => {
    const [property, direction] = this.state.sort;
    let className = 'sortable ';
    if (property === column) {
      className += direction;
    }

    const nextDirection = property === column && direction === 'asc' ? 'desc' : 'asc';

    return {
      onClick: () => this.setState({sort: [column, nextDirection]}),
      className,
    }
  };

  render() {
    const {loading, session, students, sort, search} = this.state;

    if (loading) {
      return <img src={logo} className="App-logo" alt="logo"/>
    }

    const rowsToRender = _orderBy(getFilteredRows(students, search), sort[0], sort[1]);

    return <div>
      <section>
        Current Session:
        <pre>
          {JSON.stringify(session, null, 2)}
        </pre>
      </section>
      <section>
        <label htmlFor='search'>Search </label>
        <input type='text' value={search} onChange={this.handleSearchChange}/>
      </section>
      <table>
        <thead className='sticky'>
        <tr>
          <th {...this.createPropsForTh('githubId')}>Github ID</th>
          <th {...this.createPropsForTh('locationName')}>Location</th>
          <th {...this.createPropsForTh('active')}>Active</th>
        </tr>
        </thead>
        <tbody>
        {rowsToRender.map(row => <tr key={row.id}>
          <td><a href={`https://github.com/${row.githubId}`}>{row.githubId}</a></td>
          <td>{row.locationName}</td>
          <td>{row.isActive ? 'yes' : 'no'}</td>
        </tr>)}
        </tbody>
      </table>
    </div>
  }
}