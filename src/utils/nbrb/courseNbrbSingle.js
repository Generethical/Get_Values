const getTxtValueNbrbSingle = require('./nbrbInformation');
const resultArrayNbrbSinge = require('./nbrbInformation');
const basics = require('../../currecyBasics/basicsBYN');
const getId = require('./nbrbInformation');


function getResultNbrbSingle(currency,date1,callback){
let id = getId.getId(basics,currency);
getTxtValueNbrbSingle.getTxtValueNbrbSingle(id,date1).then(value=>{
  const obj = resultArrayNbrbSinge.resultArrayNbrbSinge(value);
  return callback(obj)
  })
}

module.exports = getResultNbrbSingle;