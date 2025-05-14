// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const notesList = document.getElementById('notes');

    
    const getNotes = async () => {
        const response = await fetch('/api/notes');
        const notes = await response.json();
        notesList.innerHTML = ''; 
        notes.forEach(note => {
            const noteItem = document.createElement('li');
            noteItem.classList.add('note');
            noteItem.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
                <button class="edit-btn" onclick="editNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
            `;
            notesList.appendChild(noteItem);
        });
    };

    
    noteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = noteTitle.value;
        const content = noteContent.value;

        const newNote = { title, content };
        
        await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
        });

        noteTitle.value = '';
        noteContent.value = '';
        getNotes(); 
    });

  
    window.deleteNote = async (id) => {
        await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        });
        getNotes(); 
    };


    window.editNote = (id, title, content) => {
        noteTitle.value = title;
        noteContent.value = content;

        noteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const updatedNote = { title: noteTitle.value, content: noteContent.value };

            await fetch(`/api/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNote),
            });

            noteTitle.value = '';
            noteContent.value = '';
            getNotes(); 
        });
    };

 
    getNotes();
});
