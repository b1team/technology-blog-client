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
import { logout } from "./actions/auth.js";
import { clearMessage } from "./actions/message.js";
import PostDetail from "./components/PostDetailComponent.js";
//import PostUpdate from "./components/PostUpdateComponent.js";
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
              <input placeholder="Search" style={{ width: '200px', height: '30px' }}></input>
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
          <div className="container" style={{ minHeight: '2200px', overflowY: 'hidden' }}>
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
              <Route path="/update/:id" component={BoardPost} />
            </Switch>
          </div>
          <div className="footer bg-dark">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <ul>
                <li>Sinh viên thực hiện</li>
                <li>Phi Anh Tú - 18810310361</li>
                <li>Nguyễn Tú Tùng - 18810310363</li>
                <li>D13CNPM4</li>
              </ul>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-12">
              <div className="footer-words">
                Tech Blog developed by skirmish and tungnt
              </div>
            </div>
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
