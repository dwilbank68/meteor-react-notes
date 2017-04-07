import React, {PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import {Notes} from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem.jsx';
import NoteListEmptyItem from './NoteListEmptyItem.jsx';

export const NoteList = ({notes}) => {

    // const methodName = (e) => {
    //     //
    // }
    const renderNotes = () => {
        if (notes.length > 0) {
            return notes.map((note, i) => {
                return (
                    <NoteListItem key={note._id} note={note}/>
                )
            })
        } else {
           return <NoteListEmptyItem/>
        }
    }

    return (
        <div className="item-list">
            <NoteListHeader/>
            { renderNotes() }
        </div>
    );
};

NoteList.propTypes = {
    notes:       PropTypes.array.isRequired
};

export default createContainer(
    () => {
        const selectedNoteId = Session.get('selectedNoteId');
        Meteor.subscribe('notes');
        return {
            notes: Notes
                .find({}, {sort:{'updatedAt':-1}} )
                .fetch()
                .map((n) => {
                    return {
                        ...n,
                        selected: n._id == selectedNoteId
                    };
                })
        };
    },
    NoteList
);
