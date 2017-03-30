import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import {NoteList} from './NoteList';  // if export const

import {notes} from '../fixtures/fixtures';

if (Meteor.isClient) {

    describe('NoteList', function () {

        it('should render NoteListItem for each note', function () {
            const wrapper = mount(<NoteList notes={notes}/>);
            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });

        it('should render NoteListEmptyItem if no notes', function () {
            const wrapper = mount(<NoteList notes={[]}/>);
            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });

    });

}

// testing text in the DOM - set via props
//
// it('should render title and timestamp', function () {
//     const title = 'bloop';
//     const updatedAt = 1490828081395;
//     const wrapper =  mount(<NoteList note={{title, updatedAt}}/>);
//     expect(wrapper.find('h5').text()).toBe(title);
//     expect(wrapper.find('p').text()).toBe('3/29/17');
// });
//
// it('should set default title if no title provided', function () {
//     const updatedAt = 1490828081395;
//     const wrapper =  mount(<NoteList note={{updatedAt}}/>);
//     expect(wrapper.find('h5').text()).toBe('Untitled note');
//     expect(wrapper.find('p').text()).toBe('3/29/17');
// });


// testing text in the DOM - set via state of the component
//
// it('should show error messages', function () {
//     const error = 'You screwed up';
//     const wrapper =  mount(<NoteList someFunc={() => {}}/>);
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
//     const wrapper =  mount(<NoteList someFunc={loginSpy}/>);
//     wrapper.ref('email').node.value = email;
//     wrapper.ref('password').node.value = password;
//     wrapper.find('form').simulate('submit');
//     expect(loginSpy.calls[0].arguments[0]).toEqual({email});
//     expect(loginSpy.calls[0].arguments[1]).toEqual(password);
// });
//
// it('should call meteorCall on click', function () {
//     const meteorCallSpy = expect.createSpy();
//     const wrapper =  mount(<NoteListHeader meteorCall={meteorCallSpy}/>);
//     wrapper.find('button').simulate('click');
//     expect(meteorCallSpy).toHaveBeenCalledWith('notes.insert');
// });

// it('should set someFunc callback errors', function () {
//     const loginSpy = expect.createSpy();
//     const wrapper =  mount(<NoteList someFunc={loginSpy}/>);
//
//     wrapper.find('form').simulate('submit');
//
//     loginSpy.calls[0].arguments[2]({});  // simulating an error object
//     expect(wrapper.state('error')).toNotBe('');
//
//     loginSpy.calls[0].arguments[2]();    // simulating no error object
//     expect(wrapper.state('error')).toBe('');
// });