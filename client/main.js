import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {routes, onAuthChange} from '../imports/routes/routes.jsx';

import '../imports/startup/simpl-schema-configuration.js';

Tracker.autorun(() => {
    const isAuth = !!Meteor.userId();
    onAuthChange(isAuth);
})



Meteor.startup(() => {
    ReactDOM.render(
        routes,
        document.getElementById('app')
    );
});

