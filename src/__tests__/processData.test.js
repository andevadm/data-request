/*    processData.test.js     */

import { processJSON, processXML } from '../api/processData'

describe("processJSON test", () => {

  test("processJSON returns array from JSON string", () => {
    const correctInput = '[ { "name": "test", "value": 5 } ]';
    const correctOutput = [
      { name: "test", value: 5 }
    ];
    expect(processJSON(correctInput)).toEqual(correctOutput);
  });

  test("processJSON returns empty array from incorrect input", () => {
    const wrongInput = 'Usual string';
    expect(processJSON(wrongInput)).toEqual([]);
  });

});

describe("processXML test", () => {

  test("processXML returns array from XML DOM data", () => {
    const xmlString = 
    `<item id="1">
      <name>
        Name
      </name>
      <image src="test.jpg" />
      <description>
        Description
      </description>
      <density units="g/cm3">
        5
      </density>
    </item>`;
    const xmlDOM = (new DOMParser()).parseFromString(xmlString,"text/xml");
    const correctOutput = [
      {
        id: 1,
        name: "Name",
        image: "test.jpg",
        description: "Description",
        density: 5
      },
    ];
    expect(processXML(xmlDOM)).toEqual(correctOutput);
  });

  test("processXML returns empty array from incorrect input", () => {
    const wrongInput = 'Usual string';
    expect(processXML(wrongInput)).toEqual([]);
  });

});