import React, { Component } from 'react';
import './NoteMain.css';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';

class NoteMain extends Component {
    static contextType = NotefulContext;

    handleDeleteNote = () => {
        this.props.history.push(`/`);
    }

    render() {
        const { notes } = this.context;
        const selectedNote = notes.filter(note => Number(note.id) === Number(this.props.match.params.noteId));
        const noteTitle = selectedNote.length !== 0
            ? selectedNote[0].name
            : '';
        const id = selectedNote.length !== 0
            ? selectedNote[0].id
            : '';
        const noteModified = selectedNote.length !== 0
            ? selectedNote[0].modified
            : '';
        const noteContent = selectedNote.length !== 0
            ? selectedNote[0].content
            : '';
        return (
            <div className='notemain'>
                <Note
                    noteTitle={noteTitle}
                    id={id}
                    noteModified={noteModified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className='note-content'>
                    {noteContent}
                </div>
            </div>
        );
    };
}

export default NoteMain;