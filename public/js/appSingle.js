const lmeForm = document.querySelector('form')
const searchElement = document.querySelector('select')
const calendar = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

lmeForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        const value = searchElement.value;
        const value2 = calendar.value;
        messageOne.textContent = '';
        messageTwo.textContent = '';
        messageThree.textContent = '';
        fetch('/findSingle?metal='+value+'&date='+value2).then((response)=>{ 
        response.json().then((data)=>{
                messageOne.textContent = data.date;
                messageTwo.textContent = data.LME_Cash_Settlement;
                messageThree.textContent = data.LME_3_month;
                })
        })
})
