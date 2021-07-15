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
    const url = '/findBynDouble?currency='+value1+'&dateSingle='+value2+'&dateDouble='+value3;
    message1.textContent = '';
    message2.textContent = '';
    message3.textContent = '';
    message4.textContent = '';
    fetch(url).then((response)=>{
    response.json().then((data)=>{
            message1.textContent = data.date;
            message2.textContent = data.name;
            message3.textContent = data.value;
            message4.setAttribute('style', 'white-space: pre;');
            data.values.forEach(element => {
                message4.textContent += element+'\r\n'
            });
            document.div.appendChild(message4)
            })
    })
})
