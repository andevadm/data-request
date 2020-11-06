/*     DataRequest.js     */
/* request form component */

import React, { useState } from 'react';
import '../styles/DataRequest.scss';

export default function DataRequest({handleRequest}) {

  // state with selected method of request
  const [method, setMethod] = useState('Fetch');
  // state with selected extension of data
  const [extension, setExtension] = useState('json');
  // name of data file without extension
  // only one data source is present, state is not necessary
  const dataSource = 'materials';

  // handler for selecting method of request
  const handleSelectMethod = (event) => setMethod(event.target.value);

  // handler for selecting extension of data
  const handleSelectExtension = (event) => setExtension(event.target.value);

  return (
    <div className="DataRequest">
      <h2>
      	Data Request Form
      </h2>
      <form onSubmit={event => event.preventDefault()}>
        <label>
          Data source:
          <select id="database" value={dataSource} readOnly disabled>
            <option value={dataSource}>{dataSource}</option>
          </select>
        </label>
        <label>
          Select request method:
          <select id="method" value={method} onChange={handleSelectMethod}>
            <option value="Fetch">Fetch</option>
            <option value="XMLHttpRequest">XMLHttpRequest</option>
          </select>
        </label>
        <label>
          Select data extension:
          <select id="extension" value={extension} onChange={handleSelectExtension}>
            <option value="json">JSON</option>
            <option value="xml">XML</option>
          </select>
        </label>
      	<label>
          Press the button to obtain data
      	  <button id="request" onClick={ (event) => handleRequest(event, dataSource, method, extension) }>
            Request
          </button>
        </label>
      </form>
    </div>
  );
}