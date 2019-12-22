var key = 0;
function addTask(event) {
  ++key;
  var taskList = document.getElementsByClassName('task-list')[0];
  var taskInfo = document.getElementsByClassName('task')[0].value;
  if(taskInfo) {
    localStorage.setItem(key,taskInfo);
    getDataFromDB(key,taskList);
    document.getElementsByClassName('task')[0].value = '';
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
  var row = "<input type='checkbox' class='checked'>" +
  "<span>" + taskInfo + "</span>"
  var li = document.createElement("li");
  li.innerHTML = row;
  li.className = 'row';
  taskList.appendChild(li);
}

function dispalyList(status) {
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



