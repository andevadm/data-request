import React from 'react';
import '../styles/DataRequest.scss';

export default function DataRequest() {
  return (
    <div className="DataRequest">
      <h2>
      	Data Request Form
      </h2>
      <form>
      	<label htmlFor="request">Press the button to obtain data</label>
      	<button id="request">Request</button>
      </form>
    </div>
  );
}