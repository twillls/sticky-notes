import React from "react";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";

function NoteCard(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    props.onEdit(props.id);
  }

  return (
    <div className="note">
      <div className="note-header">
        <h2>{props.title}</h2>
        <button onClick={handleEdit}>
          Edit
        </button>
        <button onClick={handleClick}>
          Delete
        </button>
      </div>
      <p>{props.content}</p>

    </div>
  );
}

export default NoteCard;