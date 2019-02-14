import React, { Component } from "react";
import { connect } from "react-redux";
import { InputMessageField } from "./inputField";
import { sendMessage } from "./../store/actions/sendMessage";
import { closeChatBox } from "./../store/actions/closeChatBox";

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.textInput = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.sendMessageSuccessStatus) {
        this.textInput.current.value = "";
      }
    }
  }

  handleSubmit = (data, ev) => {
    ev.preventDefault();

    let message = this.textInput.current.value;

    if (message !== "") {
      let details = {
        senderId: this.props.currentUser.userUid,
        receiverId: data.userUid,
        message,
        senderName: this.props.currentUser.userName
      };

      this.props.sendMessage(details);
    }
  };

  handleChatBoxClose = id => {
    let list = this.props.chatBoxes;
    delete list[id.userUid];

    this.props.closeChatBox(list);
  };

  render() {

    let { messages, data } = this.props;

    let messagesList = messages.filter(
      message =>
        (message.senderId === data.userUid &&
          message.receiverId === this.props.currentUser.userUid) ||
        (message.senderId === this.props.currentUser.userUid &&
          message.receiverId === data.userUid)
    );

    return (
      <div id="chatbox" key={this.props.key}>
        <h3>Chat started with: {data.userName}</h3>

        <hr />

        <form onSubmit={ev => this.handleSubmit(data, ev)}>
          <label htmlFor="messageInput">Message: </label>
          <InputMessageField
            type="text"
            defaultValue=""
            ref={this.textInput}
            id={`messageInput${data.userUid}`}
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
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.data,
    messages: state.messagesList.data,
    sendMessageSuccessStatus: state.sendMessageStatus.success,
    sendMessageError: state.sendMessageStatus.error,
    chatBoxes: state.chatBoxesList.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: data => {
      dispatch(sendMessage(data));
    },
    closeChatBox: data => {
      dispatch(closeChatBox(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
