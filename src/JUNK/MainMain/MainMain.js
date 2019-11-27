import React, { Component } from 'react';
import './MainMain.css';
import Note from '../Note/Note';

class MainMain extends Component {
    render() {
        return (
            <div className='mainmain'>
                This is the MainMain Component
                {this.props.notes.map(note =>
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

export default MainMain;