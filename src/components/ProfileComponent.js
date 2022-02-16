import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import "../css/profile.css";

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;
    console.log(currentUser);
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="profile-container">
        <div className="col-md-3">
          <div className="profile-left-wrapper">
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            />
            <div className="username">
              {currentUser.username}
            </div>
            <div className="user_role">
              Role: {currentUser.roles &&
                currentUser.roles.map((role, index) => <p key={index}>{role}</p>)}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="profile-right-wrapper">
            <p>User Profile: </p>
            <div className="user_id">User Id: <span>{currentUser.id}</span></div>
            <div className="name">Username: <span>{currentUser.username}</span>}</div>
            <div className="email">Email: <span>{currentUser.email}</span></div>
            <div className="role">Authority: {currentUser.roles &&
              currentUser.roles.map((role, index) => <span key={index}>{role}</span>)}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
