import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Editor from "./editor";
import modes from './modes';

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
  expect(container.textContent).toBe("Language"+ modes['javascript']);
});

Object.keys(modes).forEach(mode => {
  it(`renders with the right initial code: ${mode}`, () => {
    act(() => {
      render(<Editor mode={mode}/> , container);
    })
    expect(container.textContent).toBe("Language"+ modes[mode]);
  });
})


/*
  Assert 
*/

// it("Test Code Submission", () => {
//   act(() => {
//     render(<Editor /> , container);
//   })
//   const btn = document.querySelector("submit-btn");
//   expect(container.textContent).toBe();
//   expect(btn.innerHTML).toBe("Submit");

//   act(() => {
//     btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });
//   expect(container.textContent).toContain();
// });