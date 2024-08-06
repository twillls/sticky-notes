import "../Note.css";
import React, { useState } from "react";
import NoteCard from "./NoteCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NoteApp() {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [values, setValues] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      toast.error("Please fill in the field");
      return;
    }

    if (editIndex === -1) {
      setValues((prevValues) => [...prevValues, note]);
    } else {
      // Update an existing item
      const updatedItems = [...values];
      updatedItems[editIndex] = {
        title: note.title,
        content: note.content
      };
      // Set the value
      setValues(updatedItems);
      // Reset the edit index
      setEditIndex(-1);
    }

    // Reset the note fields
    setNote({
      title: "",
      content: ""
    });

    handleNoteModal(e);
  }

  // Remove note from values array based on index
  const deleteNote = (id) => {
    setValues((prevValues) => prevValues.filter((_, index) => index !== id ));
  };
  
  // Set editIndex and populate note state with selected note's data for editing
  const EditNote = (id) => {
    setEditIndex(id);
    setNote({
      title: values[id].title,
      content: values[id].content
    });

    handleNoteModal();
  };

  const handleNoteModal = () => {
    document.querySelector('.note-modal').classList.toggle('open');
  }

  return (
    <div className="main">
      <div className="header">
        <h1 className="notes__title">Sticky Notes</h1>
        <button className="add-note" onClick={handleNoteModal}>Add a note</button>
      </div>

      <div className="note-modal">
        <form className="create-note" action="">
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            type="text"
          />
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={3}
            type="text"
          />
          <button onClick={handleSubmit}>
            {editIndex === -1 ? 'Add' : 'Edit'}
          </button>
        </form>
      </div>

      <div className="note-board">
      {values &&
        values.map((item, index) => {
          return (
            <NoteCard
              key={index}
              id={index}
              title={item.title}
              content={item.content}
              onDelete={deleteNote}
              onEdit={() => EditNote(index)}
            />
          );
        })}
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}