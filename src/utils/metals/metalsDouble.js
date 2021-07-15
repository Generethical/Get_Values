const parseArray = require('./metallnformation');
const returnArray = require('./metallnformation');
const getTxtValue = require('./metallnformation');
const findUsingDataMiddle = require('./metallnformation');

 function getResultDouble(metal,firstDate,secondDate,callback){
    let resultArray = [];  
    getTxtValue.getTxtValue(metal).then(value=>{
      resultArray = (parseArray.parseArray(returnArray.returnArray(value)));
      const obj = findUsingDataMiddle.findUsingDataMiddle(firstDate,secondDate,()=>{
        return resultArray;
    })
    return callback(obj)
    })
}
  
  module.exports = getResultDouble;