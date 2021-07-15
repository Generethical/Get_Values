const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const basics = require('../../currecyBasics/basicsBYN');

const getTxtValueNbrbSingle = ((currency,date1)=>{
    const link = 'https://www.nbrb.by/api/exrates/rates/'+encodeURIComponent(currency)+'?ondate='+encodeURIComponent(date1);
    return axios.get(link)
          .then((response) => { 
            const $ = cheerio.load(response.data);
              return response.data 
    });
  })

  const getTxtValueNbrbDouble = ((currency,date1,date2)=>{
    const link = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/'+encodeURIComponent(currency)+'?startDate='+encodeURIComponent(date1)+'&endDate='+encodeURIComponent(date2);
    return axios.get(link)
          .then((response) => { 
            const $ = cheerio.load(response.data);
              return response.data 
    });
  })


const getId = function(array,currency){
    let id = "";
    array.forEach(item=>{
      if(item.Name === currency)
      {
        id = item.ID;
      }
    })
    return id;
  }

  const getName = function(array,id){
    let currency = "";
    array.forEach(item=>{
      if(item.ID === id)
      {
        currency = item.Name;
      }
    })
    return currency;
  }

  function parseData(date){
    var day = moment(date,"YYYY-MM-DD");
    var newDay = moment(day).format("DD-MM-YYYY"); 
    return newDay;
  }

  const resultArrayNbrbSinge = function(jsonValue){
        return{
            date:parseData(jsonValue.Date),
            name:jsonValue.Cur_Abbreviation,
            value:jsonValue.Cur_OfficialRate
        }
  }

  const resultArrayNbrbDouble = function(jsonValue,date1,date2){
    let arrayOfCourses = [];
    let Value = 0;
    let id = 0;
    let arrayOfValues = [];
    jsonValue.forEach(item=>{
      arrayOfCourses.unshift(item.Cur_OfficialRate)
      id = item.Cur_ID;
      arrayOfValues.unshift(parseData(item.Date)+" "+item.Cur_OfficialRate)
    })
    arrayOfCourses.forEach(item=>{
      Value = Value + item;
    })
     return{
        date:"The average course in range "+date1+" - "+date2,
        name: getName(basics,id),
        value:`Average course: ${(Value/arrayOfCourses.length).toFixed(3)}`,
        values: arrayOfValues
    }
}


  module.exports.getTxtValueNbrbSingle = getTxtValueNbrbSingle;
  module.exports.getId = getId;
  module.exports.resultArrayNbrbSinge = resultArrayNbrbSinge;
  module.exports.getTxtValueNbrbDouble = getTxtValueNbrbDouble;
  module.exports.resultArrayNbrbDouble = resultArrayNbrbDouble;