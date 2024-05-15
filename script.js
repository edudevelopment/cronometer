const cronometer = document.getElementById('timer');
const marksList = document.getElementById('marks-list');
let intervalId = 0;
let timer = 0;
let marks = [];

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100);
    const hundredsths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredsths.toString().padStart(2, '0')}`;
}

const setTimer = (time) => {
    cronometer.innerText = formatTime(time);
}

const addMarkToList = ( markTime) => {
    marksList.innerHTML += `<p>Tempo: ${formatTime(markTime)}</p>`
}

const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');
    

    clearInterval(intervalId);

    if(action == 'start' || action == 'continue') {
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);
    }, 10);
        button.setAttribute('action' , 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == 'pause') {
        button.setAttribute('action' , 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const markTime = () => {
    marks.push(timer);
    addMarkToList( timer);
}

const resetTimer = () => {

    timer = 0;
    marks = [];
    setTimer(timer);
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>'
}

const cleanMarks = () => {
    marksList.innerHTML = '';
}



document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('clean').addEventListener('click', cleanMarks);
