import React from "react";
import { connect } from "react-redux";
import { signOutUser } from "./../store/actions/userSignOut";

const Header = (props) => {

  let handleLogOut = () => {
    props.signOutUser(props.currentUser.userUid);
  };

  return (
    <div id="header">
      {Object.entries(props.currentUser).length !== 0 ? (
        <header>
          <h3>Current User: {props.currentUser.userName}</h3>
          <button onClick={handleLogOut}>Log Out</button>
        </header>
      ) : (
        "Please Sign In"
      )}
    </div>
  );
};

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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
