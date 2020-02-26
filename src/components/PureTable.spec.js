import PureTable, { defaultProps } from "./PureTable";
import {render} from "@testing-library/react";
import React from "react";
import students from "../api/students";


describe('Pure Table', () => {
  test('has no <table /> when loading', () => {
    const rendered = render(<PureTable {...defaultProps} loading={true}/>);
    const tableElem = rendered.container.querySelector('table');
    expect(tableElem).toBeNull();
  });

  test('has <tr /> for every row', () => {
    const rows = students.data.slice(0, 3);
    const rendered = render(<PureTable {...defaultProps} rows={rows}/>);
    const trElems = rendered.container.querySelectorAll('table tbody tr');
    expect(trElems.length).toEqual(rows.length);
  });

  test('status quo', () => {
    const rows = students.data.slice(0, 3);
    const rendered = render(<PureTable {...defaultProps} rows={rows} sort={['isActive', 'desc']} search='qq'/>);
    expect(rendered.container).toMatchSnapshot();
  });
});
