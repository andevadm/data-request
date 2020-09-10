import React from 'react';

import './DataContainer.scss';
import DataRequest from './DataRequest';
import DataTable from './DataTable';
import DataDetails from './DataDetails';

export default function DataContainer() {
  return (
    <div className="DataContainer">
      <DataRequest />
      <DataTable />
      <DataDetails />
    </div>
  );
}