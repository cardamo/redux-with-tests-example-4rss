import {render} from "@testing-library/react";
import VanillaTable from "../VanillaTable";
import React from "react";

it('Vanilla Table', () => {
  const rendered = render(<VanillaTable />);
  expect(rendered.container).toMatchSnapshot();
});
