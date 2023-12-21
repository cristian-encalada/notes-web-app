// Importing the CSS file for the styles
import "./App.css"
import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
  category: string;
  archived: boolean;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
  ]);
  // Add a state value for each of the form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null); // default null if the note is empty

    useEffect(() => {
      const fetchNotes = async () => {
        try {
          const response = await fetch("https://notes-app-node-ce.vercel.app/api/notes");
    
          const allNotes: Note[] = await response.json();
    
          const unarchivedNotes = allNotes.filter((note) => !note.archived);
          const archivedNotes = showArchived
            ? allNotes.filter((note) => note.archived)
            : [];
    
          setNotes(unarchivedNotes);
          setArchivedNotes(archivedNotes);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchNotes();
    }, [showArchived]);

  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  }

  const handleCreateNote = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // console.log("title: ", title);
    // console.log("content: ", content);
    // console.log("category: ", category);
    try {
      const response = await fetch(
        "https://notes-app-node-ce.vercel.app/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            category,
            archived: false
          })
        }
      );

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async(
    event: React.FormEvent
  ) => {
    event.preventDefault();
  
    if (!selectedNote) {
      return;
    }
  
    // const updatedNote: Note = {
    //   id: selectedNote.id,
    //   title: title,
    //   content: content,
    //   category: category,
    // };

    try {
      const response = await fetch(
        `https://notes-app-node-ce.vercel.app/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            category,
            archived: selectedNote.archived,
          })
        }
      );

      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) => 
      note.id === selectedNote.id
        ? updatedNote 
        : note
    )

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setCategory("");
    setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setCategory("")
    setSelectedNote(null);
  }

  const deleteNote = async (
    event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation(); // needed for nested onClick events
  
    try {
      await fetch(
        `https://notes-app-node-ce.vercel.app/api/notes/${noteId}`,
        {
          method: "DELETE"
        }
      );
  
      // Update state to remove the deleted note
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.log(error);
    }
  };
 

  const handleArchiveNote = async (
    event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation();
  
    try {
      const updatedNotes = notes.map((note) =>
        note.id === noteId
          ? { ...note, archived: !note.archived }
          : note
      );
  
      setNotes(updatedNotes);
  
      const updatedNote = updatedNotes.find(
        (note) => note.id === noteId
      );
  
      if (updatedNote) {
        await fetch(`https://notes-app-node-ce.vercel.app/api/notes/${noteId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const filteredNotes = showArchived
    ? archivedNotes
    : notes.filter((note) => !note.archived);

  return(
    // Main container for the application
    <div className="app-container">
      <form action="submit" 
        className="note-form" 
        onSubmit={(event) => 
          selectedNote
            ? handleUpdateNote(event)
            : handleCreateNote(event)}
      >
        <input 
          value={title} 
          onChange={(event) =>
            setTitle(event.target.value)
          }
          // type="text" 
          placeholder="Note title" 
          required/>
        <textarea 
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="Note content" 
          // id="" 
          cols={30}
          rows={5} 
          required>
        </textarea>
        <input 
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          type="text" 
          placeholder="Note category" 
          />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Create Note</button>
        )}
    <div className="filter-options">
    <label>
      <input
        type="checkbox"
        checked={showArchived}
        onChange={() => setShowArchived(!showArchived)}
      />
      Show Archived
    </label>
    </div> 
      </form>
      <div className="notes-grid">
        {filteredNotes.map((note)=> (
          //  key={note.id} gives a unique identifier for each rendered component
          <div 
            key={note.id} 
            className={`note-item ${note.archived ? 'archived' : ''}`}
            onClick={() => handleNoteClick(note)}
          >
          <div className="note-header">
            <button
              onClick={(event) =>
                deleteNote(event, note.id)
              }
            >
              Delete
            </button>
            |
            <button
                onClick={(event) =>
                  handleArchiveNote(event, note.id)
                }
              >
                {note.archived ? 'Unarchive' : 'Archive'}
          </button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <h3>{note.category}</h3>
          </div>
        ))}
      </div>
    </div>
  )
};

export default App;