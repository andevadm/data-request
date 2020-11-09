/*   DataTable.js   */
/* component with obtained data and parameters of response */

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
        (!dataArray || dataArray.length === 0) ? 
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
              {
                (!requestParameters || typeof requestParameters !== 'object') ? 
                  <p>Request parameters are unknown</p> :
                  <>
                    <p className="request-parameters-method">
                      Get method: <em>{ requestParameters.method || 'Unknown'}</em>
                    </p>
                    <p className="request-parameters-extension">
                      Data extension: <em style={{ textTransform: 'uppercase' }}> { requestParameters.extension || 'Unknown'}</em>
                    </p>
                    <p className="request-parameters-time">
                      Time of data processing: <em>{ requestParameters.time || '0'}&nbsp;ms</em>
                    </p>
                  </>
              }
            </div>
          </>
      }
    </div>
  );
}

/* component with the table item */
export function DataTableItem({item}) {
  if (item && item.id) {
    return (
      <tr className="DataTableItem">
        <td className="item-id">{item.id}</td>
        <td className="item-name">{item.name || "No name"}</td>
      </tr>
    )
  } else {
    console.log('Item of DataTable is empty or has no id');
    return (<></>)
  }
}