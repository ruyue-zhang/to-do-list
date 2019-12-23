var key = 0;
var state = 'All';
function addTask(event) {
  var taskInfo = document.getElementsByClassName('task')[0].value;
  if(taskInfo) {
    setDataIntoDB(taskInfo,false);
    var taskObject = getDataFromDB(key);
    addNewTaskInPage(taskObject);
  }
}

function setDataIntoDB(taskInfo,checked) {
  ++key;
  var taskObject = {
    taskName: taskInfo,
    isChecked: checked
  }
  var taskStatus = JSON.stringify(taskObject);
  localStorage.setItem(key,taskStatus);
}

function getDataFromDB(key) {
  var taskList = document.getElementsByClassName('task-list')[0];
  var taskInfo = localStorage.getItem(key);
  taskInfo = JSON.parse(taskInfo);
  return taskInfo;
}

function addNewTaskInPage(taskObject) {
  var taskList = document.getElementsByClassName('task-list')[0];
  var isChecked = taskObject.isChecked ? 'checked' : '';
  var taskInnerHtml = "<input type='checkbox' class='checked' "+isChecked+">" +
  "<span>" + taskObject.taskName + "</span>" + 
  "<button class='remove' onclick='removeTask()'>X</button>";
  var li = document.createElement("li");
  li.innerHTML = taskInnerHtml;
  li.className = 'row';
  taskList.appendChild(li);

  if('Complete' === state) {
    differentButtonDispaly('Complete');
  }
  document.getElementsByClassName('task')[0].value = '';
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

function differentButtonDispaly(status) {
  state = status;
  var row = document.querySelectorAll("li");
  for(var i = 0; i < row.length; i++) {
    var check = row[i].getElementsByClassName('checked')[0];
    switch(status) {
      case 'Active':
        check.checked ? row[i].style.display = 'none' : row[i].style.display = '';
        break;
      case 'Complete':
        !check.checked ? row[i].style.display = 'none' : row[i].style.display = '';
        break;
      default:
        row[i].style.display = '';
    } 
  }
}

function removeTask(event) {
  var currentEvent = event || window.event;
  if(currentEvent.target) {
    var target = currentEvent.target;
  }
  else {
    var target = currentEvent.srcElement;
  }
  if('X' === target.innerText) {
    if(confirm('是否删除该TODO？')) {
      var ol = target.parentNode.parentNode;
      ol.removeChild(target.parentNode);
    }
  }
}


