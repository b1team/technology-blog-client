import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import "../css/profile.css";
import UserService from "../services/UserService";
import Button from 'react-bootstrap/Button';
import EventBus from "../common/EventBus";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      id: localStorage.user_id,
      name: "",
      phone_number: "",
      reload: false
    };
  }
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }
  handleUpdateUser = (e) => {
    e.preventDefault();
    UserService.updateProfile({ ...this.state }).then((data) => {
      this.setState({
        username: data.username,
        email: data.email
      });
    })
  }

  componentDidMount() {
    this.reloadPage();
  }

  reloadPage = () => {
    UserService.getUserById(this.state.id).then(
      response => {
        this.setState({
          username: response.data.username,
          email: response.data.email,
          name: response.data.name,
          phone_number: response.data.phone_number,
          reload: true
        });
        console.log(response);
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    )
  }

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
          {this.state.reload && (
            <div className="profile-right-wrapper">
              <p>User Profile: </p>
              <div className="user-info-upper">
                <div className="col-md-6">
                  <div className="name">
                    Username: <input type="text" value={this.state.username} onChange={this.onChangeUsername} />
                    {/* Username: <span>{currentUser.username}</span> */}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="email">
                    Email: <input type="text" value={this.state.email} onChange={this.onChangeEmail} />
                    {/* Email: <span>{currentUser.email}</span> */}
                  </div>
                </div>
              </div>
              <div className="user-info-bottom">
                <p>Account Infomation: </p>
                <div className="col-md-12">
                  <div className="role"
                  >Authority: {currentUser.roles &&
                    currentUser.roles.map((role, index) => <span key={index}>{role}</span>)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6">
          <div className="btnSaveUser">
            <button className="saveProfileBtn" onClick={this.handleUpdateUser}>Save</button>
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
