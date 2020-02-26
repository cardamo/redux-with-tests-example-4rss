import {combineReducers, createStore} from "redux";
import reducers from '../reducers'
import actions from '../actions'
import {rowsSelector} from "./selectors";

import students, { makeFake } from '../api/students'

let store;
beforeEach(() => {
  store = createStore(combineReducers(reducers))
});

describe('Selectors', () => {
  describe('Table Rows', () => {
    test('no rows in default state', () => {
      const rows = rowsSelector(store.getState());
      expect(rows).toEqual([])
    });

    test('original rows w/o search and sort', () => {
      const originalRows = students.data;
      store.dispatch({type: 'STUDENTS_FETCH_OK', payload: originalRows});
      const rows = rowsSelector(store.getState());
      expect(rows)
    });

    describe('Search', () => {
      test('is applied to name', () => {
        const mismatch = {...makeFake(1), name: 'Petr Marks'};
        const match = {...makeFake(2), name: 'Feodor Franz'};
        store.dispatch({type: 'STUDENTS_FETCH_OK', payload: [match, mismatch]});

        store.dispatch(actions.onSearchChange('ran'));
        const rows = rowsSelector(store.getState());
        expect(rows).toEqual([match]);
      });

      test('is case-insensitive', () => {
        const mismatch = {...makeFake(1), name: 'Petr Marks'};
        const match = {...makeFake(2), name: 'Feodor Franz'};
        store.dispatch({type: 'STUDENTS_FETCH_OK', payload: [match, mismatch]});

        store.dispatch(actions.onSearchChange('feo'));
        const rows = rowsSelector(store.getState());
        expect(rows).toEqual([match]);
      });

      test.skip('is applied to location', () => {});
      test.skip('supports regular expressions', () => {});
      test.skip('falls back to the previous search in case of invalid regex', () => {});
    });

    // describe('Sorting', () => {
    // });
  })
});
