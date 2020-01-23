import React, { Component } from 'react';
import './NoNoteMain.css';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';

class NoNoteMain extends Component {
    static contextType = NotefulContext;

    static defaultProps ={
        onDeleteNote: () => {},
    }

    handleDeleteNote = () => {
    }

    render() {
        const { notes } = this.context;
        const notesFiltered = this.props.match.params.folder_id === undefined
            ? notes
            : notes.filter(note => Number(note.folder_id) === Number(this.props.match.params.folder_id));
        return (
            <div className='no-note-main'>
                {notesFiltered.map(note =>
                    <Note
                        noteTitle={note.name}
                        key={note.id}
                        id={note.id}
                        noteModified={note.modified}
                        onDeleteNote={this.handleDeleteNote}
                    />
                )}
                <Link to={'/add-note'}>
                    <button
                        className='add-note'>
                            Add Note
                    </button>
                </Link>
            </div>
        );
    };
}

export default NoNoteMain;