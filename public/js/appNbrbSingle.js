const form = document.querySelector('form')
const searchElement = document.querySelector('select')
const calendarDate1 = document.querySelector('#calendar1')
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const value1 = searchElement.value;
    const value2 = calendarDate1.value;
    const url = '/findBynSingle?currency='+value1+'&dateSingle='+value2;
    message1.textContent = '';
    message2.textContent = '';
    message3.textContent = '';
    fetch(url).then((response)=>{
    response.json().then((data)=>{
            message1.textContent = data.date;
            message2.textContent = data.name;
            message3.textContent = data.value;
        })
    })
})