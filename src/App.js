import React, { Component } from "react";
import "./App.css";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { updateCurrentUser } from "./store/actions/updateCurrentUser";
import { updateUsersList } from "./store/actions/updateUsersList";
import { updateMessagesList } from "./store/actions/updateMessagesList";
import Header from "./components/header";
import UsersList from "./components/usersList";
import SignUpForm from "./containers/signUpForm";
import SignInForm from "./containers/signInForm";
import ChatBox from "./components/chatBox";

class App extends Component {
  componentDidMount() {
    firebase
      .database()
      .ref("/")
      .on("value", snap => {
        let data = snap.val() === null ? {} : snap.val();

        let users = data.users ? Object.values(data.users) : [];
        let messages = data.messages ? Object.values(data.messages) : [];
        this.props.updateUsersList(users);
        this.props.updateMessagesList(messages);

        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            firebase
              .database()
              .ref(`users/${user.uid}/isActive`)
              .set(true)
              .then(() => {
                let currentUser = this.props.users.filter(
                  x => x.userUid === user.uid
                );
                this.props.updateCurrentUser(currentUser[0]);
              });
          } else {
            this.props.updateCurrentUser({});
          }
        });
      });
  }

  render() {
    return (
      <div className="App">
        <Header />

        {Object.entries(this.props.currentUser).length === 0 ? (
          <div id="forms-container">
            <SignUpForm />

            <hr />

            <SignInForm />

          </div>
        ) : null}

        {Object.entries(this.props.currentUser).length !== 0 ? (
          <UsersList />
        ) : null}

        <div className="chatbox-container">
          {Object.values(this.props.chatBoxes).map(chatBox => (
            <ChatBox data={chatBox} key={chatBox.userUid} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.data,
    users: state.usersList.data,
    chatBoxes: state.chatBoxesList.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentUser: data => {
      dispatch(updateCurrentUser(data));
    },
    updateUsersList: data => {
      dispatch(updateUsersList(data));
    },
    updateMessagesList: data => {
      dispatch(updateMessagesList(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
