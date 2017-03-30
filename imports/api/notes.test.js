import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';


if (Meteor.isServer) {

    describe('notes', function() {

        const note1 = {
            _id:"noteId1",
            title:'my title',
            body:'my body',
            updatedAt: 2,
            userId: 'userId1'
        }
        const note2 = {
            _id:"noteId2",
            title:'my title 2',
            body:'my body 2',
            updatedAt: 3,
            userId: 'userId2'
        }
        beforeEach(function(){
            Notes.remove({});
            Notes.insert(note1);
            Notes.insert(note2);
        });

        describe('notes.insert', function() {

            it('should insert new note', function () {
                const userId = 'testid'
                const _id = Meteor
                                .server
                                .method_handlers['notes.insert']
                                .apply({userId});

                expect(Notes.findOne({_id, userId})).toExist();
            });


            it('should not insert note if not authenticated', function () {
                expect(() => {
                    Meteor.server.method_handlers['notes.insert']();
                }).toThrow();
            });

        });

        describe('notes.remove', function() {

            it('notes.remove', function () {
                it('should remove note', function () {
                    Meteor
                        .server
                        .method_handlers['notes.remove']
                        .apply({userId:note1.userId}, [note1._id]);

                    expect(Notes.findOne({_id:note1._id})).toNotExist();
                });

                it('should not remove note if unauthenticated', function () {
                    expect(() => {
                        Meteor
                            .server
                            .method_handlers['notes.remove']
                            .apply({}, [note1._id]);
                    }).toThrow();
                });

                it('should not remove note if invalid _id', function () {
                    expect(() => {
                        Meteor.server.method_handlers['notes.remove'].apply({userId:note1.userId});
                    }).toThrow();
                });
            });
        });

        describe('notes.update', function() {

            it('should update note', function () {
                const title = 'An updated title';
                Meteor
                    .server
                    .method_handlers['notes.update']
                    .apply(
                        {userId: note1.userId},
                        [note1._id, {title}]
                    );
                const note = Notes.findOne(note1._id);
                expect(note).toInclude({
                    title,
                    body: note1.body
                });
                expect(note.updatedAt).toBeGreaterThan(2);
            });

            it('should throw error if extra updates', function () {
                const title = 'An updated title';
                const adminAccess = true;
                expect(() => {
                    Meteor
                        .server
                        .method_handlers['notes.update']
                        .apply(
                            {userId: note1.userId},
                            [note1._id, {title, adminAccess}]
                        );
                }).toThrow();
            });

            it('should not update note if user was not creator', function () {
                const title = 'An updated title';
                Meteor
                    .server
                    .method_handlers['notes.update']
                    .apply(
                        {userId: 'wrongUser'},
                        [note1._id, {title}]
                    );
                const note = Notes.findOne(note1._id);
                expect(note).toInclude(note1);
            });

            it('should not update note if unauthenticated', function () {
                expect(() => {
                    Meteor
                        .server
                        .method_handlers['notes.update']
                        .apply({}, [note1._id]);
                }).toThrow();
            });

            it('should not update note if invalid _id', function () {
                expect(() => {
                    Meteor
                        .server
                        .method_handlers['notes.update']
                        .apply({userId:note1.userId});
                }).toThrow();
            });

        });

        describe('publications', function() {

            it('should return a users notes', function () {
                const res = Meteor
                                .server
                                .publish_handlers
                                .notes
                                .apply({userId: note1.userId})
                const notes = res.fetch();
                expect(notes.length).toBe(1);
                expect(notes[0]).toEqual(note1);
            });
            it('should return zero notes for user with none', function () {
                const res = Meteor
                    .server
                    .publish_handlers
                    .notes
                    .apply({userId: 'wrongUser'})
                const notes = res.fetch();
                expect(notes.length).toBe(0);
            });
        });

    });

}

