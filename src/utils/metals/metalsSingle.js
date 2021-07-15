const parseArray = require('./metallnformation');
const returnArray = require('./metallnformation');
const getTxtValue = require('./metallnformation');
const findUsingData = require('./metallnformation');

function getResultSingle(metal,date,callback){
  let resultArray = [];
  getTxtValue.getTxtValue(metal).then(value=>{
  resultArray = (parseArray.parseArray(returnArray.returnArray(value)));
  const obj = findUsingData.findUsingData(resultArray,date)
  return callback(obj)
  })
}

module.exports = getResultSingle;