import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './Main.css';
import MainMain from '../MainMain/MainMain';
import FolderMain from '../FolderMain/FolderMain';
import NoteMain from '../NoteMain/NoteMain';

class Main extends Component {
    render() {
        return (
            <div className='main'>
                <Route
                    exact path='/'
                    render={() => <MainMain notes={this.props.notes} />}
                />
                <Route
                    path='/folder'
                    render={() => <FolderMain notes={this.props.notes} />}
                />
                <Route
                    path='/note'
                    render={() => <NoteMain notes={this.props.notes} />}
                />
            </div>
        );
    };
}

export default Main;