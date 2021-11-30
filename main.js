let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
let taskViewer = document.querySelector(".task-viewer");
let taskArr = [];
if (window.localStorage.getItem("tasks")) {
  taskArr = JSON.parse(window.localStorage.getItem("tasks"));
}
let posArr = [];
if (window.localStorage.getItem("tasks")) {
  localStorageToArr(posArr);
}
submit.onclick = function () {
  if (input.value !== "") {
    pushValueToArr(taskArr, input.value);
    input.value = "";
  }
};
taskViewer.onclick = function (e) {
  if (e.target.classList.contains("delete")) {
    taskArr = taskArr.filter(function (ele) {
      return e.target.parentElement.getAttribute("id") != ele.id;
    });
    arrToLocalStorage(taskArr);
    localStorageToArr(posArr);
    e.target.parentElement.remove();
  }
};
taskViewer.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    taskArr.forEach(function (ele) {
      if (ele.done === false) {
        if (e.target.getAttribute("id") == ele.id) {
          ele.done = true;
        }
      } else {
        if (e.target.getAttribute("id") == ele.id) {
          ele.done = false;
        }
      }
    });
    arrToLocalStorage(taskArr);
    localStorageToArr(posArr);
  }
});
taskViewer.addEventListener("click", function (e) {
  if (e.target.classList.contains("title")) {
    taskArr.forEach(function (ele) {
      if (ele.done === false) {
        if (e.target.parentElement.getAttribute("id") == ele.id) {
          ele.done = true;
        }
      } else {
        if (e.target.parentElement.getAttribute("id") == ele.id) {
          ele.done = false;
        }
      }
    });
    arrToLocalStorage(taskArr);
    localStorageToArr(posArr);
  }
});
function pushValueToArr(array, titleOfEle) {
  let taskObj = {
    id: Date.now(),
    title: titleOfEle,
    done: false,
  };
  array.push(taskObj);
  arrToLocalStorage(taskArr);
  localStorageToArr(posArr);
}
function arrToLocalStorage(array) {
  window.localStorage.setItem("tasks", JSON.stringify(array));
}
function localStorageToArr(array) {
  array = JSON.parse(window.localStorage.getItem("tasks"));
  arrToTaskViewer(array);
}
function arrToTaskViewer(array) {
  taskViewer.innerHTML = "";
  array.forEach(function (ele) {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("id", ele.id);
    let taskP = document.createElement("p");
    taskP.append(ele.title);
    taskP.classList.add("title");
    taskDiv.append(taskP);
    if (ele.done === true) {
      taskDiv.classList.add("done");
    }
    let deleteSpan = document.createElement("span");
    deleteSpan.classList.add("delete");
    deleteSpan.append("delete");
    taskDiv.append(deleteSpan);
    taskViewer.append(taskDiv);
  });
}
