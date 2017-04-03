import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Session} from 'meteor/session';


import LogIn from       '../ui/LogIn';
import SignUp from      '../ui/SignUp';
import Dashboard from        '../ui/Dashboard';
import NotFound from    '../ui/NotFound';

window.b = browserHistory;

export const onAuthChange = (isAuth, currentPagePrivacy) => {
    const isUnauthPage =    currentPagePrivacy === 'unauth';
    const isAuthPage =      currentPagePrivacy === 'auth';
    if (isUnauthPage && isAuth) {
        browserHistory.replace('/dashboard');
    } else if (isAuthPage && !isAuth) {
        browserHistory.replace('/');
    }
}

const onEnterNotePage = (nextState) => {
    Session.set('selectedNoteId', nextState.params.id)
}

const onLeaveNotePage = (nextState) => {
    Session.set('selectedNoteId', undefined)
}

export const globalOnChange = (prevState, nextState) => {
    globalOnEnter(nextState);
}

export const globalOnEnter = (nextState) => {
    const numOfRoutes = nextState.routes.length;
    const lastRoute =   nextState.routes[numOfRoutes-1];
    Session.set('currentPagePrivacy', lastRoute.privacy);
}

export const routes = (
    <Router history={browserHistory}>
        <Route onChange={globalOnChange} onEnter={globalOnEnter}>
            <Route path="/"
                   privacy="unauth"
                   component={LogIn}/>
            <Route path="/signup"
                   privacy="unauth"
                   component={SignUp}/>
            <Route path="/dashboard"
                   privacy="auth"
                   component={Dashboard}/>
            <Route  path="/dashboard/:id"
                    privacy="auth"
                    component={Dashboard}
                    onEnter={onEnterNotePage}
                    onLeave={onLeaveNotePage}/>
            <Route path="*"
                   component={NotFound}/>
        </Route>
    </Router>
)