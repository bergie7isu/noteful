import React, { Component } from 'react';
import './NoteSidebar.css';
import NotefulContext from '../NotefulContext';

class NoteSidebar extends Component {
    static contextType = NotefulContext;
    render() {
        const { folders, notes } = this.context;
        const selectedNote = notes.filter(note => Number(note.id) === Number(this.props.match.params.noteId));
        const originFolderId = selectedNote.length !== 0
            ? selectedNote[0].folder_id
            : '';
        const originFolder = selectedNote.length !== 0
            ? folders.filter(folder => folder.id === originFolderId)
            : '';
        const originFolderName = selectedNote.length !== 0
            ? originFolder[0].name
            : '';
        return (
            <div className='notesidebar'>
                <div className='folder-of-note'>
                    This note is from the <span className='origin-folder'>{originFolderName}</span> folder.
                </div>
                <button
                    className='go-back'
                    onClick={() => this.props.history.goBack()}>
                        Go Back
                </button>
            </div>
        );
    };
}

export default NoteSidebar;