/*     DataRequest.test.js     */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import DataRequest from "../components/DataRequest";

// mock request handler with persist() to save click event after dispatch
const handleRequest = jest.fn(event => event.persist());
// prepare options for all select elements as { select.id: 'selected value' }
const userSelect = {
  database: 'materials',
  method: 'XMLHttpRequest',
  extension: 'xml'
};
// preparation of container with rendered component
let container = null;
beforeAll(() => {
  container = document.createElement("div");
  act(() => {
    render(<DataRequest handleRequest={handleRequest} />, container);
  });
  document.body.appendChild(container);
});
afterAll(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("DataRequest renders correctly", () => {
  // form should contain select elements with necessary id
  let selectIDs = Array.from(container.querySelectorAll("select"), element => element.id);
  expect(selectIDs).toEqual(Array.from(Object.keys(userSelect))); // ["database", "method", "extension"]
  // each option value should correspond to option text content
  for (let select of container.querySelectorAll("select")) {
    for (let option of select.children) {
      expect(option.value.toLowerCase()).toMatch(option.textContent.toLowerCase())
    }
  }
  // single request button should be present
  expect(container.querySelector("button").id).toBe("request");
  // snapshot test
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"DataRequest\\">
      <h2>Data Request Form</h2>
      <form><label>Data source:<select id=\\"database\\" readonly=\\"\\" disabled=\\"\\">
            <option value=\\"materials\\">materials</option>
          </select></label><label>Select request method:<select id=\\"method\\">
            <option value=\\"Fetch\\">Fetch</option>
            <option value=\\"XMLHttpRequest\\">XMLHttpRequest</option>
          </select></label><label>Select data extension:<select id=\\"extension\\">
            <option value=\\"json\\">JSON</option>
            <option value=\\"xml\\">XML</option>
          </select></label><label>Press the button to obtain data<button id=\\"request\\">Request</button></label></form>
    </div>"
  `);
});

test("Select elements have correct values after a change event", () => {
  const selectElements = Array.from(container.querySelectorAll("select"));
  act(() => {
    selectElements.forEach(select => {
      if (!select.disabled) {
        select.value = userSelect[select.id];
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    })
  });
  selectElements.forEach(select => {
    expect(select.value).toBe(userSelect[select.id]);
  })
});

test("Request button set correct arguments to the click handler", () => { 
  const button = container.querySelector("#request");
  expect(handleRequest).not.toHaveBeenCalled();
  const requestClick = new MouseEvent("click", { bubbles: true });
  act(() => {
    button.dispatchEvent(requestClick);
  });
  expect(handleRequest).toHaveBeenCalledTimes(1);
  const [obtainedEvent, ...requestParameters] = handleRequest.mock.calls[0];
  expect(requestParameters).toEqual(Object.values(userSelect));
  expect(obtainedEvent.nativeEvent).toEqual(requestClick);
  expect(obtainedEvent.target).toEqual(button);
});
