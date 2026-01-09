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

let taskCount=0;
let toDoListTracker=document.querySelector('.tracker-fullpage .tracker-elements-container .todo-list-tracker span');

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
    taskCount--;
    localStorage.setItem("taskArray",JSON.stringify(taskArray));
    taskDisplay();
  }
})

  setInterval(()=>{
    taskArray.forEach((elem)=>{
      taskCount++;
    })
    toDoListTracker.innerHTML=taskCount;
    taskCount=0;
  },1000)
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

let totalSection=0;

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
      totalSection++;
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

function themeChangeEffect(){
  const themesCombo = [
  // 0️⃣ Original Theme (Chocolate / Gold)
  {
    name: "Chocolate Gold (Original)",
    pri: "#FCDEC0",
    sec: "#4E1F00",
    tri1: "#FEBA17",
    tri2: "#74512D",
    white: "#FFFFFF",
    black: "#000000",
    red: "#FF0000",
    green: "#008000"
  },

  // 1️⃣ Warm Neutral (Premium / Calm)
  {
    name: "Warm Neutral",
    pri: "#F7F5F2",
    sec: "#2F2F2F",
    tri1: "#C9A24D",
    tri2: "#8B6F3D",
    white: "#FFFFFF",
    black: "#000000",
    red: "#D64545",
    green: "#2E7D32"
  },

  // 2️⃣ Slate Dark (Modern / Developer)
{
  name: "Midnight Graphite",
  pri: "#0D1117", 
  sec: "#346affff", 
  tri1: "#3FB950", 
  tri2: "#161B22",
  white: "#ffffffff",
  black: "#000000",
  red: "#F85149",
  green: "#2EA043"
},

  // 3️⃣ Soft Blue (Clean / Corporate)
  {
    name: "Soft Blue",
    pri: "#F8FAFC",
    sec: "#0F172A",
    tri1: "#2563EB",
    tri2: "#DBEAFE",
    white: "#FFFFFF",
    black: "#020617",
    red: "#DC2626",
    green: "#16A34A"
  },

  // 4️⃣ Earth Olive (Focused / Natural)
  {
    name: "Earth Olive",
    pri: "#FAFAF7",
    sec: "#2E3A2F",
    tri1: "#6B8E23",
    tri2: "#E6EBD9",
    white: "#FFFFFF",
    black: "#1A1A1A",
    red: "#C24141",
    green: "#3F7D3A"
  }
];


let theme=document.querySelector("nav .theme");
let rootElement = document.documentElement;

let count=1;
theme.addEventListener("click",()=>{
  if(count>4) count=0;
  rootElement.style.setProperty('--pri',themesCombo[count].pri);
  rootElement.style.setProperty('--sec',themesCombo[count].sec);
  rootElement.style.setProperty('--tri1',themesCombo[count].tri1);
  rootElement.style.setProperty('--tri2',themesCombo[count].tri2);
  rootElement.style.setProperty('--white',themesCombo[count].white);
  rootElement.style.setProperty('--black',themesCombo[count].black);
  rootElement.style.setProperty('--red',themesCombo[count].red);
  rootElement.style.setProperty('--green',themesCombo[count].green);
  count++;
})

}

themeChangeEffect();

function tracker(){
  let pomodoroTracker=document.querySelector('.tracker-fullpage .tracker-elements-container .pomodoro-tracker span');

setInterval(()=>{
  pomodoroTracker.innerHTML=totalSection;
},1000)
}
tracker();