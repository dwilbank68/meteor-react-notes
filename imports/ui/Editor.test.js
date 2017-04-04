import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import {Editor} from './Editor';
import {notes} from '../fixtures/fixtures';
// import Editor from './Editor';

if (Meteor.isClient) {

    describe('Editor', function() {

        let browHistSpy;
        let callSpy;

        beforeEach(function(){
            callSpy = expect.createSpy();
            browHistSpy = {
                push: expect.createSpy()
            }
        })

        it('should render pick note message', function () {
            const wrapper =  mount(
                <Editor  browserHistory={browHistSpy} call={callSpy}/>
            );
            expect(wrapper.find('p').text()).toBe('Pick or create a note');
        });

        it('should render note not found', function () {
            const wrapper =  mount(
                <Editor browserHistory={browHistSpy}
                        call={callSpy}
                        selectedNoteId={'nonExistingId'}/>
            );
            expect(wrapper.find('p').text()).toBe('Note not found');
        });

        it('should remove note', function () {
            const wrapper =  mount(
                <Editor browserHistory={browHistSpy}
                        call={callSpy}
                        selectedNoteId={notes[0]._id}
                        note={notes[0]}/>
            );
            wrapper.find('button').simulate('click');
            expect(callSpy).toHaveBeenCalledWith('notes.remove', notes[0]._id);
            expect(browHistSpy.push).toHaveBeenCalledWith('/dashboard');
        });

        it('should update note body when textarea changes', function () {
            const wrapper =  mount(
                <Editor browserHistory={browHistSpy}
                        call={callSpy}
                        selectedNoteId={notes[0]._id}
                        note={notes[0]}/>
            );
            const newBodyText = 'this is the new body text';
            const eventObj = {
                target:{
                    value: newBodyText
                }
            }
            wrapper.find('textarea').simulate('change', eventObj);
            expect(wrapper.state('body')).toBe(newBodyText);
            expect(callSpy).toHaveBeenCalledWith(
                'notes.update', notes[0]._id, {body: newBodyText}
            );
        });

        it('should update note title when input changes', function () {
            const wrapper =  mount(
                <Editor browserHistory={browHistSpy}
                        call={callSpy}
                        selectedNoteId={notes[0]._id}
                        note={notes[0]}/>
            );
            const newTitleText = 'this is the new title';
            const eventObj = {
                target:{
                    value: newTitleText
                }
            }
            wrapper.find('input').simulate('change', eventObj);
            expect(wrapper.state('title')).toBe(newTitleText);
            expect(callSpy).toHaveBeenCalledWith(
                'notes.update', notes[0]._id, {title: newTitleText}
            );
        });

        it('should set state for new note', function () {
            const wrapper =  mount(
                <Editor  browserHistory={browHistSpy} call={callSpy}/>
            );

            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            })
            expect(wrapper.state('title')).toBe(notes[0].title);
            expect(wrapper.state('body')).toBe(notes[0].body);
        });

        it('should not set state when no note prop', function () {
            const wrapper =  mount(
                <Editor  browserHistory={browHistSpy} call={callSpy}/>
            );

            wrapper.setProps({
                selectedNoteId: notes[0]._id
            })
            expect(wrapper.state('title')).toBe('');
            expect(wrapper.state('body')).toBe('');
        });

    });

}

// testing text in the DOM - set via props
//
// it('should render title and timestamp', function () {
//     const title = 'bloop';
//     const updatedAt = 1490828081395;
//     const wrapper =  mount(<Editor note={{title, updatedAt}}/>);
//     expect(wrapper.find('h5').text()).toBe(title);
//     expect(wrapper.find('p').text()).toBe('3/29/17');
// });
//
// it('should set default title if no title provided', function () {
//     const updatedAt = 1490828081395;
//     const wrapper =  mount(<Editor note={{updatedAt}}/>);
//     expect(wrapper.find('h5').text()).toBe('Untitled note');
//     expect(wrapper.find('p').text()).toBe('3/29/17');
// });


// testing text in the DOM - set via state of the component
//
// it('should show error messages', function () {
//     const error = 'You screwed up';
//     const wrapper =  mount(<Editor someFunc={() => {}}/>);
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
//     const wrapper =  mount(<Editor someFunc={loginSpy}/>);
//     wrapper.ref('email').node.value = email;
//     wrapper.ref('password').node.value = password;
//     wrapper.find('form').simulate('submit');
//     expect(loginSpy.calls[0].arguments[0]).toEqual({email});
//     expect(loginSpy.calls[0].arguments[1]).toEqual(password);
// });
//
// it('should set someFunc callback errors', function () {
//     const loginSpy = expect.createSpy();
//     const wrapper =  mount(<Editor someFunc={loginSpy}/>);
//
//     wrapper.find('form').simulate('submit');
//
//     loginSpy.calls[0].arguments[2]({});  // simulating an error object
//     expect(wrapper.state('error')).toNotBe('');
//
//     loginSpy.calls[0].arguments[2]();    // simulating no error object
//     expect(wrapper.state('error')).toBe('');
// });

// https://github.com/mjackson/expect
//
// BOOLEAN - TRUTHY, FALSY - check for null
//     .toExist()		-> or ->	toBeTruthy()
//     .toNotExist()	-> or ->	toBeFalsy()
//     .toBe(true)
//     .toBe(false)
//
// STRICT EQUALITY (===)
//     .toBe( 		val, 	[msg] )
//     .toNotBe( 	val, 	[msg] )
//
// ARRAYS AND OBJECTS
//     .toEqual(		val, [msg])
//     .toNotEqual(	val, [msg])
//     .toInclude(	val, [msg])		-> or -> toContain()
//     .toIncludeKey()		-> or -> 	toContainKey()
//
//      // expect([ 1, 2, 3 ]).toInclude(3)
//      // expect({ a:1, b:2 }).toInclude({ b:2 })
//      // expect({ a:1, b:2, c:{ d:3 } }).toInclude({ b:2, c:{ d:3 } })
//      // expect('hello world').toInclude('world')
//      // expect({ a:1 }).toIncludeKey('a')
//      // expect({ a:1, b:2 }).toIncludeKeys([ 'a', 'b' ])
//
//     .toExcludeKey(val, [msg])	-> or -> toNotIncludeKey(s), toNotContainKey(s)
//
// THROW ERROR
//     .toThrow()       // takes a function
//     .toNotThrow()    // takes a function
//      // expect(block).toThrow([err], [msg])
//
// TYPE
//     .toBeA(		constructor or string, [msg])	-> or -> toBeAn()
//     .toNotBeA(	constructor or string, [msg])	-> or -> toNotBeAn()
//      // like 'Post' or 'number'
//
// RANGE
//     .toBeGreaterThan(	val, [msg])		-> or -> .toBeMoreThan()
//     .toBeLessThan(		val, [msg])		-> or -> .toBeFewerThan()
//     .toBeGreaterThanOrEqualTo()
//     .toBeLessThanOrEqualTo()
//
// REGEX PATTERN
//     .toMatch(		pattern, [msg])
//     .toNotMatch(	    pattern, [msg])
//      // expect('a string').toMatch(/string/)
//
// SPY
//     const spy = expect.createSpy()
//     .calls                                   -> returns an array of call objects
//     .toHaveBeenCalled(		[msg])
//     .toNotHaveBeenCalled(	[msg])
//     .toHaveBeenCalledWith(	'arg1', 'arg2') -> args must match exactly, not partially