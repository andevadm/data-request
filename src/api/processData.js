// processData.js
// transforms different data formats to array with objects

// get array from JSON string 
export function processJSON(dataString) {
  try {
    return JSON.parse(dataString);
  } catch {
    console.log('processJSON: error in the obtained JSON data');
    return [];
  }  
}

// get array from XML object
export function processXML(dataXML) {
  try {
    let dataArray = [];
    for (let item of dataXML.getElementsByTagName("item")) {
      let dataItem = {}; // item of data array
      dataItem.id = +item.getAttribute('id');
      for (let property of item.children) {
        const propertyTag = property.tagName;
        if ( propertyTag === 'image' ) {
          dataItem[propertyTag] = property.getAttribute('src');
          continue;
        }
        dataItem[propertyTag] = property.textContent.trim();
        // transform numeric values to float number type
        if ( !isNaN(dataItem[propertyTag]) ) {
          dataItem[propertyTag] = parseFloat(dataItem[propertyTag]);
        }
      }
      dataArray.push(dataItem);
    }
    return dataArray;
  } catch {
    console.log('processXML: error in the obtained XML data');
    return [];
  }  
}