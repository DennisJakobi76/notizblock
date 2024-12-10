let inputField = document.getElementById("note-input");
let noteField = document.getElementById("current-note-container");
let trashCan = document.getElementById("trash-container");
let notes = [];
let currentDraggedNote;
let id;

/**
 * This function gets the id of the note-element that has been started dragging and saves it into the
 * variable 'currentDraggedNote'
 * @param {number} id
 */
async function startDragging(noteId) {
    currentDraggedNote = noteId;
}

/**
 * This function gets the user`s input and creates on note-element.
 * This element is given to the renderNote-function.
 */
async function createNote() {
    let dbEntryCount = await loadData("/notes");
    id = dbEntryCount.length;
    let text;
    text = inputField.value;
    if (text.length > 0) {
        let note = {};
        note.id = id;
        note.category = "note";
        note.title = inputField.value;
        let firebaseObject = {
            category: note.category,
            title: note.title,
        };
        notes.push(note);
        await addEditOneNote(note.id, firebaseObject);
        noteField.innerHTML += renderNote(note);

        id++;
        console.log(notes);
        inputField.value = "";
    }
}

async function updateHTML() {
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

function searchIndexInArray(array, noteId) {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i]["id"] == noteId) {
            index = i;
            break;
        }
    }
    return index;
}

async function moveTo(category) {
    let currentIndex = searchIndexInArray(notes, currentDraggedNote);
    notes[currentIndex]["category"] = category;
    let helperObject = { category: notes[currentIndex]["category"], title: notes[currentIndex]["title"] };
    await addEditOneNote(currentIndex, helperObject);

    await updateHTML();
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

async function showCurrentNotes(array) {
    notes = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i]) {
            notes.push({ id: i, category: array[i].category, title: array[i].title });
        }
    }
    await updateHTML();
}

async function eraseAllTrash() {
    let notesResponse = await loadData("/notes");

    for (let i = 0; i < notesResponse.length; i++) {
        if (notesResponse[i] && notesResponse[i].category === "trash") {
            await deleteData(`/notes/${i}`);
            console.log(notesResponse[i].title);
            console.log(notes);

            let currentNote = findIndexOfObjectInArray(notes, "title", notesResponse[i].title);
            console.log(currentNote);

            notes.splice(currentNote, 1);
            break;
        }
    }

    updateHTML();
}

function findIndexOfObjectInArray(array, attribute, value) {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i][attribute] === value) {
            index = i;
            break;
        }
    }
    return index;
}
