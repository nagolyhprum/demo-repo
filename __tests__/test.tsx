import {
  shallow,
  // mount,
  // render
} from "enzyme";
import React from "react";

import Languages from "../src/client/components/languages";

describe("App", () => {
  it("works", () => {
    expect(1).toBe(1);
  });
  it("supports react", () => {
    const tag = shallow(
      <Languages data={[]}/>,
    );
    expect(tag).toBe(tag);
  });
});
