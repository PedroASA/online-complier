import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Editor from "../editor";
import modes from '../modes';

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

document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = jest.fn();

  range.getClientRects = jest.fn(() => ({
    item: () => null,
    length: 0,
  }));

  return range;
};

/*
  Assumes initial code to be one line long.
*/
 
it("renders with the right initial code", () => {
  act(() => {
    render(<Editor /> , container);
  })
  expect(container.textContent).toContain("Language"+ modes['javascript']);
});

Object.keys(modes).forEach(mode => {
  it(`renders with the right initial code: ${mode}`, () => {
    act(() => {
      render(<Editor mode={mode}/> , container);
    })
    expect(container.textContent).toContain(modes[mode]);
  });
})


it("renders response data", async () => {
  const fakeResponse = {
    language:"javascript",
    env:{
        os:"ubuntu 18.04",
        compiler:"nodejs 14.00"
    },
    stdOut:"Hello World!",
    stdErr:""
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeResponse)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act( async () => {
    render(<Editor mode="javascript"/>, container);
    const btn = document.querySelector("#submit-btn");
    btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelector("#stdout").textContent).toBe(fakeResponse.stdOut);
  expect(container.querySelector("#stderr").textContent).toBe(fakeResponse.stdErr);
  expect(container.querySelector(".nav-item.dropdown").getAttribute('activeKey')).toBe(fakeResponse.language);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});