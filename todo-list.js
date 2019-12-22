function addTask(event) {
  var taskList = document.getElementsByClassName('task-list')[0];
  var taskInfo = document.getElementsByClassName('task')[0].value;
  var buttonComelete = document.getElementsByClassName('button-complete')[0];
  if(taskInfo) {
    var row = 
    "<input type='checkbox' class='checked'>" +
    "<span>" + taskInfo + "</span>";
  var li = document.createElement("li");
  li.innerHTML = row;
  taskList.appendChild(li);
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

function isChecked() {

}




