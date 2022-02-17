import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import Home from "./components/HomeComponent";
import Profile from "./components/ProfileComponent";
import BoardUser from "./components/UserBoardComponent";
import BoardModerator from "./components/ModeratorBoardComponent";
import BoardAdmin from "./components/AdminBoardComponent";
import BoardPost from "./components/PostComponent";
import PostDetail from "./components/PostDetailComponent";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

import backgroundImg from "../src/asset/background.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand bg-dark">
            <Link to={"/"} className="navbar-brand nav-header">
              Tech Blog
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-header">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-header">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-header">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-header">
                    User
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/posts"} className="nav-header">
                    Post
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-header">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-header" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-header">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-header">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="background">
            <img
              src={backgroundImg}
              alt="bg-img"
              className="bg-img"
            />
          </div>
          <div className="container mt-6" style={{ minHeight: '600px' }}>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/posts" component={BoardPost} />
              <Route path="/post/:slug" component={PostDetail} />
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut} /> */}
        </div>
      </Router >
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
