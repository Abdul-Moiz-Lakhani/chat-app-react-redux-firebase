import React, { Component } from "react";
import { connect } from "react-redux";
import {InputField} from "./../components/inputField";
import { makeNewUser } from "./../store/actions/userSignUp";

class SignUpForm extends Component {
  state = {
    userName: "",
    userEmail: "",
    userPass: ""
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  handleSignUp = ev => {
    ev.preventDefault();

    this.props.makeNewUser(
      this.state.userName,
      this.state.userEmail,
      this.state.userPass
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.signUpSuccessStatus) {
        this.setState({
          userName: "",
          userEmail: "",
          userPass: ""
        });
      }
    }
  }

  render() {
    return (
      <div>
        <form id="sign-up-form" onSubmit={this.handleSignUp}>
          <label htmlFor="userName">Name: </label>
          <InputField
            type="text"
            id="userName"
            name="userName"
            value={this.state.userName}
            handleOnChange={this.handleChange}
          />

          <br />

          <label htmlFor="userEmail">Email: </label>
          <InputField
            type="text"
            id="userEmail"
            name="userEmail"
            value={this.state.userEmail}
            handleOnChange={this.handleChange}
          />

          <br />

          <label htmlFor="userPass">Password: </label>
          <InputField
            type="password"
            id="userPass"
            name="userPass"
            value={this.state.userPass}
            handleOnChange={this.handleChange}
          />

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signUpSuccessStatus: state.signUpStatus.success,
    signUpError: state.signUpStatus.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    makeNewUser: (name, email, pass) => {
      dispatch(makeNewUser(name, email, pass));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
