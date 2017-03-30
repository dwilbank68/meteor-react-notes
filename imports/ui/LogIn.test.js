import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import {LogIn} from './LogIn';

if (Meteor.isClient) {

    describe('LogIn', function() {

        it('should show error messages', function () {
            const error = 'You screwed up';
            const wrapper =  mount(<LogIn loginWithPassword={() => {}}/>);
            wrapper.setState({error});
            expect(wrapper.find('p').text()).toBe(error);
            wrapper.setState({error:''});
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call loginWithPassword with form data', function () {
            const email = 'example@password.com';
            const password = 'password123';
            const loginSpy = expect.createSpy();
            const wrapper =  mount(<LogIn loginWithPassword={loginSpy}/>);
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');
            expect(loginSpy.calls[0].arguments[0]).toEqual({email});
            expect(loginSpy.calls[0].arguments[1]).toEqual(password);
        });

        it('should set loginWithPassword callback errors', function () {
            const loginSpy = expect.createSpy();
            const wrapper =  mount(<LogIn loginWithPassword={loginSpy}/>);

            wrapper.find('form').simulate('submit');

            loginSpy.calls[0].arguments[2]({});  // simulating an error object
            expect(wrapper.state('error')).toNotBe('');

            loginSpy.calls[0].arguments[2]();    // simulating no error object
            expect(wrapper.state('error')).toBe('');
        });


    });

}