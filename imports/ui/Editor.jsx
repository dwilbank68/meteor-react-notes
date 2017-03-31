import React, { Component, PropTypes } from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';


export class Editor extends Component {

    constructor(props, context){
        super(props, context);
    //     this.state = {
    //         'whatever':{}
    //     }
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    handleBodyChange(e){
        this.props.call(
            'notes.update',
            this.props.note._id,
            { body: e.target.value}
        )
    }

    handleTitleChange(e){
        this.props.call(
            'notes.update',
            this.props.note._id,
            { title: e.target.value}
        )
    }

    render() {

        if (this.props.note) {
            return (
                <div className="editor">
                    <input      type="text"
                                value={this.props.note.title}
                                placeholder="Your title here"
                                onChange={this.handleTitleChange}/>
                    <textarea   value={this.props.note.body}
                                placeholder="Your note here"
                                onChange={this.handleBodyChange}/>
                    <button>Delete Note</button>
                </div>
            );
        } else {
            let msg = this.props.selectedNoteId ?
                'Note not found':
                'Pick or create a note';
            return <p> {msg} </p>
        }

    }
}

// Editor.defaultProps = {};
Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note:           PropTypes.object
};

export default createContainer(
    () => {
        const selectedNoteId = Session.get('selectedNoteId');
        return {
            call: Meteor.call,
            selectedNoteId,
            note: Notes.findOne(selectedNoteId)
        }
    },
    Editor
);