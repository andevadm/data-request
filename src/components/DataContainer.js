import React from 'react';

import '../styles/DataContainer.scss';
import DataRequest from './DataRequest';
import DataTable from './DataTable';
import DataDetails from './DataDetails';

export default function DataContainer() {
  return (
    <div className="DataContainer">
      <div className="column left">
        <DataRequest />
      </div>
      <div className="column center">
        <DataTable />
      </div>
      <div className="column right">
        <DataDetails />
      </div>
    </div>
  );
}