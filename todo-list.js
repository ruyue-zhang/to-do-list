var key = 0;
var state = 'All';
var taskList = document.getElementsByClassName('task-list')[0];

function addTask(event) {
  ++key;
  var taskInfo = document.getElementsByClassName('task')[0].value;
  if(taskInfo) {
    setDataIntoDB(key,taskInfo,false);
    var taskObject = getDataFromDB(key);
    addTaskInPage(taskObject);
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

function addTaskInPage(taskObject) {
  var isChecked = taskObject.isChecked ? 'checked' : '';
  var taskInnerHtml = "<input type='checkbox' class='checked' "+isChecked+">" +
  "<span class='task-name'>" + taskObject.taskName + "</span>" + 
  "<button class='remove'>X</button>" +
  "<span class='key'>" + taskObject.key + "</span>";
  console.log(taskObject.key);
  var li = document.createElement("li");
  li.innerHTML = taskInnerHtml;
  li.className = 'row';
  taskList.appendChild(li);

  if('Complete' === state) {
    differentButtonDispaly('Complete');
  }
  document.getElementsByClassName('task')[0].value = '';
}


taskList.addEventListener('click',function(event) {
  var currentEvent = event || window.event;
  if(currentEvent.target) {
    var target = currentEvent.target;
  }
  else {
    var target = currentEvent.srcElement;
  }
  addLineThrough(target);
  changeIsCheckedInDB(target);
  removeTask(target);
})

function addLineThrough(target) {
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

function changeIsCheckedInDB(target) {
  var li = target.parentNode;
  var key = li.getElementsByClassName('key')[0].innerText;
  var taskInfo = document.getElementsByClassName('task-name')[0].innerText;
  var isChecked = target.checked;
  if(target.checked) {
    setDataIntoDB(key,taskInfo,true);
  }
  else {
    setDataIntoDB(key,taskInfo,false);
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

function removeTask(target) {
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

