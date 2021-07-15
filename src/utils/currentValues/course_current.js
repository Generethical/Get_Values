const puppeteer = require('puppeteer');
const cheerio = require('cheerio')
const basics = require('../../currecyBasics/basicCurrent')

function createArrayOfValues(txt){
  let array = []
      let index = 0;
      while(index!==-1){
  index = txt.indexOf(":")
  let resultTxt = txt.substring(0,index+3);
  const data = resultTxt.substring(resultTxt.length-16)
  
  const course1 = resultTxt.substring(0,(resultTxt.length-data.length)/4);
  resultTxt = resultTxt.substring((resultTxt.length-data.length)/4)
  const course2 = resultTxt.substring(0,(resultTxt.length-data.length)/3);
  resultTxt = resultTxt.substring((resultTxt.length-data.length)/3)
  const course3 = resultTxt.substring(0,(resultTxt.length-data.length)/2);
  resultTxt = resultTxt.substring((resultTxt.length-data.length)/2)
  const course4 = resultTxt.substring(0,(resultTxt.length-data.length));
  let miniArray = [course1,course2,course3,course4,data];
  array.push(miniArray);
  txt = txt.substring(index+3);
  }
    return array;
}

function getID(value,array){
  let url = "";
  array.forEach(element => {
    if(element.Abbreviation===value){
      url = element.link
    }
  });
  return url;
}

function getResult(basic,callback){
  const scrape = async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox','--disable-setuid-sandbox']
    })
    const page = await browser.newPage();
    await page.goto(getID(basic,basics));
    const html = await page.content();
    const $ = cheerio.load(html);
    let txt = $('#table_history').text()
    txt = txt.substring(21);
    browser.close();
    return txt;
}
scrape().then((value) => {
  const array = createArrayOfValues(value)[0];
  const obj = [`type:${basic}`,`open:${array[0]}`,`high:${array[1]}`,`low:${array[2]}`,`close:${array[3]}`,`time:${array[4]}`,'\n']
  return callback(obj)
})
}


module.exports = getResult