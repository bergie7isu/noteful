import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import NoNoteSidebar from './NoNoteSidebar/NoNoteSidebar';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import NoNoteMain from './NoNoteMain/NoNoteMain';
import NoteMain from './NoteMain/NoteMain';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import config from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      folders: [],
      notes: []
    };
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT + '/api/folders')
      .then(foldersResponse => {
        if (!foldersResponse.ok) {
          throw new Error(foldersResponse.status)
        }
        return foldersResponse.json()
      })
      .then(folders => {
        this.setState({folders})
      })
      .catch(folderError => this.setState({ folderError }))
    fetch(config.API_ENDPOINT + '/api/notes')
      .then(notesResponse => {
        if (!notesResponse.ok) {
          throw new Error(notesResponse.status)
        }
        return notesResponse.json()
      })
      .then(notes => {
        this.setState({notes})
      })
      .catch(noteError => this.setState({ noteError }))
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  }

  renderSidebarRoutes() {
    return (
      <>
        {['/', '/add-folder', '/add-note', '/folder/:folder_id'].map(path =>
            <Route
              exact
              path={path}
              key={path}
              component={NoNoteSidebar}
            />
        )}
        <Route
            path='/note/:noteId'
            component={NoteSidebar}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folder_id'].map(path =>
          <Route
              exact
              path={path}
              key={path}
              component={NoNoteMain}
          />
        )}
        <Route
            path='/note/:noteId'
            component={NoteMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };
    return (
      <NotefulContext.Provider value={contextValue}>
        <main className='App'>
          <header>
            <Link to='/'>
              <h1 className='main-title'>
                Noteful
              </h1>
            </Link>
          </header>
          <div className='sidebar'>
            {this.renderSidebarRoutes()}
          </div>
          <div className='main'>
            {this.renderMainRoutes()}
          </div>
        </main>
      </NotefulContext.Provider>
    );
  }
}

export default App;