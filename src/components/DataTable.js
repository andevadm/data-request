/*   DataTable.js   */
/* component with obtained data and parameters of response */
/* component with table item */

import React from 'react';
import '../styles/DataTable.scss';

export default function DataTable({dataArray, requestParameters, handleSelect}) {

  // handler for click on the table
  const handleClick = (event) => {
    let idSelected;
    if ( event.target.tagName === 'TD' ) {
      const rowSelected = event.target.parentNode;
      const previousSelected = rowSelected.parentNode.getElementsByClassName('selected')[0];
      // remove previous selection
      if ( previousSelected ) {
        previousSelected.classList.remove("selected");
      }
      // add new selection
      if ( rowSelected !== previousSelected ) {
        rowSelected.classList.add("selected");
        idSelected = +rowSelected.firstChild.textContent;
      // or remove current selection
      } else {
        idSelected = -1;
      }
      // process data item
      handleSelect(idSelected);
    }
  }

  return (
    <div className="DataTable">
      {
        (dataArray.length === 0) ? 
          <h2>Data is not obtained</h2> :
          <>
            <h2>
              Obtained Data
            </h2>       
            <table onClick={handleClick}>
              <tbody>
                {
                  dataArray.map( (item) =>
                    <DataTableItem key={item.id} item={item} />
                  )
                }
              </tbody>        
            </table>
            <div className="request-parameters">
              <p>
                Get method: <em>{requestParameters.method}</em>
              </p>
              <p>
                Data extension: <em style={{ textTransform: 'uppercase' }}>{requestParameters.extension}</em>
              </p>
              <p>
                Time of data processing: <em>{requestParameters.time}&nbsp;ms</em>
              </p>
            </div>
          </>
      }
    </div>
  );
}

function DataTableItem({item}) {
  return (
    <tr className="DataTableItem">
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>
  );
}