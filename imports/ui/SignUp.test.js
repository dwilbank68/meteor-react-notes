import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import {SignUp} from './SignUp';

if (Meteor.isClient) {

    describe('SignUp', function() {

        it('should show error messages', function () {
            const error = 'You screwed up';
            const wrapper =  mount(<SignUp createUser={() => {}}/>);
            wrapper.setState({error});
            expect(wrapper.find('p').text()).toBe(error);
            wrapper.setState({error:''});
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call createUser with form data', function () {
            const email = 'example@password.com';
            const password = 'password123';
            const signUpSpy = expect.createSpy();
            const wrapper =  mount(<SignUp createUser={signUpSpy}/>);
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');
            expect(signUpSpy.calls[0].arguments[0]).toEqual({email, password});
        });

        it('should set error if password short', function () {
            const email = 'example@password.com';
            const password = 'not9char        ';
            const signUpSpy = expect.createSpy();
            const wrapper =  mount(<SignUp createUser={signUpSpy}/>);
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');
            expect(wrapper.state('error').length).toBeGreaterThan(0);
        });

        it('should set createUser callback errors', function () {
            // const email = 'not.used';
            const password = 'password123';
            const reason = 'This is why it failed';
            const signUpSpy = expect.createSpy();
            const wrapper =  mount(<SignUp createUser={signUpSpy}/>);

            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');
            signUpSpy.calls[0].arguments[1]({reason});
            expect(wrapper.state('error')).toBe(reason);

            signUpSpy.calls[0].arguments[1]();
            expect(wrapper.state('error')).toBe('');
        });

        // it('should call handleLogout upon click', function () {
        //     const spy = expect.createSpy();
        //     const wrapper = mount(<PrivateHeader title="x" handleLogout={spy}/>);
        //     wrapper.find('button').simulate('click');
        //     expect(spy).toHaveBeenCalled();
        // });

    });

}
