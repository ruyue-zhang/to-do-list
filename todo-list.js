var key = 0;
function addTask(event) {
  ++key;
  var taskList = document.getElementsByClassName('task-list')[0];
  var taskInfo = document.getElementsByClassName('task')[0].value;
  if(taskInfo) {
    localStorage.setItem(key,taskInfo);
    getDataFromDB(key,taskList);
  }
}

function addLineThrough(event) {
  var currentEvent = event || window.event;
  if(currentEvent.target) {
    var target = currentEvent.target;
  }
  else {
    var target = currentEvent.srcElement;
  }
  var li = target.parentNode;
  if(target.checked) {
    li.style.textDecoration = "line-through";
    li.style.color = "#cbcbcb"
  }
  else {
    li.style.textDecoration = "none";
    li.style.color = "";
  } 
}

function getDataFromDB(key,taskList) {
  var taskInfo = localStorage.getItem(key);
  console.log(taskInfo);

  var row = "<input type='checkbox' class='checked'>" +
  "<span>" + taskInfo + "</span>"
  var li = document.createElement("li");
  li.innerHTML = row;
  taskList.appendChild(li);
}




