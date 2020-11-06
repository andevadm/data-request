/*     DataItem.test.js     */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import DataItem from "../components/DataItem";

// Test container preparation
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("DataItem renders obtained item correctly", () => {
  const item = {
    id: 1,
    name: "itemName",
    image: "imageFile.jpg",
    description: "itemDescription",
    density: 1.5
  };
  act(() => {
    render(<DataItem item={item} />, container);
  });
  // direct test - content of child elements
  expect(container.querySelector("h2").textContent).toBe("itemName");
  expect(container.querySelector(".item-image img").src).toBe(
    "http://localhost/data/img/imageFile.jpg"
  );
  expect(container.querySelector(".item-description").textContent).toBe(
    "itemDescription"
  );
  expect(container.querySelector(".item-value").textContent).toBe(
    "Density: 1.5\xa0g/cm3"
  );
  // alternative test - snapshot
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"DataItem\\">
      <h2>itemName</h2>
      <div class=\\"item-image\\"><img src=\\"/data/img/imageFile.jpg\\" alt=\\"itemName\\"></div>
      <div class=\\"item-body\\">
        <div class=\\"item-description\\">itemDescription</div>
        <div class=\\"item-value\\">Density:<em> 1.5&nbsp;g/cm<sup>3</sup></em></div>
      </div>
    </div>"
  `);
});

test("DataItem renders item with empty fields correctly", () => {
  const item = {
    id: 1
  };
  act(() => {
    render(<DataItem item={item} />, container);
  });
  // direct test - content of child elements
  expect(container.querySelector("h2").textContent).toBe("No name");
  expect(container.querySelector(".item-image").textContent).toBe("No image");
  expect(container.querySelector(".item-description").textContent).toBe(
    "No description"
  );
  expect(container.querySelector(".item-value").textContent).toBe(
    "Density: no value"
  );
  // alternative test - snapshot
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"DataItem\\">
      <h2>No name</h2>
      <div class=\\"item-image\\">No image</div>
      <div class=\\"item-body\\">
        <div class=\\"item-description\\">No description</div>
        <div class=\\"item-value\\">Density:<em> no value</em></div>
      </div>
    </div>"
  `);
});

test("DataItem without props is rendered correctly", () => {
  act(() => {
    render(<DataItem />, container);
  });
  // direct test - content of child elements
  expect(container.querySelector("h2").textContent).toBe("No item is selected");
  expect(container.querySelector(".item-image")).toBeNull();
  expect(container.querySelector(".item-description")).toBeNull();
  expect(container.querySelector(".item-value")).toBeNull();
  // alternative test - snapshot
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div class=\\"DataItem\\">
      <h2>No item is selected</h2>
    </div>"
  `);
});
