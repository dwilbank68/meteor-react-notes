import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Session} from 'meteor/session';


import LogIn from       '../ui/LogIn';
import SignUp from      '../ui/SignUp';
import Dashboard from        '../ui/Dashboard';
import NotFound from    '../ui/NotFound';

window.b = browserHistory;
const unauthPages = ['/','/signup'];
const authPages =   ['/dashboard'];

export const onAuthChange = (isAuth) => {
    const pathname = browserHistory
        .getCurrentLocation()
        .pathname;
    const isUnauthPage =    unauthPages.includes(pathname);
    const isAuthPage =      authPages.includes (pathname);
    if (isUnauthPage && isAuth) {
        browserHistory.replace('/dashboard');
    } else if (isAuthPage && !isAuth) {
        browserHistory.replace('/');
    }
}

const onEnterPublicPage = () => {
    if (Meteor.userId()){
        browserHistory.replace('/dashboard')
    }
}
const onEnterPrivatePage = () => {
    if (!Meteor.userId()){
        browserHistory.replace('/')
    }
}

const onEnterNotePage = (nextState) => {
    if (!Meteor.userId()){
        browserHistory.replace('/')
    } else {
        Session.set('selectedNoteId', nextState.params.id)
    }
}

export const routes = (
    <Router history={browserHistory}>
        <Route path="/"                 component={LogIn}
               onEnter={onEnterPublicPage}/>
        <Route path="/signup"           component={SignUp}
               onEnter={onEnterPublicPage}/>
        <Route path="/dashboard"        component={Dashboard}
               onEnter={onEnterPrivatePage}/>
        <Route path="/dashboard/:id"    component={Dashboard}
               onEnter={onEnterNotePage}/>
        <Route path="*"                 component={NotFound}
               onEnter={onEnterPrivatePage}/>
    </Router>
)