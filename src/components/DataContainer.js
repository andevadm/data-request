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
  // state with request parameters
  const [requestParameters, setRequestParameters] = useState(
      {
        time: 0,
        method: 'XMLHttpRequest',
        extension: 'json'
      }
    )

  // get data by XMLHttpRequest
  // now only json format is processed
  function getXMLHttp(filename) {
    const dataPath = process.env.PUBLIC_URL + "/data/" + filename;
    let startTime = Date.now();
    let request = new XMLHttpRequest();
    // console.log(request);
    request.onreadystatechange = function() {
      // let dataObtained = 'XMLHttp readyState: ' + this.readyState;
      // console.log(dataObtained);
      if (this.readyState === 4 && this.status === 200) {
        let dataObtained = this.responseText;
        console.log('Data is obtained by XMLHttpRequest');
        setData( JSON.parse(dataObtained) );
        setRequestParameters({ 
            time: Date.now() - startTime, 
            method: 'XMLHttpRequest',
            extension: requestParameters.extension 
        });
      }
    };
    request.open("GET", dataPath, true);
    request.send();
  }

  // handler for click on request button
  const handleRequest = (event) => {
    event.preventDefault(); // prevents page refresh and reset state to initial value
    getXMLHttp('materials.json');
  }

  // handler for select item in the data table
  const handleSelect = (id) => {
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
          handleSelect={handleSelect}
        />
      </div>
      <div className="column right">
        <DataItem item={data[idSelected-1]} />
      </div>
    </div>
  );
}