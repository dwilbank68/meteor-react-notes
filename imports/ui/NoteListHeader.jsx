import React, { PropTypes } from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

export const NoteListHeader = ({meteorCall}) => {

    const onClick = (e) => {
        meteorCall('notes.insert')
    }

    return (
        <div>
            <button onClick={onClick}>
                Create Note
            </button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall:        PropTypes.func.isRequired,
};

export default createContainer(
    () => {
        return { meteorCall: Meteor.call }
    },
    NoteListHeader
);