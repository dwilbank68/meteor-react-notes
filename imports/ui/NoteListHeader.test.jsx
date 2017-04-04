import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import {NoteListHeader} from './NoteListHeader';
import {notes} from '../fixtures/fixtures';

if (Meteor.isClient) {

    describe('NoteListHeader', function() {
        let meteorCallSpy;
        let SessionSpyObj;

        beforeEach(function(){
            meteorCallSpy = expect.createSpy();
            SessionSpyObj = {
                set: expect.createSpy()
            }
        })
        
        it('should call meteorCall on click', function () {
            const meteorCallSpy = expect.createSpy();
            const wrapper =  mount(
                <NoteListHeader meteorCall={meteorCallSpy} Session={SessionSpyObj}/>

            );
            wrapper.find('button').simulate('click');

            meteorCallSpy.calls[0].arguments[1](undefined, notes[0]._id);
            // expect(meteorCallSpy).toHaveBeenCalledWith('notes.insert');
            expect(meteorCallSpy.calls[0].arguments[0]).toBe('notes.insert');
            expect(SessionSpyObj.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
        });

        it('should not set Session upon a failed insert', function () {
            const meteorCallSpy = expect.createSpy();
            const wrapper =  mount(
                <NoteListHeader meteorCall={meteorCallSpy} Session={SessionSpyObj}/>

            );
            wrapper.find('button').simulate('click');

            meteorCallSpy.calls[0].arguments[1]({}); // firing callback with error object

            expect(meteorCallSpy.calls[0].arguments[0]).toBe('notes.insert');
            expect(SessionSpyObj.set).toNotHaveBeenCalled;
        });

    });

}

// testing text in the DOM - set via props
//
// it('should render title and timestamp', function () {
//     const title = 'bloop';
//     const updatedAt = 1490828081395;
//     const wrapper =  mount(<NoteListHeader note={{title, updatedAt}}/>);
//     expect(wrapper.find('h5').text()).toBe(title);
//     expect(wrapper.find('p').text()).toBe('3/29/17');
// });
//
// it('should set default title if no title provided', function () {
//     const updatedAt = 1490828081395;
//     const wrapper =  mount(<NoteListHeader note={{updatedAt}}/>);
//     expect(wrapper.find('h5').text()).toBe('Untitled note');
//     expect(wrapper.find('p').text()).toBe('3/29/17');
// });


// testing text in the DOM - set via state of the component
//
// it('should show error messages', function () {
//     const error = 'You screwed up';
//     const wrapper =  mount(<NoteListHeader someFunc={() => {}}/>);
//     wrapper.setState({error});
//     expect(wrapper.find('p').text()).toBe(error);
//     wrapper.setState({error:''});
//     expect(wrapper.find('p').length).toBe(0);
// });

// testing function calls in the component
//
// it('should call someFunc with form data', function () {
//     const email = 'example@password.com';
//     const password = 'password123';
//     const loginSpy = expect.createSpy();
//     const wrapper =  mount(<NoteListHeader someFunc={loginSpy}/>);
//     wrapper.ref('email').node.value = email;
//     wrapper.ref('password').node.value = password;
//     wrapper.find('form').simulate('submit');
//     expect(loginSpy.calls[0].arguments[0]).toEqual({email});
//     expect(loginSpy.calls[0].arguments[1]).toEqual(password);
// });
//
// it('should set someFunc callback errors', function () {
//     const loginSpy = expect.createSpy();
//     const wrapper =  mount(<NoteListHeader someFunc={loginSpy}/>);
//
//     wrapper.find('form').simulate('submit');
//
//     loginSpy.calls[0].arguments[2]({});  // simulating an error object
//     expect(wrapper.state('error')).toNotBe('');
//
//     loginSpy.calls[0].arguments[2]();    // simulating no error object
//     expect(wrapper.state('error')).toBe('');
// });