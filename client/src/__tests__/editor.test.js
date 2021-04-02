/*
    Unitary tests to the Editor Component.
*/

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Editor from "../editor";


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

// Avoid some bug with jest and create-react-app or codeMirror.
document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = jest.fn();

  range.getClientRects = jest.fn(() => ({
    item: () => null,
    length: 0,
  }));

  return range;
};

// Assert the initial message on the editor is the javascript one.
it("renders with the right initial code", () => {
  act(() => {
    render(<Editor /> , container);
  })
  expect(container.textContent).toContain('// Type your code here!');
});

/* 
  Assert MyTabs renders the right texts after
  receving the mocked response as a code submission response.
*/
it("renders response data", async () => {

  const fakeResponse = {
    language:"javascript",
    env:{
        os:"ubuntu 18.04",
        compiler:"nodejs 12.00"
    },
    stdOut:"Hello",
    stdErr:""
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeResponse)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act( async () => {
    render(<Editor />, container);
    const btn = document.querySelector("#submit-btn");
    btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const tabs = container.querySelectorAll(".nav-item.nav-link");
  expect(tabs[0].classList).toContain('active');
  expect(container.querySelector("#stdout").value).toBe(fakeResponse.stdOut);
  expect(tabs[1].classList).not.toContain('disabled');
  expect(container.querySelector("#stderr").value).toBe(fakeResponse.stdErr);
  expect(tabs[2].classList).toContain('disabled');
  expect(container.querySelector(".nav-item.dropdown").getAttribute('activeKey')).toBe(fakeResponse.language);

  tabs[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(tabs[1].classList).toContain('active');

  tabs[2].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(tabs[2].classList).not.toContain('active');

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});