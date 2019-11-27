import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './Sidebar.css';
import MainSidebar from '../MainSidebar/MainSidebar';
import FolderSidebar from '../FolderSidebar/FolderSidebar';
import NoteSidebar from '../NoteSidebar/NoteSidebar';

class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <Route
                    exact path='/'
                    render={() => <MainSidebar
                                    folders={this.props.folders}
                                    handleFolderClick={folderId => this.props.handleFolderClick(folderId)}
                                    clickedFolderId={this.props.clickedFolderId} />}
                />
                <Route
                    path='/folder'
                    render={() => <FolderSidebar folders={this.props.folders} />}
                />
                <Route
                    path='/note'
                    render={() => <NoteSidebar folders={this.props.folders} />}
                />
            </div>
        );
    };
}

export default Sidebar;