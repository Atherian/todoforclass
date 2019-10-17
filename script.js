// Let's start with some default to-do items.
var myData = [
  {
    content: "Go to grocery.",
    complete: true
  },
  {
    content: "Call mom.",
    complete: false
  },
  {
    content: "Take dog to vet.",
    complete: false
  },
  {
    content: "Pay bills.",
    complete: false
  }
];


function setup() {
  if (localStorage.getItem("myStoredData")) {
    myData = JSON.parse(localStorage.getItem("myStoredData"));
  }
  render();
}

function render() {
  var myOutput = "";
  myData.forEach(function (item, index) {
    myOutput += `
      <div class="item">
        <div class="item-content">
          ${item.content}
        </div>
        <div class="item-actions">
          <i class="far fa-check-square ${item.complete ? '' : 'fade'}" onclick="toggleComplete(${index})"></i>
          <i class="far fa-trash-alt fade" onclick="deleteItem(${index})"></i>
        </div>
      </div>`;
  });
  document.querySelector("#results").innerHTML = myOutput;
}

function submit() {
  var newItem = document.querySelector("#myInput").value;
  myData.push({content: newItem, complete: false});
  updateStorage();
  render();
}

function deleteItem(index) {
  var verify = confirm("Are you sure? You are about to delete this item.");
  if (verify) {
    myData.splice(index, 1);
    updateStorage();
    render();
  }
}

function toggleComplete(index) {
  if (myData[index].complete == true) {
    myData[index].complete = false;
  }
  else {
    myData[index].complete = true;
  }
  updateStorage();
  render();
}

function updateStorage() {
    localStorage.setItem("myStoredData", JSON.stringify(myData));
}

function info() {
  var verify = confirm("You can add items to the list!");
  if (verify) {
    updateStorage();
    render();
  }
}

window.onload = setup();