import { shallow } from "enzyme";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import UserCard from "../UserCard";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

let testUser1 = {
    id: 1,
    name: "admin",
    email: "admin@gmail.com",
    role: "ADMIN",
    origin: "INTERNAL"
}

it("should render initial layout", () => {
  const component = shallow(<UserCard user={testUser1}/>);
  expect(component.getElements()).toMatchSnapshot();
});