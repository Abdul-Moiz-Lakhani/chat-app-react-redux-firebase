import React, { Component } from "react";
import { connect } from "react-redux";
import { signOutUser } from "./../store/actions/userSignOut";
import { clearChatBoxes } from "./../store/actions/clearChatBoxes";
import "./../scss/6.components/header.scss";

class Header extends Component {
  handleLogOut = () => {
    this.props.signOutUser(this.props.currentUser.userUid);
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.signOutSuccessStatus) {
        this.props.clearChatBoxes({});
      }
    }
  }

  render() {
    return (
      <div id="headerContainer">
        <header id="header">
          <div id="headerLeft">
            <p className="logo">Bingo Chat App</p>
          </div>
          {Object.entries(this.props.currentUser).length !== 0 ? (
            <div id="headerRight">
              <h3 className="userName">{this.props.currentUser.userName}</h3>
              <button className="logOutBtn" onClick={this.handleLogOut}>Log Out</button>
            </div>
          ) : null}
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.data,
    signOutSuccessStatus: state.signOutStatus.success,
    signOutError: state.signOutStatus.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: id => {
      dispatch(signOutUser(id));
    },
    clearChatBoxes: data => {
      dispatch(clearChatBoxes(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
