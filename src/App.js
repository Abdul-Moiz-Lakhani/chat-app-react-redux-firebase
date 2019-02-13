import React, { Component } from "react";
import "./App.css";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { updateCurrentUser } from "./store/actions/updateCurrentUser";
import { updateUsersList } from "./store/actions/updateUsersList";
import { updateMessagesList } from "./store/actions/updateMessagesList";
import { makeNewUser } from "./store/actions/userSignUp";
import { signInUser } from "./store/actions/userSignIn";
import { signOutUser } from "./store/actions/userSignOut";
import { sendMessage } from "./store/actions/sendMessage";

class App extends Component {
  state = {
    messageInput: "",
    userName: "",
    userEmail: "",
    userPass: "",
    userSignInEmail: "",
    userSignInPass: "",
    chatBoxes: {}
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

  handleSignIn = ev => {
    ev.preventDefault();

    this.props.signInUser(
      this.state.userSignInEmail,
      this.state.userSignInPass
    );
  };

  componentDidUpdate(prevProps) {

    if (this.props !== prevProps) {

      let id = "";

      if(this.props.messages[this.props.messages.length-1] !== undefined) {
        id = this.props.messages[this.props.messages.length-1].receiverId;
      }

      if (this.props.signUpSuccessStatus) {
        this.setState({
          userName: "",
          userEmail: "",
          userPass: ""
        });
      } else if (this.props.signInSuccessStatus) {
        this.setState({
          userSignInEmail: "",
          userSignInPass: ""
        });
      } else if (this.props.sendMessageSuccessStatus) {
        this.refs[id].value = "";
      } else if (this.props.signOutSuccessStatus) {
        this.setState({
          chatBoxes: {}
        });
      }
    }
  }

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

  handleSubmit = (data, ev) => {
    ev.preventDefault();

    let message = this.refs[data.userUid].value;

    let details = {
      senderId: this.props.currentUser.userUid,
      receiverId: data.userUid,
      message,
      senderName: this.props.currentUser.userName
    };

    this.props.sendMessage(details);
  };

  handleOpenChat = u => {
    if (!this.state.chatBoxes.hasOwnProperty(u.userUid)) {
      this.setState(prevState => ({
        chatBoxes: { ...prevState.chatBoxes, [u.userUid]: u }
      }));
    }
  };

  handleChatBoxClose = id => {
    let list = this.state.chatBoxes;
    delete list[id.userUid];

    this.setState({
      chatBoxes: list
    });
  };

  insertChatBox = data => {
    let { messages } = this.props;

    let messagesList = messages.filter(
      message =>
        (message.senderId === data.userUid &&
          message.receiverId === this.props.currentUser.userUid) ||
        (message.senderId === this.props.currentUser.userUid &&
          message.receiverId === data.userUid)
    );

    return (
      <div id="content" key={data.userUid}>
        <h3>Chat started with: {data.userName}</h3>

        <hr />

        <form onSubmit={ev => this.handleSubmit(data, ev)}>
          <label htmlFor="messageInput">Message: </label>
          <input
            type="text"
            defaultValue=""
            ref={data.userUid}
            id="messageInput"
          />

          <button type="submit">Send</button>
        </form>

        <h4>Messages:</h4>

        <div>
          <ul>
            {messagesList.map((message, i) => {
              return (
                <li key={i}>{`${message.message} <== ${
                  message.senderName === this.props.currentUser.userName
                    ? "You"
                    : message.senderName
                }`}</li>
              );
            })}
          </ul>
        </div>

        <button onClick={() => this.handleChatBoxClose(data)}>
          Close Chat Box
        </button>
      </div>
    );
  };

  handleLogOut = () => {
    this.props.signOutUser(this.props.currentUser.userUid);
  };

  render() {
    let users = [];

    if (Object.entries(this.props.currentUser).length !== 0) {
      users = this.props.users.filter(
        user => user.userUid !== this.props.currentUser.userUid
      );
    }

    let chatBoxes = Object.values(this.state.chatBoxes);

    return (
      <div className="App">
        {Object.entries(this.props.currentUser).length !== 0 ? (
          <div>
            <h3>Current User: {this.props.currentUser.userName}</h3>
            <button onClick={this.handleLogOut}>Log Out</button>
          </div>
        ) : (
          "Please Sign In"
        )}

        <hr />

        <ul>
          {users.map(user => {
            return (
              <li
                key={user.userUid}
                onClick={() => this.handleOpenChat(user)}
              >{`${user.userName} (${
                user.isActive ? "Online" : "Offline"
              })`}</li>
            );
          })}
        </ul>

        <hr />

        <form id="sign-up-form" onSubmit={this.handleSignUp}>
          <label htmlFor="userName">Name: </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={this.state.userName}
            onChange={this.handleChange}
          />

          <br />

          <label htmlFor="userEmail">Email: </label>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            value={this.state.userEmail}
            onChange={this.handleChange}
          />

          <br />

          <label htmlFor="userPass">Password: </label>
          <input
            type="password"
            id="userPass"
            name="userPass"
            value={this.state.userPass}
            onChange={this.handleChange}
          />

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>

        <hr />

        <form id="sign-in-form" onSubmit={this.handleSignIn}>
          <label htmlFor="userSignInEmail">Email: </label>
          <input
            type="text"
            id="userSignInEmail"
            name="userSignInEmail"
            value={this.state.userSignInEmail}
            onChange={this.handleChange}
          />

          <br />

          <label htmlFor="userSignInPass">Password: </label>
          <input
            type="password"
            id="userSignInPass"
            name="userSignInPass"
            value={this.state.userSignInPass}
            onChange={this.handleChange}
          />

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <hr />

        {Object.values(chatBoxes).map((chatBox, i) =>
          this.insertChatBox(chatBox, i)
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.data,
    users: state.usersList.data,
    messages: state.messagesList.data,
    signUpSuccessStatus: state.signUpStatus.success,
    signUpError: state.signUpStatus.error,
    signInSuccessStatus: state.signInStatus.success,
    signInError: state.signInStatus.error,
    signOutSuccessStatus: state.signOutStatus.success,
    signOutError: state.signOutStatus.error,
    sendMessageSuccessStatus: state.sendMessageStatus.success,
    sendMessageError: state.sendMessageStatus.error
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
    },
    makeNewUser: (name, email, pass) => {
      dispatch(makeNewUser(name, email, pass));
    },
    signInUser: (email, pass) => {
      dispatch(signInUser(email, pass));
    },
    signOutUser: id => {
      dispatch(signOutUser(id));
    },
    sendMessage: data => {
      dispatch(sendMessage(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
