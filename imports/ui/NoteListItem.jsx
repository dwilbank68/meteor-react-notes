import React, { PropTypes } from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import moment from 'moment';
import {Session} from 'meteor/session';

export const NoteListItem = ({note, Session}) => {

    const className = note.selected ? 'item item--selected':'item';

    return (
        <div    className={className}
                onClick={() => {Session.set('selectedNoteId',note._id)}}>
            <h5 className="item__title">
                {note.title || 'Untitled note'}
            </h5>
            <p className="item__subtitle">
                {moment(note.updatedAt).format('M/DD/YY')}
            </p>
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