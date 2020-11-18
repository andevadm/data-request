/*   getData.test.js   */

import { getFetch, getXMLHttp } from '../api/getData'

const dataStringJSON = `[
  {
    "id": 1,
    "name": "Name",
    "image": "test.jpg",
    "description": "Description",
    "density": 5
  }
]`;
const dataStringXML = 
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
const dataArray = JSON.parse(dataStringJSON);


describe("getXMLHttp test", () => {

  const spyDataPath = "/testpath";

  // spy XMLHttpRequest constructor
  function XMLHttpRequestMock() {
    this.open = jest.fn();
    this.onreadystatechange = jest.fn();
    this.send = jest.fn(() => this.onreadystatechange());
    this.readyState = 4;
    this.status = 200;
    this.responseText = dataStringJSON;
    this.responseXML = (new DOMParser()).parseFromString(dataStringXML,"text/xml");
  }

  jest.spyOn(window, "XMLHttpRequest").mockImplementation(XMLHttpRequestMock);

  afterEach(() => {
    window.XMLHttpRequest.mockClear();
  });

  for (let extension of [ 'json', 'xml' ]) {
    test(`getXMLHttp works correctly with ${extension} extension`, done => {
      function stateCallback(requestResult) {  
        try {   
          expect(requestResult.data).toEqual(dataArray);
          expect(requestResult.parameters.method).toBe('XMLHttpRequest');
          expect(requestResult.parameters.extension).toBe(extension);
          expect(Number.isInteger(requestResult.parameters.time)).toBeTruthy();
          done();
        } catch (error) {
          done(error);
        }
      }
      expect(window.XMLHttpRequest).not.toHaveBeenCalled();
      getXMLHttp(spyDataPath, extension, stateCallback);
      expect(window.XMLHttpRequest).toHaveBeenCalledTimes(1);
    });
  }

  test("getFetch works correctly with unsupported extension", done => {
    const extension = 'unsupported';
    function stateCallback(requestResult) {  
      try { 
        expect(requestResult.data).toEqual([]);
        done();
      } catch (error) {
        done(error);
      }
    }
    expect(window.XMLHttpRequest).not.toHaveBeenCalled();
    getXMLHttp(spyDataPath, extension, stateCallback);
    expect(window.XMLHttpRequest).toHaveBeenCalledTimes(1);
  });

});

describe("getFetch test", () => {

  // spy fetch receives extension except of dataPath
  function fetchMock(extension) {
    let dataString;
    switch (extension) {
      case 'json':
        dataString = dataStringJSON;
        break;
      case 'xml':                       
        dataString = dataStringXML;
        break;
      default:
        dataString = 'fetchSpy: unknown file extension';
    }
    const fetchResponse = {
      ok: true,
      text: () => Promise.resolve(dataString)
    };
    return Promise.resolve(fetchResponse);
  }

  jest.spyOn(window, "fetch").mockImplementation(fetchMock);

  afterEach(() => {
    window.fetch.mockClear();
  });

  for (let extension of [ 'json', 'xml' ]) {
    test(`getFetch works correctly with ${extension} extension`, () => {
      const spyDataPath = extension;
      return getFetch(spyDataPath, extension).then( requestResult => {
        expect(window.fetch).toHaveBeenCalledWith(spyDataPath);
        expect(requestResult.data).toEqual(dataArray);
        expect(requestResult.parameters.method).toBe('Fetch');
        expect(requestResult.parameters.extension).toBe(extension);
        expect(Number.isInteger(requestResult.parameters.time)).toBeTruthy();
      });    
    });
  }

  test("getFetch works correctly with unsupported extension", () => {
    const extension = 'unsupported';
    const spyDataPath = extension;
    return getFetch(spyDataPath, extension).then( requestResult => {
      expect(requestResult.data).toEqual([]);
    });    
  });

});