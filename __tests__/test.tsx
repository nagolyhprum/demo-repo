import {
  shallow,
  // mount,
  // render
} from "enzyme";
import React from "react";

import Total from "../src/client/components/total";

describe("App", () => {
  it("works", () => {
    expect(1).toBe(1);
  });
  it("supports react", () => {
    const tag = shallow(
      <Total/>,
    );
    expect(tag).toBe(tag);
  });
});
