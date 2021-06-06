/*
    Unitary tests for the components in file.js.
    Note: Test are not cleaned up after executed.
*/

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {FileList, File} from '../files';

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

// Assert the initial message on the editor is the javascript one.
it("renders all files correctly", async () => {

    const fakeResponse = [{title:"DELETETEST",lang:"TEST",content:"TEST",last_updated_at:"2021-05-23T02:41:14.609322Z"},{title:"UPDATETEST",lang:"TEST",content:"NEW content",last_updated_at:"2021-05-23T02:41:48.785534Z"},{title:"",lang:"",content:"",last_updated_at:"2021-05-24T00:43:33.467206Z"},{title:"READTEST",lang:"TEST_LANG",content:"NEWWWWWWW CONTEneredsa",last_updated_at:"2021-05-24T22:53:09.041564Z"}];
      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(fakeResponse)
        })
      );

    await act( async () => {
        render(<FileList />, container);
    });
    expect(container.textContent).toContain('DELETETEST');
  });
  