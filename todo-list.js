//localStorage.clear();
var state = 'All';
var taskList = document.getElementsByClassName('task-list')[0];
var key = localStorage.getItem('index');
displayAll();

function addTask() {
  ++key;
  var taskInfo = document.getElementsByClassName('task')[0].value;
  if(taskInfo) {
    setDataIntoDB(key,taskInfo,false);
    if('Complete' !== state) {
      var taskObject = getDataFromDB(key);
      addTaskInPage(taskObject);
    }
    document.getElementsByClassName('task')[0].value = '';
    localStorage.setItem('index',key);
  }
}

function setDataIntoDB(key,taskInfo,checked) {
  var taskObject = {
    key: key,
    taskName: taskInfo,
    isChecked: checked
  }
  var taskStatus = JSON.stringify(taskObject);
  localStorage.setItem(key,taskStatus);
}

function getDataFromDB(key) {
  var taskInfo = localStorage.getItem(key);
  taskInfo = JSON.parse(taskInfo);
  return taskInfo;
}

function changeIsCheckedInDB(target) {
  var li = target.parentNode;
  var key = li.getElementsByClassName('key')[0].innerText;
  var taskInfo = li.getElementsByClassName('task-name')[0].innerText;
  console.log(taskInfo);
  var isChecked = target.checked;
  setDataIntoDB(Number(key),taskInfo,isChecked);
}

function addTaskInPage(taskObject) {
  var isChecked = taskObject.isChecked ? 'checked' : '';
  var taskInnerHtml = "<input type='checkbox' class='checked' onclick='addLineThrough()'"+isChecked+">" +
  "<span class='task-name'>" + taskObject.taskName + "</span>" + 
  "<button class='remove' onclick='removeTask()'>X</button>" +
  "<span class='key'>" + taskObject.key + "</span>";
  var li = document.createElement("li");
  li.innerHTML = taskInnerHtml;
  li.className = 'row';
  if(taskObject.isChecked) {
    li.style.textDecoration = "line-through";
    li.style.color = "#cbcbcb"
  }
  taskList.appendChild(li);
}

function creatEventTarget(event) {
  var currentEvent = event || window.event;
  var target = null;
  currentEvent.target ? target = currentEvent.target : target = currentEvent.srcElement;
  return target;
}

function addLineThrough(evnet) {
  var target = creatEventTarget(event)
  var li = target.parentNode;
  if(target.checked) {
    li.style.textDecoration = "line-through";
    li.style.color = "#cbcbcb"
  }
  else {
    li.style.textDecoration = "none";
    li.style.color = "";
  }
  changeIsCheckedInDB(target);
}

function removeTask(event) {
  var target = creatEventTarget(event)
  if('X' === target.innerText) {
    var li = target.parentNode;
    var key = li.getElementsByClassName('key')[0].innerText;
    if(confirm('是否删除该TODO？')) {
      var ol = target.parentNode.parentNode;
      ol.removeChild(target.parentNode);
      localStorage.removeItem(key);
    }
  }
}

function differentButtonDispaly(status) {
  state = status;
  var ol = document.getElementsByClassName('task-list')[0];
  ol.innerHTML = '';
  var index = localStorage.getItem('index');
  for(var key = 1; key <= index; key++) {
    var taskObject = getDataFromDB(key);
    switch(status) {
      case 'Active':
          if(taskObject && !taskObject.isChecked) {
            addTaskInPage(taskObject);
          }
          break;
      case 'Complete':
          if(taskObject && taskObject.isChecked) {
            addTaskInPage(taskObject);
          }
          break;
      default:
          if(taskObject) {
            addTaskInPage(taskObject);
          }
          break;
    } 
  }
}

function displayAll() {
  var index = localStorage.getItem('index');
  for(var key = 1; key <= index; key++) {
    var taskObject = getDataFromDB(key);
    if(taskObject) {
      addTaskInPage(taskObject);
    }
  }
}

