import React, {PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Notes} from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem.jsx';

// const NoteList = (props) => {
export const NoteList = ({notes}) => {


    // const methodName = (e) => {
    //     //
    // }

    return (
        <div className="note-list">
            <NoteListHeader/>
            NoteList {notes.length}
            {
                notes.map((note, i) => {
                    return (
                        <NoteListItem key={note._id} note={note}/>
                    )
                })
            }
        </div>
    );
};


// NoteList.defaultProps = {};
NoteList.propTypes = {
//     name:        PropTypes.string.isRequired,
//     hndleIptChg: PropTypes.func,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
    notes:       PropTypes.array.isRequired
//     isComplete:  PropTypes.bool,
//     id:          PropTypes.number,
//     date:        PropTypes.instanceOf(Date)
};
//
// PropTypes -> array, bool, func, number, object, string, symbol


export default createContainer(
    () => {
        Meteor.subscribe('notes');
        return {
            notes: Notes.find().fetch()
        };
    },
    NoteList
);
