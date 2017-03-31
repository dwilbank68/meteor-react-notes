import React, { PropTypes } from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import moment from 'moment';
import {Session} from 'meteor/session';

export const NoteListItem = ({note, Session}) => {

    return (
        <div    className="note-list-item"
                onClick={() => {Session.set('selectedNoteId',note._id)}}>
            <h5>{note.title || 'Untitled note'}</h5>
            {note.selected ? 'selected' : undefined}
            <p>{moment(note.updatedAt).format('M/DD/YY')}</p>

        </div>
    );
};

NoteListItem.propTypes = {
    note:       PropTypes.object.isRequired,
    Session:    PropTypes.object.isRequired
};

export default createContainer(
    () => {
        return { Session }
    },
    NoteListItem
);