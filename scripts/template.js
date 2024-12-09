function renderNote(note) {
    return `<div draggable="true" ondragstart="startDragging(${note.id})" class="note">${note["title"]}</div>`;
}
