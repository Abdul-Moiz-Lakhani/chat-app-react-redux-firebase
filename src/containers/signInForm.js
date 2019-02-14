import React, { Component } from "react";
import { connect } from "react-redux";
import {InputField} from "./../components/inputField";
import { signInUser } from "./../store/actions/userSignIn";

class SignInForm extends Component {
  state = {
    userSignInEmail: "",
    userSignInPass: ""
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  handleSignIn = ev => {
    ev.preventDefault();

    this.props.signInUser(
      this.state.userSignInEmail,
      this.state.userSignInPass
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.signInSuccessStatus) {
        this.setState({
          userSignInEmail: "",
          userSignInPass: ""
        });
      }
    }
  }

  render() {
    return (
      <div id="sign-in-form">
        <h3>Sign In Form</h3>
        <form id="sign-in-form" onSubmit={this.handleSignIn}>
          <label htmlFor="userSignInEmail">Email: </label>
          <InputField
            type="text"
            id="userSignInEmail"
            name="userSignInEmail"
            value={this.state.userSignInEmail}
            handleOnChange={this.handleChange}
          />

          <br />

          <label htmlFor="userSignInPass">Password: </label>
          <InputField
            type="password"
            id="userSignInPass"
            name="userSignInPass"
            value={this.state.userSignInPass}
            handleOnChange={this.handleChange}
          />

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signInSuccessStatus: state.signInStatus.success,
    signInError: state.signInStatus.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signInUser: (email, pass) => {
      dispatch(signInUser(email, pass));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
