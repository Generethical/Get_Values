const form = document.querySelector('form')
const searchElement = document.querySelector('select')
const calendarDate1 = document.querySelector('#calendar1')
const calendarDate2 = document.querySelector('#calendar2')
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');
const message4 = document.querySelector('#message-4');

form.addEventListener('submit',(event)=>{
        event.preventDefault();
        const value1 = searchElement.value;
        const value2 = calendarDate1.value;
        const value3 = calendarDate2.value;
        const valuee2 = (value2.toString().substring(8,10)+'/'+value2.toString().substring(5,7)+'/'+value2.toString().substring(0,4))
        const valuee3 = (value3.toString().substring(8,10)+'/'+value3.toString().substring(5,7)+'/'+value3.toString().substring(0,4))
        const url = '/findRUB?currency='+value1+'&dateSingle='+valuee2+'&dateDouble='+valuee3;
        message1.textContent = '';
        message2.textContent = '';
        message3.textContent = '';
        message4.textContent = '';
        fetch(url).then((response)=>{
        response.json().then((data)=>{
                message1.textContent = data.text;
                message2.textContent = data.currency_Name;
                message3.textContent = data.value;
                message4.setAttribute('style', 'white-space: pre;');
                data.arrayOfValues.forEach(element => {
                        message4.textContent += element+'\r\n'
                });
                document.div.appendChild(message4)
                })
        })
})

