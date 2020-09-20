import React, { useState } from 'react';

import '../styles/DataContainer.scss';
import DataRequest from './DataRequest';
import DataTable from './DataTable';
import DataItem from './DataItem';

export default function DataContainer() {

  // state with data array from server
  const [data, setData] = useState([]);
  // state with id of selected data item
  const [idSelected, setIdSelected] = useState(-1);
  // state with request parameters:
  const [requestParameters, setRequestParameters] = useState(
      {
        time: 0, // time of data processing from the beginning of request
        method: 'Fetch', // AJAX method
        extension: 'json' // extension of data file on a server
      }
    )

  // get data by XMLHttpRequest from URL in dataPath
  function getXMLHttp(dataPath, extension) {
    let dataString, dataXML;
    const startTime = Date.now();
    try {
      let request = new XMLHttpRequest();
      // old method using onreadystatechange event is selected 
      request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          console.log('XMLHttpRequest is ready');
          switch (extension) {
            case 'json':
              dataString = this.responseText;
              processJSON(dataString);
              break;
            case 'xml':
              dataXML = this.responseXML;
              processXML(dataXML);
              break;
            default:
              console.log('Error in data extension for XMLHttpRequest');
          }        
          setRequestParameters({ 
              time: Date.now() - startTime, 
              method: 'XMLHttpRequest',
              extension: extension 
          });
        }
      }
      request.open("GET", dataPath, true);
      request.send();
    } catch {
      console.log('Error within XMLHttpRequest');
    }
  }

  // get data by Fetch from URL in dataPath
  async function getFetch(dataPath, extension) {
    let dataString, dataXML;
    const startTime = Date.now();
    try {
      let response = await fetch(dataPath);
      if (response.ok) {
        console.log('Fetch response is ready');
        // response.json is not used to apply the same data processing functions for all request methods
        dataString = await response.text();
        switch (extension) {
          case 'json':
            processJSON(dataString);
            break;
          case 'xml':                       
            dataXML = (new DOMParser()).parseFromString(dataString,"text/xml");
            processXML(dataXML);
            break;
          default:
            console.log('Error in data extension for Fetch request');
        }      
        setRequestParameters({ 
            time: Date.now() - startTime, 
            method: 'Fetch',
            extension: extension 
        });
      }
    } catch {
      console.log('Error within Fetch request');
    }
  }

  // get array from JSON string and set data state
  function processJSON(dataString) {
    try {
      setData( JSON.parse(dataString) );
      console.log('JSON data is processed successfully');
    } catch {
      console.log('Error in the obtained JSON data');
    }  
  }

  // get array from XML object and set data state
  function processXML(dataXML) {
    try {
      let dataArray = [];
      for (let item of dataXML.getElementsByTagName("item")) {
        let dataItem = {}; // item of data array
        dataItem.id = +item.getAttribute('id');
        for (let property of item.children) {
          const propertyTag = property.tagName;
          if ( propertyTag === 'image' ) {
            dataItem[propertyTag] = property.getAttribute('src');
            continue;
          }
          dataItem[propertyTag] = property.textContent.trim();
          // transform numeric values to float number type
          if ( !isNaN(dataItem[propertyTag]) ) {
            dataItem[propertyTag] = parseFloat(dataItem[propertyTag]);
          }
        }
        dataArray.push(dataItem);
      }
      setData(dataArray);
      console.log('XML data is processed successfully');
    } catch {
      console.log('Error in the obtained XML data');
    }  
  }

  // handler for a click on request button
  // dataSource - data filename without extension
  // method - AJAX method
  // extension - data file extension
  const handleRequest = (event, dataSource, method, extension) => {
    event.preventDefault(); // prevents page refresh and reset state to initial value
    const dataFileName = dataSource + '.' + extension;
    const dataPath = process.env.PUBLIC_URL + "/data/" + dataFileName;
    switch (method) {
      case 'XMLHttpRequest': 
        getXMLHttp(dataPath, extension); 
        break;
      case 'Fetch': 
        getFetch(dataPath, extension);
        break;
      default:
        console.log('Error in selection of request method');
    };
    console.log('--- ' + (new Date()).toLocaleTimeString() + ' - New request ---');
    console.log('Selected method: ' + method);
    console.log('Selected data: ' + dataFileName);   
  }

  // handler for selecting item in the data table
  const handleSelectItem = (id) => {
    console.log('ID of selected item: ' + id);
    setIdSelected(id);
  }

  return (
    <div className="DataContainer">
      <div className="column left">
        <DataRequest handleRequest={handleRequest} />
      </div>
      <div className="column center">
        <DataTable 
          dataArray={data} 
          requestParameters={requestParameters}
          handleSelect={handleSelectItem}
        />
      </div>
      <div className="column right">
        <DataItem item={data[idSelected-1]} />
      </div>
    </div>
  );
}