import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

export class LogIn extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            error: ''
        }
       this.onSubmit = this.onSubmit.bind(this)
    }


    onSubmit(e){
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        this.props.loginWithPassword(
            {email},
            password,
            (err) => {
                if (err) {
                    this.setState({
                        error: 'Unable to login. Check email & password'}
                    );
                } else {
                    this.setState({error: ''})
                }
            }
        )
    }

    render() {
        return (
            <div className="log-in boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit ={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email"     ref="email"     name="email"    placeholder="Email"/>
                        <input type="password"  ref="password"  name="password" placeholder="Password"/>
                        <button className="button">Log In </button>
                    </form>

                    <Link to="/signup">Need an account?</Link>
                </div>

            </div>
        );
    }
}

// LogIn.defaultProps = {};
LogIn.propTypes = {
    loginWithPassword:        PropTypes.func.isRequired
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
};
//
// PropTypes -> array, bool, func, number, object, string, symbol

// LogIn.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default createContainer(
    () => { return {
        loginWithPassword: Meteor.loginWithPassword
    } },
    LogIn
);

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')







//////////////// alternative using ES2016 Property Initializer ////////////////

// no more constructor - no more 'this' binding required

// class LogIn extends Component {

    // this.state = {
    //     'whatever':{}
    // }

    // handleSubmit = (e) => {
    //    ...
    //    this.setState({
    //        ...
    //    })
    // }

    // render() {
    //     return (
    //         <div className="login">
    //         </div>
    //     );
    // }
// }