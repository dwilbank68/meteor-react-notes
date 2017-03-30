import React, { PropTypes } from 'react';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';

export const PrivateHeader = ({title, handleLogout}) => {

    return (
        <div className="private-header header">
            <div className="header__content">
                <h1 className="header__title">{title}</h1>
                <button onClick={() => handleLogout()}
                        className="button button--link">
                    Log Out
                </button>
            </div>

        </div>
    );
};

PrivateHeader.propTypes = {
    title:          PropTypes.string.isRequired,
    handleLogout:   PropTypes.func.isRequired
};

export default createContainer(
    () => { return {handleLogout: () => Accounts.logout()} },
    PrivateHeader
)
// export default PrivateHeader;

