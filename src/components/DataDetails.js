import React from 'react';
import '../styles/DataDetails.scss';

export default function DataDetails() {
  return (
    <div className="DataDetails">
      <h2>
      	Item Name
      </h2>
      <div className="item-body">
	      <img src="" alt="Item Image" />
	      <div className="item-description">
	        Description of the selected item
	      </div>
	      <div className="item-value">
	        Value
	      </div>
	  </div>
    </div>
  );
}