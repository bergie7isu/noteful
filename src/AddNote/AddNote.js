import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';

class AddNote extends Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            noteName: {
                value: "",
                touched: false
            },
            noteContent: {
                value: "",
                touched: false
            },
            noteFolder: {
                value: "--Select a folder!--",
                touched: false
            }
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const folder = this.context.folders.filter(folder => folder.name.trim() === event.target['note-folder'].value.trim());
        const note = {name: event.target['note-name'].value,
            modified: new Date().toISOString(),
            folder_id: folder[0].id,
            content: event.target['note-content'].value,
            };
        fetch(`http://localhost:8000/api/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)}
            return response.json()
        })
        .then(jsonNote => {
            this.context.addNote(jsonNote);
            this.props.history.push(`/folder/${jsonNote.folder_id}`)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    updateNoteName(noteName) {
        this.setState({
            noteName: {
                value: noteName,
                touched: true
            }
        });
    }

    updateNoteContent(noteContent) {
        this.setState({
            noteContent: {
                value: noteContent,
                touched: true
            }
        });
    }

    updateNoteFolder(noteFolder) {
        this.setState({
            noteFolder: {
                value: noteFolder,
                touched: true
            }
        });
    }

    validateNoteName() {
        const noteName = this.state.noteName.value.trim();
        if (noteName.length < 4) {
            return "The note name must be at least 4 characters long!"
        }
    }

    validateNoteContent() {
        const noteContent = this.state.noteContent.value.trim();
        if (noteContent.length === 0) {
            return "This note doesn't have any content!"
        }
    }

    validateNoteFolder() {
        const noteFolder = this.state.noteFolder.value.trim();
        if (noteFolder === "--Select a folder!--") {
            return "Select a folder!"
        }
    }

    render() {
        const { folders } = this.context;
        const noteNameError = this.validateNoteName();
        const noteContentError = this.validateNoteContent();
        const noteFolderError = this.validateNoteFolder();

        return (
            <div>
                <h2>Add a Note!</h2>
                <form
                    className="add-note-form"
                    onSubmit={this.handleSubmit}>
                        <div className='add-note-inputs'>
                            <div className='add-note-name'>
                                <label htmlFor='note-name'>
                                    What should we call the note?
                                </label>
                                <input
                                    type='string'
                                    name='note-name'
                                    id='note-name'
                                    placeholder='Give me a name!'
                                    onChange={e => this.updateNoteName(e.target.value)}/>
                            </div>
                            {this.state.noteName.touched && <ValidationError message={noteNameError} />}
                            <div className='add-note-content'>
                                <label htmlFor='note-content'>
                                    What's the content of this note?
                                </label>
                                <textarea
                                    type='string'
                                    name='note-content'
                                    id='note-content'
                                    placeholder='Give me some content!'
                                    onChange={e => this.updateNoteContent(e.target.value)}/>
                            </div>
                            {this.state.noteContent.touched && <ValidationError message={noteContentError} />}
                            <div className='add-note-folder'>
                                <label htmlFor='note-folder'>
                                    What folder should we put this note in?
                                </label>
                                <select
                                    type='string'
                                    name='note-folder'
                                    id='note-folder'
                                    onChange={e => this.updateNoteFolder(e.target.value)}>
                                        <option>--Select a folder!--</option>
                                        {folders.map(folder =>
                                            <option
                                                key={folder.id}>
                                                    {folder.name}
                                            </option>
                                        )}
                                </select>
                            </div>
                            {this.state.noteFolder.touched && <ValidationError message={noteFolderError} />}
                        </div>
                        <div className='add-note-buttons'>
                            <button
                                type='submit'
                                disabled={
                                    this.validateNoteName() ||
                                    this.validateNoteContent() ||
                                    this.validateNoteFolder()
                                }>
                                    Add Note!
                            </button>
                            {'  '}
                            <button
                                type='button'
                                onClick={() => this.props.history.goBack()}>
                                    Cancel
                            </button>
                        </div>
                </form>
            </div>
        );
    };
}

export default AddNote;