import React, { PropTypes } from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

const Dashboard = (props) => {

    return (
        <div className="dashboard">
            <PrivateHeader title="Dashboard"/>
            <div className="page-content">
                <div className="page-content__sidebar">
                    <NoteList/>
                </div>
                <div className="page-content__main">
                    <Editor/>
                </div>
            </div>
        </div>
    );
};


// Link.defaultProps = {};
// Link.propTypes = {
//     name:        PropTypes.string.isRequired,
//     hndleIptChg: PropTypes.func,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     todos:       PropTypes.array,
//     isComplete:  PropTypes.bool,
//     id:          PropTypes.number,
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

export default Dashboard;
