const getTxtValueCBRdouble = require('../cbr/cbrInformation');
const resultArrayCBRdouble = require('../cbr/cbrInformation');
const basics = require('../../currecyBasics/basicsRUB');
const getId = require('../cbr/cbrInformation');

function getResultCBRdouble(currency,date1,date2,callback){
  let id = getId.getId(basics,currency);
  getTxtValueCBRdouble.getTxtValueCBRdouble(id,date1,date2,currency).then(value=>{
  const obj = resultArrayCBRdouble.resultArrayCBRdouble(date1,date2,value,currency);
  return callback(obj)
  })
}


module.exports = getResultCBRdouble;