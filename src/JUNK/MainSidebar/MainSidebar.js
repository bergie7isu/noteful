import React, { Component } from 'react';
import './MainSidebar.css';
import Folder from '../Folder/Folder';

class MainSidebar extends Component {
    render() {
        return (
            <div className='mainsidebar'>
                This is the MainSidebar Component
                {this.props.folders.map(folder =>
                    <Folder
                        foldername={folder.name}
                        key={folder.id}
                        id={folder.id}
                    />
                )}
                <button>Add Folder</button>
            </div>
        );
    };
}

export default MainSidebar;