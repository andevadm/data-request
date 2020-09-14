import React from 'react';
import '../styles/DataTable.scss';

export default function DataTable() {
  return (
    <div className="DataTable">
      <h2>
        Obtained Data
      </h2>
      <table>
        <tbody>
          <DataTableItem />
        </tbody>        
      </table>
      <div className="request-time">
        Time of data processing
      </div>
    </div>
  );
}

function DataTableItem() {
  return (
    <tr className="DataTableItem">
      <td>#</td>
      <td>Item of Data Table</td>
      <td>Value</td> 
    </tr>
  );
}