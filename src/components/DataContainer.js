/*       DataContainer.js          */
/* layout and state root component */

import React, { useState } from 'react';

import '../styles/DataContainer.scss';
import DataRequest from './DataRequest';
import DataTable from './DataTable';
import DataItem from './DataItem';
import { getFetch, getXMLHttp } from '../api/getData';

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
    );

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
        getXMLHttp(dataPath, extension, stateCallback);
        break;
      case 'Fetch': 
        getFetch(dataPath, extension).then(stateCallback);
        break;
      default:
        console.log('handleRequest: request method is not supported');
    };
    console.log('--- ' + (new Date()).toLocaleTimeString() + ' - New request ---');
    console.log('Selected method: ' + method);
    console.log('Selected data: ' + dataPath);
  }

  // callback setting state according to result of the request
  const stateCallback = (requestResult) => {
    //console.log('stateCallback data: ' + JSON.stringify(requestResult));
    setData(requestResult.data);
    setRequestParameters(requestResult.parameters);
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