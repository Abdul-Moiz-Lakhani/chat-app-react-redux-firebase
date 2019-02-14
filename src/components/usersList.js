import React from "react";
import { connect } from "react-redux";
import { insertChatBox } from "./../store/actions/insertChatBox";

const UsersList = props => {
  let users = [];

  if (Object.entries(props.currentUser).length !== 0) {
    users = props.users.filter(
      user => user.userUid !== props.currentUser.userUid
    );
  }

  let handleOpenChat = u => {
    if (!props.chatBoxes.hasOwnProperty(u.userUid)) {
      props.insertChatBox(u);
    }
  };

  return (
    <div id="users-list-container" key={props.key}>
      <h3 className="user-list-head">Users List</h3>
      <ul className="user-list">
        {users.map((user, i) => {
          return (
            <li key={i} onClick={() => handleOpenChat(user)}>{`${
              user.userName
            } (${user.isActive ? "Online" : "Offline"})`}</li>
          );
        })}
      </ul>
      
      <hr />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.data,
    users: state.usersList.data,
    chatBoxes: state.chatBoxesList.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    insertChatBox: data => {
      dispatch(insertChatBox(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
