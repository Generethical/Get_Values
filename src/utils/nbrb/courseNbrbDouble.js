const getTxtValueNbrbDouble = require('./nbrbInformation');
const resultArrayNbrbDouble = require('./nbrbInformation');
const basics = require('../../currecyBasics/basicsBYN');
const getId = require('./nbrbInformation');


function getResultNbrbDouble(currency,date1,date2,callback){
    let id = getId.getId(basics,currency);
    getTxtValueNbrbDouble.getTxtValueNbrbDouble(id,date1,date2).then(value=>{
      const obj = resultArrayNbrbDouble.resultArrayNbrbDouble(value,date1,date2);
      return callback(obj)
      })
    }
    
module.exports = getResultNbrbDouble;