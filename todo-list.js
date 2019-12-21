function addTask(event) {
  var taskList = document.getElementsByClassName('task-list')[0];
  var taskInfo = document.getElementsByClassName('task')[0].value;
  if(taskInfo) {
    var row = 
    "<input type='checkbox' class='checked'>" +
    "<span>" + taskInfo + "</span>";
  var li = document.createElement("li");
  li.innerHTML = row;
  taskList.appendChild(li);
  }
} 


