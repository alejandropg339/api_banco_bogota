const sendButton = document.querySelector('#send-button');
const form = document.querySelector('#form');
const account = document.querySelector('#account');
const amount = document.querySelector('#amount');
const notificationContainer = document.querySelector('#notification-container');
const  notification = document.querySelector('#notification');


sendButton.addEventListener('click', e=>{
    e.preventDefault();
    confirm('Estas seguro de realizar la transacción?',sendTransaction());
});

const sendTransaction = async() => {
    const type = document.querySelector('#type').value;
    const id = Math.floor(Math.random() * 100);
    console.log(id); 

    const jsonData = {
        id: id,
        cuenta: account.value,
        valor: amount.value,
        tipo: type
    }

    console.log(type);

    const jsonSend = JSON.stringify(jsonData);
    console.log(jsonSend);


    const request = await fetch('http://localhost:3000/transaction/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonSend
    });

    const response = await request.text();

    console.log(response);

    if(response === 'Se inserto correctamente la transacción'){
        notificationContainer.classList.toggle('see');
        notification.classList.toggle('notify');
        animation();
    }
}

async function animation(){
    await gsap.from(".notify", {
        opacity: 0, 
        y: -100, 
        duration: 1
      });
}
