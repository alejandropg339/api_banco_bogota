const visibiliy = document.querySelector('#visibility');
const send = document.querySelector('#send');

send.addEventListener('click', (e)=>{
    e.preventDefault();
    visibiliy.classList.remove('visible');
})