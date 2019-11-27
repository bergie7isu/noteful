import React, { Component } from 'react';

class NotefulError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>There's an issue. Everybody panic!</h2>
            );
        }
        return this.props.children
    }
}

export default NotefulError;