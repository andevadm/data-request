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
			      {item.name}
			    </h2>
			    <div className="item-body">
					  <img src={ process.env.PUBLIC_URL + "/data/img/" + item.image } alt={item.name} />
					  <div className="item-description">
					    {item.description}
					  </div>
					  <div className="item-value">
					    Density: <em>{item.density}&nbsp;g/cm<sup>3</sup></em>
					  </div>
					</div>
				</>
	  	}
    </div>
  );
}