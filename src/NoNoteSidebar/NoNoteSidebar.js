import React, { Component } from 'react';
import './NoNoteSidebar.css';
import Folder from '../Folder/Folder';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';

class NoNoteSidebar extends Component {
    static contextType = NotefulContext;
    render() {
        const { folders } = this.context;
        return (
            <div className='no-note-sidebar'>
                {folders.map(folder =>
                    <Folder
                        folderName={folder.name}
                        key={folder.id}
                        id={folder.id}
                    />
                )}
                <Link to={'/add-folder'}>
                    <button
                        className='add-folder'>
                            Add Folder
                    </button>
                </Link>
            </div>
        );
    };
}

export default NoNoteSidebar;