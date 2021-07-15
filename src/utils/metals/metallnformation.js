const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

let getTxtValue = (metal=>{
    const link = 'https://www.westmetall.com/en/markdaten.php?action=table&field=LME_'+encodeURIComponent(metal)+'_cash'
    return axios.get(link)
          .then((response) => { 
            const $ = cheerio.load(response.data);
              return $('tbody').text()
              });
  })

  let parseArray = (array)=>{
    let newArray = [];
    array.forEach(item=>{
        let obj = {
            date:parseData(item.date),
            LME_Cash_Settlement:Number(item.LME_Cash_Settlement.replace(/,/g,'')),
            LME_3_month:Number(item.LME_3_month.replace(/,/g,''))
        }
        newArray.unshift(obj);
    })
    return newArray;
  }

  function parseData(date){
    var day = moment(date,"DD-MMM-YYYY");
    var newDay = moment(day).format("YYYY-MM-DD"); 
    return newDay;
  }

  let returnArray = (text)=>{
    return sort(text.split('\n').filter((item)=>{
      if(isNaN(Number.parseInt(item.substring(0,1)))===false) {
             return item;
    }
  }))
}

function sort(arrayData){
  let finalArray = [];
  for(i=0;i<arrayData.length;){
    let obj = {date:arrayData[i],
        LME_Cash_Settlement:arrayData[i+1],
        LME_3_month:arrayData[i+2]}
    finalArray.push(obj);
    i = i+4
  }
  return finalArray;
}

function findUsingDataMiddle(date1,date2,callback){
    let arrayWork = callback();

    let values_Cash_Settlement = [];
    let values_LME_3_month = [];
  
    let sum_Cash_Settlement = 0;
    let result_Cash_Settlement = 0;
  
    let sum_LME_3_month = 0;
    let result_LME_3_month = 0;
    arrayWork.forEach(item=>{
      if(item.date>=date1 && item.date<=date2){
  
      values_Cash_Settlement.unshift(item.LME_Cash_Settlement)
      values_LME_3_month.unshift(item.LME_3_month)  
      }
    })
    for (i=0;i< values_Cash_Settlement.length;i++) {
      sum_Cash_Settlement +=  values_Cash_Settlement[i];
    }

    result_Cash_Settlement = (sum_Cash_Settlement/values_Cash_Settlement.length).toFixed(2);
   
    for (i=0;i< values_LME_3_month.length;i++) {
        sum_LME_3_month +=  values_LME_3_month[i];
      }
    result_LME_3_month = (sum_LME_3_month/values_LME_3_month.length).toFixed(2);
  
      const obj = {
          date:date1+" - "+date2,
          LME_Cash_Settlement:result_Cash_Settlement,
          LME_3_month:result_LME_3_month
      }
      return obj;
  }

  function findUsingData(array,date){
    let obj = {};
    array.filter(item=>{
      if(date===item.date){
        obj = item;
      }
    })
    return obj;
  }

  module.exports.getTxtValue = getTxtValue;
  module.exports.findUsingDataMiddle = findUsingDataMiddle;
  module.exports.findUsingData = findUsingData;
  module.exports.returnArray = returnArray;
  module.exports.parseArray = parseArray;