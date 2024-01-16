const time = document.getElementById("time");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let array = [];
const arrayDisplay = document.getElementById("arrayDisplay");
function start(){
    if(!isRunning){
        startTime = Date.now()-elapsedTime;
        timer = setInterval(update,10);
        isRunning = true;
    }   
}
function stop(){
    if(isRunning){
        clearInterval(timer);
        isRunning = false;
    }
}
function reset(){
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    clearInterval(timer);
    time.textContent = `00:00:00:00`;
}
function lap(){
    if(isRunning){
        arrayDisplay.style.display = "block";
        arrayDisplay.style.width = document.getElementById("container").clientWidth-40+"px";
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        let hours = Math.floor(elapsedTime / (1000*60*60));
        let minutes = Math.floor(elapsedTime / (1000*60)%60);
        let seconds = Math.floor(elapsedTime / (1000)%60);
        let miliseconds = Math.floor(elapsedTime % (1000)/10);
        hours = (String)(hours).padStart(2,0);
        minutes = (String)(minutes).padStart(2,0);
        seconds = (String)(seconds).padStart(2,0);
        miliseconds = (String)(miliseconds).padStart(2,0);
        let newString = `${hours}:${minutes}:${seconds}:${miliseconds}`;
        array.push(newString);
        updateLapDisplay();
    }
}
function clearLap(){
    array = [];
    arrayDisplay.innerHTML = '';
    arrayDisplay.style.display = "none";
}
function updateLapDisplay(){
    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    array.forEach((laptime,index)=>{
        const li = document.createElement("li");
        li.textContent = `Lap ${index+1}: ${laptime}`;
        li.appendChild(document.createElement("hr"));
        ul.appendChild(li);
    });
    arrayDisplay.innerHTML = '';
    arrayDisplay.appendChild(ul);
}
function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    let hours = Math.floor(elapsedTime / (1000*60*60));
    let minutes = Math.floor(elapsedTime / (1000*60)%60);
    let seconds = Math.floor(elapsedTime / (1000)%60);
    let miliseconds = Math.floor(elapsedTime % (1000)/10);
    hours = (String)(hours).padStart(2,0);
    minutes = (String)(minutes).padStart(2,0);
    seconds = (String)(seconds).padStart(2,0);
    miliseconds = (String)(miliseconds).padStart(2,0);
    time.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}