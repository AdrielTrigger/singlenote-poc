// variables for the text box, the save button, the saved note text and the edit button
const saveNoteForm = document.getElementById('save-note-form');
const noteBox = document.getElementById('note-box');
const noteText = document.getElementById('note-text');
const editNoteButton = document.getElementById('edit-note-button');
const deleteNoteButton = document.getElementById('delete-note-button');

//loading of previously saved note
window.addEventListener('DOMContentLoaded', async () => {
    const savedNote = await window.electronAPI.loadNote();
    if (savedNote) {
        saveNoteForm.style.display = 'none';
        displaySavedNote(savedNote);
    } else {
        noteText.style.display = 'none';
        editNoteButton.style.display = 'none';
        deleteNoteButton.style.display = 'none';
    }
});

//edited note should be saved and rendered as fixed text while the text box gets hidden along with the save button
saveNoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const note = noteBox.value.trim();
    if (!note) return;

    noteText.innerText = note;

    await window.electronAPI.saveNote(note);

    saveNoteForm.style.display = 'none';
    noteBox.value = '';
    noteText.style.display = 'inline-block';
    editNoteButton.style.display = 'inline-block';
    deleteNoteButton.style.display = 'inline-block';
});

//text box should reappear with saved text for editing and the save button should also come back
editNoteButton.addEventListener('click', () => {
    saveNoteForm.style.display = 'inline-block';
    noteBox.value = noteText.innerText;
    noteBox.focus();
    noteText.style.display = 'none';
    editNoteButton.style.display = 'none';
    deleteNoteButton.style.display = 'none';
});

deleteNoteButton.addEventListener('click', async () => {
    await window.electronAPI.deleteNote();

    saveNoteForm.style.display = 'block';
    noteText.style.display = 'none';
    editNoteButton.style.display = 'none';
    deleteNoteButton.style.display = 'none';
    noteBox.value = '';
    noteBox.focus();
});

//helper function to display saved text
function displaySavedNote(text) {
    noteText.innerText = text;
    noteText.style.display = 'inline-block';
    editNoteButton.style.display = 'inline-block';
    deleteNoteButton.style.display = 'inline-block';
}