import React, { Component } from "react";
import "./App.css";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { updateCurrentUser } from "./store/actions/updateCurrentUser";
import { updateUsersList } from "./store/actions/updateUsersList";
import { updateMessagesList } from "./store/actions/updateMessagesList";
import { sendMessage } from "./store/actions/sendMessage";
import {InputMessageField} from "./components/inputField";
import Header from "./components/header";
import SignUpForm from "./containers/signUpForm";
import SignInForm from "./containers/signInForm";

class App extends Component {
  state = {
    messageInput: "",
    chatBoxes: {}
  };

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let id = "";

      if (this.props.messages[this.props.messages.length - 1] !== undefined) {
        id = this.props.messages[this.props.messages.length - 1].receiverId;
      }

      if (this.props.sendMessageSuccessStatus) {
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
          <InputMessageField
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

        <Header />

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

        <SignUpForm />

        <hr />

        <SignInForm />

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
    sendMessage: data => {
      dispatch(sendMessage(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
