import reducers from './index'

describe('Table Reducer', () => {

  const reduceTable = reducers.table;

  test('Sort Action', () => {
    let result = reduceTable(undefined, {type: 'TABLE_SORT', payload: ['isActive', 'desc']});
    expect(result.sort).toEqual(['isActive', 'desc']);
  })
});