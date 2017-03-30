import React, { PropTypes } from 'react';

const NoteListEmptyItem = (props) => {

    return (
        <div className="note-list-empty-item">
            <h5>You have no notes</h5>
            <p>Create a note to get started</p>
        </div>
    );
};

export default NoteListEmptyItem;
