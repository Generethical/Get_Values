const lmeForm = document.querySelector('form')
const searchElement = document.querySelector('select')
const calendarDate1 = document.querySelector('#calendar1')
const calendarDate2 = document.querySelector('#calendar2')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

lmeForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        const value1 = searchElement.value;
        const value2 = calendarDate1.value;
        const value3 = calendarDate2.value;
        messageOne.textContent = '';
        messageTwo.textContent = '';
        messageThree.textContent = '';
        fetch('/findDouble?metal='+value1+'&dateSingle='+value2+'&dateDouble='+value3).then((response)=>{ 
        response.json().then((data)=>{
            console.log(data);
                messageOne.textContent = data.date;
                messageTwo.textContent = data.LME_Cash_Settlement;
                messageThree.textContent = data.LME_3_month;
                })
        })
})
