import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css';
import NotefulError from '../NotefulError/NotefulError';
import PropTypes from 'prop-types';

class Folder extends Component {
    render() {
        return (
            <NotefulError>
                <NavLink to={`/folder/${this.props.id}`} className='folder'>
                    {this.props.folderName}
                </NavLink>
            </NotefulError>
        );
    };
}

Folder.propTypes = {
    id: PropTypes.number.isRequired,
    folderName: PropTypes.string.isRequired
}

export default Folder;