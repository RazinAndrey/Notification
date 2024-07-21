
let interval;
let width = 1;
let notification = document.getElementById('notification');
let btn = document.querySelector('button');

// уведомление
const move = () => {
    let bar = document.getElementById('bar');
    
    clearInterval(interval);

    interval = setInterval(frame, 30);

    notification.style.display = 'block';
    btn.disabled = true;

    function frame() {
    if (width >= 100) {
      width = 1;
      clearInterval(interval);
      notification.style.display = 'none';
      btn.disabled = false;
    } else {
      width++;
      bar.style.width = width + '%';
    }
  }
}

// пауза уведомления
const pause = () => {
    clearInterval(interval);
}

// объекты (успех и ошибка)
let message_success = {
    status: '✔',
    label: 'Успешно',
    text: 'Изменения успешно сохранены'
}
let message_error = {
    status: '✖',
    label: 'Изменения не сохранены',
    text: 'Потеря интернет соединения'
}

let statusMessage = document.getElementById('status');
let labelMessage = document.getElementById('label');
let textMessage = document.getElementById('text');

// успех
const success = () =>{
    width = 1;

    statusMessage.innerHTML = message_success.status;
    labelMessage.innerHTML = message_success.label;
    textMessage.innerHTML = message_success.text;

    statusMessage.style.backgroundColor = 'rgba(99, 142, 88, 1)';

    move();

    notification.addEventListener('mousemove', pause);
    notification.addEventListener('mouseout',  move);
}

// ошибка
const error = () =>{
    width = 1;
    
    statusMessage.innerHTML = message_error.status;
    labelMessage.innerHTML = message_error.label;
    textMessage.innerHTML = message_error.text;
    
    statusMessage.style.backgroundColor = 'rgba(239, 55, 62, 1)';

    move();

    notification.addEventListener('mousemove', pause);
    notification.addEventListener('mouseout',  move);
}

// имитация запроса 
const simulateServer = () => {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            return resolve(
                console.log('Успех'),
                success()
            );
        }
        reject(
            'Ошибка',
            error()
        );
    });
};

btn.addEventListener('click', simulateServer);
