const axios = require('axios');
const cheerio = require('cheerio');

const getTxtValueCBRdouble = ((currency,date1,date2)=>{
    if(date2==='//'){
    date2=date1
    }
    const link = 'http://cbr.ru/scripts/XML_dynamic.asp?date_req1='+encodeURIComponent(date1)+'&'+'date_req2='+encodeURIComponent(date2)+'&VAL_NM_RQ='+encodeURIComponent(currency);
    return axios.get(link)
          .then((response) => { 
            const $ = cheerio.load(response.data);
              return response.data 
    });
  })
  
  const resultArrayCBRdouble = ((date1,date2,array,currencyName)=>{
    if(date2==='//'){
      date2=date1
      }
    let finalArray = [];
    const newArray = array.split('Date=');
    newArray.splice(0,1);
    newArray.forEach(item=>{
      let indexCourse = item.indexOf("<Value>");
      let indexDate = item.indexOf('"');
      finalArray.unshift({
          date:item.substring(indexDate+1,indexDate+11),
          value:parseFloat(item.substring(indexCourse+7,indexCourse+14).replace(',','.'))
        })
    })
    let arrayToPrint = [];
    finalArray.forEach(item=>{
      arrayToPrint.unshift(item.date+" : "+item.value)
    })
    let sum = 0;
    finalArray.forEach(item=>{
        sum = sum + item.value
    })
    const obj = {
      text:"Стоимость в диапазоне "+date1+" - "+date2,  
      currency_Name:'Валюта - '+currencyName,
      value:`Средний курс: ${(sum/finalArray.length).toFixed(3)}`,
      arrayOfValues:arrayToPrint
      }
    return obj;
  })
  
  const getId = function(array,currency){
    let id = "";
    array.forEach(item=>{
      if(item.Name === currency)
      {
        id = item.ParentCode;
      }
    })
    return id;
  }

  module.exports.getTxtValueCBRdouble = getTxtValueCBRdouble;
  module.exports.resultArrayCBRdouble = resultArrayCBRdouble;
  module.exports.getId = getId;