/*     DataItem.js     */
/* component with information about selected item in DataTable */

import React from 'react';
import '../styles/DataItem.scss';

export default function DataItem({item}) {
  return (
    <div className="DataItem">
      {
      	(!item) ?
      	<h2>No item is selected</h2> :
      	<>
			    <h2>
			      {item.name || "No name"}
			    </h2>
			    <div className="item-image">
						{ 
							(item.image) ?
							<img src={ process.env.PUBLIC_URL + "/data/img/" + item.image } alt={item.name} /> :
							"No image"
						}
					</div>
					<div className="item-body">
					  <div className="item-description">
					    {item.description || "No description"}
					  </div>
					  <div className="item-value">
					    Density:  
								{ 
									(item.density) ?
									<em> {item.density}&nbsp;g/cm<sup>3</sup></em> :
									<em> no value</em>
								}
					  </div>
					</div>
				</>
	  	}
    </div>
  );
}