let inputField = document.getElementById("note-input");
let noteField = document.getElementById("current-note-container");
let trashCan = document.getElementById("trash-container");
let notes = [];
let currentDraggedNote;
let id = 0;

/**
 * This function gets the id of the note-element that has been started dragging and saves it into the
 * variable 'currentDraggedNote'
 * @param {number} id
 */
function startDragging(id) {
    currentDraggedNote = id;
}

/**
 * This function gets the user`s input and creates on note-element.
 * This element is given to the renderNote-function.
 */
function createNote() {
    let text;
    text = inputField.value;
    if (text.length > 0) {
        let note = {};
        note.id = id;
        note.category = "note";
        note.title = inputField.value;

        notes.push(note);
        noteField.innerHTML += renderNote(note);

        id++;
        console.log(notes);
        inputField.value = "";
    }
}

function updateHTML() {
    let theNotes = notes.filter((n) => n["category"] == "note");
    noteField.innerHTML = "";

    for (let i = 0; i < theNotes.length; i++) {
        let oneNote = theNotes[i];
        noteField.innerHTML += renderNote(oneNote);
    }

    let theTrash = notes.filter((n) => n["category"] == "trash");
    trashCan.innerHTML = "";

    for (let j = 0; j < theTrash.length; j++) {
        let oneTrash = theTrash[j];
        trashCan.innerHTML += renderNote(oneTrash);
    }
}

function moveTo(category) {
    notes[currentDraggedNote]["category"] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add("drag-highlight");
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove("drag-highlight");
}

function allowDrop(event) {
    event.preventDefault();
}
