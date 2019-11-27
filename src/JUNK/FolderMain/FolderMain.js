import React, { Component } from 'react';
import './FolderMain.css';
import Note from '../Note/Note';

class FolderMain extends Component {
    render() {
        const notes = this.props.notes.filter(note => note.folderId === this.props.match.params.folderId);
        //console.log(this.props.match.params.folderId);
        return (
            <div className='foldermain'>
                This is the FolderMain Component
                {notes.map(note =>
                    <Note
                        notetitle={note.name}
                        key={note.id}
                        noteModified={note.modified}
                    />
                )}
                <button>Add Note</button>
            </div>
        );
    };
}

export default FolderMain;