function openFeatures(){
let section=document.querySelector('.cards-section');
let elements=document.querySelectorAll('.cards');
let allElements=document.querySelectorAll('.fullElem');

let buttons=document.querySelectorAll('.btn');

elements.forEach((elem)=>{
  elem.addEventListener('click',()=>{
    allElements[elem.id].style.display='block';
    section.style.display='none';
  })
})

buttons.forEach((elem)=>{
  elem.addEventListener('click',()=>{
    section.style.display="flex";
    allElements[elem.id].style.display="none";
  })
})
}

openFeatures()

function dashBoradTime(){
  let container=document.querySelector(".weather-time-container");
  let date=document.querySelector(".weather-time-container .upper-div .upper-div-content1 h3");
  let dayTime=document.querySelector(".weather-time-container .upper-div .upper-div-content1 h1");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const imgArray=["https://images.unsplash.com/photo-1732239613951-0f10063b4589?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1683041132892-0fe990b3afc3?q=80&w=1291&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://plus.unsplash.com/premium_photo-1675826393511-7ce378893229?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"];

  const shortMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  let unit="";
  const intervalId=setInterval(()=>{
  let newDate=new Date();
  if(newDate.getHours()>=12){
    unit="PM";
  }else{
    unit="AM";
  }
  date.innerHTML=`${newDate.getDate()} ${shortMonths[newDate.getMonth()]}, ${newDate.getFullYear()}`;
  dayTime.innerHTML=`${days[newDate.getDay()]}, ${String(newDate.getHours()).padStart('2','0')}:${String(newDate.getMinutes()).padStart('2','0')}:${String(newDate.getSeconds()).padStart('2','0')} ${unit}`
  
  let url="";
  if(newDate.getHours()>=7 && newDate.getHours()<=15){
    url=imgArray[0];
  }else if(newDate.getHours>=16 && newDate.getHours()<=18){
    url=imgArray[1];
  }else{
    url=imgArray[2];
  }
  container.style.backgroundImage=`url(${url})`;
},100)

let city=document.querySelector(".weather-time-container .lower-div .lower-div-content1 input");
let temperature=document.querySelector(".weather-time-container .upper-div .upper-div-content2 h2");
let preception=document.querySelector(".weather-time-container .lower-div .lower-div-content2 #value-box1");
let humidity=document.querySelector(".weather-time-container .lower-div .lower-div-content2 #value-box2");
let wind=document.querySelector(".weather-time-container .lower-div .lower-div-content2 #value-box3");

async function getWeather(city){
  let apikey=`dcaea67819a3a5bdaa66deec6b932b3c`;

  const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
  const data = await rawData.json();
  let temp=((data.main.temp)-273.15).toFixed(1);
  temperature.innerHTML=`${temp}°C`;
  humidity.innerHTML=`Humidity: ${data.main.humidity}%`
  wind.innerHTML=`Wind: ${data.wind.speed}km/h`
}

setInterval(()=>{
  getWeather(city.value);
},100)
}
dashBoradTime();

//To-Do-List: 

function toDoList(){
let enterTask=document.querySelector('.addTask #task-enter');
let textarea=document.querySelector('.addTask textarea');
let checkbox=document.querySelector('.addTask .imp-task #checkbox');
let addButton=document.querySelector('.addTask #add-button');
let allTask=document.querySelector(".allTask");

let taskArray=[];
let sum='';

if(localStorage.getItem("taskArray")){
  taskArray=JSON.parse(localStorage.getItem("taskArray"));
}else{
  console.log("Local storage is empty.../");
}

function taskDisplay(){
  sum="";
  taskArray.forEach((elem,index)=>{
    sum=sum+`<div class="task">
    <h2>${elem.task}<span class="${elem.checked}">imp</span></h2>
    <input type="button" id=${index} class="task-done" value="Mark as done">
    </div>`
  })
  allTask.innerHTML=sum;
}

taskDisplay();
  
  addButton.addEventListener("click",()=>{
    if(enterTask.value==="" || textarea.value===""){
      alert("Enter task properly: ");
      return;
    }
    taskArray.push({task:enterTask.value,
      detail:textarea.value,  
      checked:checkbox.checked
    })
    taskDisplay();
    localStorage.setItem("taskArray",JSON.stringify(taskArray));
    enterTask.value="";
    textarea.value="";
    checkbox.checked=false;
  })
  

allTask.addEventListener("click",(e)=>{
  if(e.target.classList.contains="task-done"){
    let index=e.target.id;
    taskArray.splice(index,1);
    localStorage.setItem("taskArray",JSON.stringify(taskArray));
    taskDisplay();
  }
})
}

toDoList();



function dailyPlanner(){
  let plannerArray=[];
let keyArray=["key0","key1","key2","key3","key4","key5","key6","key7","key8","key9","key10","key11","key12","key13","key14","key15","key16","key17"];
let plannerElems=document.querySelectorAll(".planner-elems input");

if(localStorage.getItem("plannerArray")){
  plannerArray=JSON.parse(localStorage.getItem("plannerArray"));
}else{
  console.log("plannerArray is empty..");
}

function dailyPlan(){
  plannerArray.forEach((value,index)=>{
  plannerElems[index].value=value;
})
}

dailyPlan();

plannerElems.forEach((elem)=>{
  elem.addEventListener("change",()=>{
    let index=keyArray.indexOf(elem.id);
    plannerArray[index]=elem.value;
    localStorage.setItem("plannerArray",JSON.stringify(plannerArray));
  })
})
}

dailyPlanner();

function motivationFunction(){
  const quoteContainer=document.querySelector(".motivational-quote-container .quote");
const quoteAuthor=document.querySelector(".author span");

async function getData(){
  let rawData=await fetch("https://dummyjson.com/quotes/random");
  let data=await rawData.json();
  console.log(data)
  quoteContainer.innerHTML=data.quote;
  quoteAuthor.innerHTML=data.author;
}
getData();
}

motivationFunction()

function pomodoroTimer(){
  
let startButton=document.querySelector("#start-timer-button");
let timeContainer=document.querySelector(".timeElem");
let pauseButton=document.querySelector("#pause-timer-button");
let resetButton=document.querySelector("#reset-timer-button");
let h4=document.querySelector(".pomodoro-timer-fullpage .workSection");

let totalSeconds=1500;
let intervalId;
let intervalId2;
let checkPoint=false;
let breakTime=5*60;

function breakInterval(){
  intervalId2=setInterval(()=>{
    if(breakTime===0){
      checkPoint=false;
      totalSeconds=1500;
      breakTime=5*60;
      clearInterval(intervalId2);
      timeContainer.innerHTML="25:00";
      startButton.disabled=false;
      h4.innerHTML="Work Session";
      return;
    }

    breakTime--;

    let minutes=Math.floor(breakTime/60);
    let seconds=breakTime%60;
    timeContainer.innerHTML=`${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`;
  },1000)
}

function studyInterval(){
  intervalId = setInterval(()=>{
    
    if(totalSeconds===0) {
      clearInterval(intervalId);
      totalSeconds=1500;
      startButton.disabled=false;
      timeContainer.innerHTML="05:00";
      checkPoint=true;
      h4.innerHTML="Break";
      return;
    }
    totalSeconds--;

    let seconds=totalSeconds%60;
    let minutes=Math.floor(totalSeconds/60);
  timeContainer.innerHTML=`${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`;
},1000)
}

startButton.addEventListener("click",()=>{
  startButton.disabled=true;
  if(checkPoint!==true){
    studyInterval();
  }else{
    breakInterval();
  }
})

pauseButton.addEventListener("click",()=>{
  clearInterval(intervalId);
  clearInterval(intervalId2);
  startButton.disabled=false;
})

resetButton.addEventListener("click",()=>{
  clearInterval(intervalId);
  clearInterval(intervalId2);
  totalSeconds=1500;
  h4.innerHTML="Work Session";
  timeContainer.innerHTML="25:00";
  startButton.disabled=false;
  checkPoint=false;
})

}

pomodoroTimer();
