import React, { Component, PropTypes } from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {browserHistory} from 'react-router'
import {Notes} from '../api/notes';


export class Editor extends Component {

    componentDidUpdate(prevProps, prevState, prevContext) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            })
        }
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            title:'',
            body:''
        }
        this.deleteNote = this.deleteNote.bind(this)
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    deleteNote(){
        this.props.call(
            'notes.remove',
            this.props.note._id
        )
        this.props.browserHistory.push('/dashboard');
        // this.props.router.push('/dashboard');
    }

    handleBodyChange(e){
        const body = e.target.value;
        this.setState({body});
        this.props.call(
            'notes.update',
            this.props.note._id,
            {body}
        )
    }

    handleTitleChange(e){
        const title = e.target.value;
        this.setState({title});
        this.props.call(
            'notes.update',
            this.props.note._id,
            {title}
        )
    }

    render() {

        if (this.props.note) {
            return (
                <div className="editor">
                    <input      className="editor__title"
                                value={this.state.title}
                                placeholder="Your title here"
                                onChange={this.handleTitleChange}/>
                    <textarea   className="editor__body"
                                value={this.state.body}
                                placeholder="Your note here"
                                onChange={this.handleBodyChange}/>
                    <div>
                        <button className="button button--secondary"
                                onClick={this.deleteNote}>
                            Delete Note
                        </button>
                    </div>
                </div>
            );
        } else {
            let msg = this.props.selectedNoteId ?
                'Note not found':
                'Pick or create a note';
            return (
                <div className="editor">
                    <p className="editor__message">{msg}</p>
                </div>
            )
        }

    }
}

// Editor.defaultProps = {};
Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note:           PropTypes.object,
    call:           PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
};

export default createContainer(
    () => {
        const selectedNoteId = Session.get('selectedNoteId');
        return {
            call: Meteor.call,
            selectedNoteId,
            note: Notes.findOne(selectedNoteId),
            browserHistory
        }
    },
    Editor
);