/*     DataItem.test.js     */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import { default as DataTable, DataTableItem } from "../components/DataTable";

// prop: test input data
const dataArray = [
  {
    id: 1,
    name: "Item1",
    image: "item1.jpg",
    description: "Description1",
    density: 1,
  },
  {
    id: 2,
    name: "Item2",
    image: "item2.jpg",
    description: "Description2",
    density: 2,
  },
  {
    id: 3,
    name: "Item3",
    image: "item3.jpg",
    description: "Description3",
    density: 3,
  },
];

// prop: parameters of request
const requestParameters = {
  time: 0,
  method: "Fetch",
  extension: "json",
};

// prop: mock select handler
const handleSelect = jest.fn();

// DOM test container
let container = null;

describe("DataTableItem rendering test", () => {

  // Test container preparation
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("DataTableItem renders item correctly", () => {
    const item = dataArray[0];
    act(() => {
      render(
        <table>
          <tbody>
            <DataTableItem item={item} />
          </tbody>
        </table>,
        container
      );
    });
    // item has correct values
    expect(container.querySelector(".item-id").textContent).toMatch(
      item.id.toString()
    );
    expect(container.querySelector(".item-name").textContent).toMatch(item.name);
    // snapshot test
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<table>
        <tbody>
          <tr class=\\"DataTableItem\\">
            <td class=\\"item-id\\">1</td>
            <td class=\\"item-name\\">Item1</td>
          </tr>
        </tbody>
      </table>"
    `);
  });

  test("DataTableItem for noname item renders correctly", () => {
    act(() => {
      render(
        <table>
          <tbody>
            <DataTableItem item={{ id: 1 }} />
          </tbody>
        </table>,
        container
      );
    });
    //  Correct id and 'No name' should be rendered
    expect(container.querySelector("td.item-id").textContent).toMatch("1");
    expect(container.querySelector("td.item-name").textContent).toMatch(
      "No name"
    );
  });

  test("DataTableItem for noid item renders empty fragment", () => {
    act(() => {
      render(<DataTableItem item={{ name: "ItemName" }} />, container);
    });
    // no html should be rendered
    expect(container.innerHTML).toMatch("");
  });

  test("DataTableItem without props renders empty fragment", () => {
    act(() => {
      render(<DataTableItem />, container);
    });
    // no html should be rendered
    expect(container.innerHTML).toMatch("");
  });

});

describe("DataTable rendering test", () => {

  // Test container preparation
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("DataTable renders data array correctly", () => {
    act(() => {
      render(
        <DataTable
          dataArray={dataArray}
          requestParameters={requestParameters}
          handleSelect={handleSelect}
        />,
        container
      );
    });
    // data table should contain correct number of rows
    const tableRows = container.querySelectorAll("table tr");
    expect(tableRows.length).toBe(dataArray.length);
    // table cells should contain correct data from dataArray
    for (let i = 0; i < dataArray.length; i++) {
      expect(tableRows[i].querySelector(".item-id").textContent).toMatch(
        dataArray[i].id.toString()
      );
      expect(tableRows[i].querySelector(".item-name").textContent).toMatch(
        dataArray[i].name
      );
    }
    // request-parameters block should have correct values from requestParameters
    const requestParametersBlock = container.querySelector(".request-parameters");
    expect(
      requestParametersBlock.querySelector(".request-parameters-time em")
        .textContent
    ).toMatch(requestParameters.time + "\xa0ms");
    expect(
      requestParametersBlock.querySelector(".request-parameters-method em")
        .textContent
    ).toMatch(requestParameters.method);
    expect(
      requestParametersBlock.querySelector(".request-parameters-extension em")
        .textContent
    ).toMatch(requestParameters.extension);
    // snapshot test
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"DataTable\\">
        <h2>Obtained Data</h2>
        <table>
          <tbody>
            <tr class=\\"DataTableItem\\">
              <td class=\\"item-id\\">1</td>
              <td class=\\"item-name\\">Item1</td>
            </tr>
            <tr class=\\"DataTableItem\\">
              <td class=\\"item-id\\">2</td>
              <td class=\\"item-name\\">Item2</td>
            </tr>
            <tr class=\\"DataTableItem\\">
              <td class=\\"item-id\\">3</td>
              <td class=\\"item-name\\">Item3</td>
            </tr>
          </tbody>
        </table>
        <div class=\\"request-parameters\\">
          <p class=\\"request-parameters-method\\">Get method: <em>Fetch</em></p>
          <p class=\\"request-parameters-extension\\">Data extension: <em style=\\"text-transform: uppercase;\\"> json</em></p>
          <p class=\\"request-parameters-time\\">Time of data processing: <em>0&nbsp;ms</em></p>
        </div>
      </div>"
    `);
  });

  test("DataTable renders empty array as a header only", () => {
    act(() => {
      render(
        <DataTable
          dataArray={[]}
          requestParameters={requestParameters}
          handleSelect={handleSelect}
        />,
        container
      );
    });
    // Only header for no data is present
    expect(container.querySelector(".DataTable").children.length).toBe(1);
    expect(container.querySelector(".DataTable").children[0].tagName).toBe("H2");
    // snapshot test
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"DataTable\\">
        <h2>Data is not obtained</h2>
      </div>"
    `);
  });
  
  test("DataTable without props renders a header only", () => {
    act(() => {
      render(<DataTable />, container);
    });
    // Only header for no data is present
    expect(container.querySelector(".DataTable").children.length).toBe(1);
    expect(container.querySelector(".DataTable").children[0].tagName).toBe("H2");
    // snapshot test
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"DataTable\\">
        <h2>Data is not obtained</h2>
      </div>"
    `);
  });

  test("DataTable request-parameters block renders correctly with the empty object prop", () => {
    act(() => {
      render(
        <DataTable
          dataArray={dataArray}
          requestParameters={{}}
          handleSelect={handleSelect}
        />,
        container
      );
    });
    // request-parameters values should contain corresponding notifications
    const requestParametersBlock = container.querySelector(".request-parameters");
    expect(requestParametersBlock.children.length).toBe(3);
    expect(
      requestParametersBlock.querySelector(".request-parameters-time em")
        .textContent
    ).toMatch("0\xa0ms");
    expect(
      requestParametersBlock.querySelector(".request-parameters-method em")
        .textContent
    ).toMatch("Unknown");
    expect(
      requestParametersBlock.querySelector(".request-parameters-extension em")
        .textContent
    ).toMatch("Unknown");
    // snapshot test
    expect(pretty(requestParametersBlock.innerHTML)).toMatchInlineSnapshot(`
      "<p class=\\"request-parameters-method\\">Get method: <em>Unknown</em></p>
      <p class=\\"request-parameters-extension\\">Data extension: <em style=\\"text-transform: uppercase;\\"> Unknown</em></p>
      <p class=\\"request-parameters-time\\">Time of data processing: <em>0&nbsp;ms</em></p>"
    `);
  });
  
  test("DataTable request-parameters block renders correctly without the prop", () => {
    act(() => {
      render(
        <DataTable dataArray={dataArray} handleSelect={handleSelect} />,
        container
      );
    });
    // request-parameters block should contain only one paragraph with notification
    const requestParametersBlock = container.querySelector(".request-parameters");
    expect(requestParametersBlock.children.length).toBe(1);
    // snapshot test
    expect(pretty(requestParametersBlock.innerHTML)).toMatchInlineSnapshot(
      `"<p>Request parameters are unknown</p>"`
    );
  });

});

describe("Selection handler test", () => {

  // variables for a table row element and click event
  let firstRow, selectClick;

  // Test container preparation and DataTable rendering
  beforeAll(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      render(
        <DataTable
          dataArray={dataArray}
          requestParameters={requestParameters}
          handleSelect={handleSelect}
        />,
        container
      );
    });
    firstRow = container.querySelector('tr');
    selectClick = new MouseEvent("click", { bubbles: true });
  });
  afterAll(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("First click on a table cell - add highlight and set correct id argument to the handler", () => {
    expect(handleSelect).not.toHaveBeenCalled();
    act(() => {
      firstRow.lastChild.dispatchEvent(selectClick);
    });
    expect(firstRow.classList).toContain("selected");
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(+firstRow.firstChild.textContent);
  });

  test("Second click on the same table cell - remove highlight and set argument -1 to the handler", () => {
    // second click on the same table cell - remove highlight and set argument -1 to handler
    act(() => {
      firstRow.lastChild.dispatchEvent(selectClick);
    });
    expect(firstRow.classList).not.toContain("selected");
    expect(handleSelect).toHaveBeenCalledTimes(2);
    expect(handleSelect).toHaveBeenCalledWith(-1);
  });

  test("Third click on the other cell of the same row - add highlight and set correct id argument to the handler", () => {
    // third click on other cell of the same row - add highlight and set correct id argument to handler
    act(() => {
      firstRow.firstChild.dispatchEvent(selectClick);
    });
    expect(firstRow.classList).toContain("selected");
    expect(handleSelect).toHaveBeenCalledTimes(3);
    expect(handleSelect).toHaveBeenCalledWith(+firstRow.firstChild.textContent);
  });

  test("Fourth click on the next row - move highlight and set correct id argument to the handler", () => {
    // fourth click on the next row - move highlight and set correct id argument to handler
    act(() => {
      firstRow.nextElementSibling.lastChild.dispatchEvent(selectClick);
    });
    expect(firstRow.classList).not.toContain("selected");
    expect(firstRow.nextElementSibling.classList).toContain("selected");
    expect(handleSelect).toHaveBeenCalledTimes(4);
    expect(handleSelect).toHaveBeenCalledWith(+firstRow.nextElementSibling.firstChild.textContent);
  });

  test("Fifth click out of the table - no action", () => {
    // fifth click out of the table - no action
    act(() => {
      container.querySelector(".request-parameters").dispatchEvent(selectClick);
    });
    expect(firstRow.nextElementSibling.classList).toContain("selected");
    expect(handleSelect).toHaveBeenCalledTimes(4);
  });

});
