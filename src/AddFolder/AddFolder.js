import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';

class AddFolder extends Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            folderName: {
                value: "",
                touched: false
            }
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const folder = {name: event.target['folder'].value};
        fetch(`http://localhost:8000/api/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)}
            return response.json()
        })
        .then(jsonFolder => {
            this.context.addFolder(jsonFolder);
            this.props.history.push(`/folder/${jsonFolder.id}`)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    updateFolderName(folderName) {
        this.setState({
            folderName: {
                value: folderName,
                touched: true
            }
        });
    }

    validateFolderName() {
        const folderName = this.state.folderName.value.trim();
        if (folderName.length < 4) {
            return "Folder name must be at least 4 characters long!"
        }
    }

    render() {
        const folderNameError = this.validateFolderName();
        return (
            <div>
                <h2>Add a Folder!</h2>
                <form
                    className="add-folder-form"
                    onSubmit={this.handleSubmit}>
                        <div className='add-folder-inputs'>
                            <label htmlFor='folder'>
                                What should we call this folder?
                            </label>
                            <input
                                type='string'
                                name='folder'
                                id='folder'
                                placeholder='Give me a name!'
                                onChange={e => this.updateFolderName(e.target.value)}/>
                        </div>
                        {this.state.folderName.touched && <ValidationError message={folderNameError} />}
                        <div className='add-folder-buttons'>
                            <button
                                type='submit'
                                disabled={this.validateFolderName()}>
                                    Add Folder!
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

export default AddFolder;