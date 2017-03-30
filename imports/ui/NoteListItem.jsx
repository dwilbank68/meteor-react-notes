import React, { PropTypes } from 'react';
import moment from 'moment';


const NoteListItem = ({note}) => {
    // no lifecycle methods
    // no refs

    // const methodName = (e) => {
    //     //
    // }

    return (
        <div className="note-list-item">
            <h5>{note.title || 'Untitled note'}</h5>
            <p>{moment(note.updatedAt).format('M/DD/YY')}</p>

        </div>
    );
};


// NoteListItem.defaultProps = {};
NoteListItem.propTypes = {
    note:        PropTypes.object.isRequired,
//     hndleIptChg: PropTypes.func,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     todos:       PropTypes.array,
//     isComplete:  PropTypes.bool,
//     id:          PropTypes.number,
//     date:        PropTypes.instanceOf(Date)
};
//
// PropTypes -> array, bool, func, number, object, string, symbol

export default NoteListItem;
