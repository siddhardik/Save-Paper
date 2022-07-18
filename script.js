// console.log("Welcome to notes app. This is app.js");

// Tooltip Initialization

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

showNotes();

// new note add in local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let tit = addTitle.value.trim();
  let content = addTxt.value.trim();
  if (tit.length == 0) {
    alert("Note's title  is missing!🖋️🤔");
  } else if (content.length == 0) {
    alert("Note's Content is missing!🖋️🤔");
  } else {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let nowTime = new Date().toLocaleDateString();
    let myObj = {
      title: tit,
      text: content,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
  }
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (note_object, index) {
    html += ` 
            <div class="noteCard my-2 mx-2 card" style="width: 15rem;" id="border_note ">
                    <div class="card-body" >
                        <u class="card-text" id="date_color"> ${note_object.date}</u>
                        <i class="card-text" id="time_color"> ${note_object.time}</i>
                        <h5 class="card-title" id="title_style">${note_object.title}</h5>
                        <p class="card-text"> ${note_object.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="right" title=" will be deleted Permanently ">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<h4 >OOPS! Nothing To Show , Write Your Note</h4>`;
  }
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("findBt");
search.addEventListener("input", function () {
  //When input Event is fired

  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("h5")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

// copyright portion

let copyright = document.getElementById("copy_right");
copyright.innerHTML = `Copyright © ${new Date().getFullYear()} siddhardik`;
