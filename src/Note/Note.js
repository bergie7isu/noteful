import React, { Component } from 'react';
import './Note.css';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import NotefulError from '../NotefulError/NotefulError';
import PropTypes from 'prop-types';

class Note extends Component {
    static contextType = NotefulContext;

    static defaultProps ={
        onDeleteNote: () => {},
    }

    handleDeleteClick = e => {
        e.preventDefault();
        const noteId = this.props.id;
        fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(res.status)}
            })
            .then(() => {
              this.context.deleteNote(noteId)
              this.props.onDeleteNote()
            })
            .catch(error => {
              console.error({ error })
            })
    }

    render() {
        return (
            <NotefulError>
                <div className='note'>
                    <NavLink to={`/note/${this.props.id}`}>
                        <div className='note-title'>
                            {this.props.noteTitle}
                        </div>
                    </NavLink>
                    <div className='note-date-modified'>
                        Date Modified: {moment(this.props.noteModified).format('L')}
                    </div>
                    <button
                        className='delete-note'
                        onClick={this.handleDeleteClick}>
                            Delete Note
                    </button>
                </div>
            </NotefulError>
        );
    };
}

Note.propTypes = {
    noteTitle: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    noteModified: PropTypes.string.isRequired
}

export default Note;