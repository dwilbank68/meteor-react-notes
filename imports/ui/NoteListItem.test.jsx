import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {

    describe('NoteListItem', function() {

        it('should render title and timestamp', function () {
            const title = 'bloop';
            const updatedAt = 1490828081395;
            const wrapper =  mount(<NoteListItem note={{title, updatedAt}}/>);
            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('3/29/17');
        });

        it('should set default title if no title provided', function () {
            const updatedAt = 1490828081395;
            const wrapper =  mount(<NoteListItem note={{updatedAt}}/>);
            expect(wrapper.find('h5').text()).toBe('Untitled note');
            expect(wrapper.find('p').text()).toBe('3/29/17');
        });

    });

}
