const lmeForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')


lmeForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    var checked = document.querySelectorAll('input:checked');
    messageOne.textContent = '';
if (checked.length === 0) {
    // there are no checked checkboxes
    alert('no checkboxes checked');
    return;
} else {
    // there are some checked checkboxes
    checked.forEach(item=>{
        fetch('/findCurrent?value='+item.name).then((response)=>{ 
        response.json().then((data)=>{
                messageOne.setAttribute('style', 'white-space: pre;');
                data.values.forEach(element => {
                    messageOne.textContent += element+'\r\n'
                });
                document.div.appendChild(messageOne);
                })
                })
        })
    }
})

