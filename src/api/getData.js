// getData.js
// get data by different AJAX methods

import { processJSON, processXML } from './processData'

// get data by Fetch from URL in dataPath
// extension - data file extension
export async function getFetch(dataPath, extension) {
  let requestResult = {};
  let dataString, dataXML;
  const startTime = Date.now();
  try {
    let response = await fetch(dataPath);
    if (response.ok) {
      console.log('getFetch: fetch response is ready');
      // response.json is not used to apply the same data processing functions for all request methods
      dataString = await response.text();
      switch (extension) {
        case 'json':
          requestResult.data = processJSON(dataString);
          break;
        case 'xml':                       
          dataXML = (new DOMParser()).parseFromString(dataString,"text/xml");
          requestResult.data = processXML(dataXML);
          break;
        default:
          requestResult.data = [];
          console.log('getFetch: data extension is not supported');
      }
      requestResult.parameters = { 
        time: Date.now() - startTime, 
        method: 'Fetch',
        extension: extension 
      }
      //console.log('Fetch result: ' + JSON.stringify(requestResult));
      return Promise.resolve(requestResult);   
    }
  } catch {
    console.log('getFetch: error within request');
    return Promise.resolve([]);
  }
}

// get data by XMLHttpRequest from URL in dataPath
// extension - data file extension
// stateCallback - callback changing state of the used component
export function getXMLHttp(dataPath, extension, stateCallback) {
  let requestResult = {};
  let dataString, dataXML;
  const startTime = Date.now();
  try {
    let request = new XMLHttpRequest();
    // old method using onreadystatechange event is selected 
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log('getXMLHttp: XMLHttpRequest is ready');
        switch (extension) {
          case 'json':
            dataString = this.responseText;
            requestResult.data = processJSON(dataString);
            break;
          case 'xml':
            dataXML = this.responseXML;
            requestResult.data = processXML(dataXML);
            break;
          default:
            requestResult.data = [];
            console.log('getXMLHttp: data extension is not supported');
        }
        requestResult.parameters = { 
          time: Date.now() - startTime, 
          method: 'XMLHttpRequest',
          extension: extension 
        };
        //console.log('XMLHttpRequest result: ' + JSON.stringify(requestResult));
        stateCallback(requestResult);
      }
    }
    request.open("GET", dataPath, true);
    request.send();
  } catch {
    console.log('getXMLHttp: error within request');
  }
}