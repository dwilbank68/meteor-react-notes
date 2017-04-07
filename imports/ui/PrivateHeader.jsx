import React, { PropTypes } from 'react';
import {Session} from 'meteor/session';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';

export const PrivateHeader = ({title, handleLogout, handleNavToggle, isNavOpen}) => {
    const navImgSrc = isNavOpen ? '/images/x.svg':'/images/bars.svg';
    return (
        <div className="private-header header">
            <div className="header__content">
                <img    className="header__nav-toggle"
                        onClick={handleNavToggle}
                        src={navImgSrc} />
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
    handleLogout:   PropTypes.func.isRequired,
    handleNavToggle:PropTypes.func.isRequired,
    isNavOpen:      PropTypes.bool.isRequired
};

export default createContainer(
    () => {
        return {
            handleLogout: () => Accounts.logout(),
            handleNavToggle: () => {
                const navStatus = Session.get('isNavOpen');
                Session.set('isNavOpen', !navStatus);
            },
            isNavOpen: Session.get('isNavOpen')
        };
    },
    PrivateHeader
)
// export default PrivateHeader;

