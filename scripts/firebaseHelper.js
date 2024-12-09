const BASE_URL = "https://notizblock-76522-default-rtdb.europe-west1.firebasedatabase.app/";
let fbNotes = [];

async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

async function postData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
    return responseToJson;
}

async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    let responseToJson = await response.json();
    return responseToJson;
}

async function putData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    let responseToJson = await response.json();
    return responseToJson;
}

async function addEditOneNote(id = 2, note = { category: "note", title: "aufraeumen" }) {
    await putData(`notes/${id}`, note);
}

async function onloadFunc() {
    let notesResponse = await loadData("/notes");

    let notesKeysArray = Object.keys(notesResponse);

    for (let i = 0; i < notesKeysArray.length; i++) {
        fbNotes.push({
            id: notesKeysArray[i],
            note: notesResponse[notesKeysArray[i]],
        });
    }
    showCurrentNotes(notesResponse);
    console.log(fbNotes);

    console.log(notesKeysArray);

    console.log(notesResponse);
    // await addEditSingleUser();

    // postData("/users", {
    //     "userId": 2,
    //     "unserName": "Tina",
    //     "userMail": "Tina@gmail.de",
    // });
    // deleteData("/name/-OBa972CixSw9jHZe40X");
    // putData("/name", {
    //     "userId": 0,
    //     "unserName": "Max",
    //     "userMail": "test@gmail.de",
    // });
    // putData("/users", {
    //     "userId": 1,
    //     "unserName": "Peter",
    //     "userMail": "peter@gmail.de",
    // });
}
