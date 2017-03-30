import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount, shallow} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient) {

    describe('PrivateHeader', function() {

        it('should set button text to logout', function () {
            const wrapper =  mount(<PrivateHeader title="test title"/>);
            // ...
        });

        it('should call handleLogout upon click', function () {
            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title="x" handleLogout={spy}/>);
            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalled();
        });

    });

}