import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../actions/Auth";

import PostService from "../services/PostService";
import EventBus from "../common/EventBus";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class BoardPost extends Component {
  constructor(props) {
    super(props);

    // this.handlePost = this.handlePost.bind(this);

    this.state = {
      title: "",
      content: "",
      thumbnail: "",
      brief: "",
      user_id: localStorage.user_id
    };
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeContent = (e) => {
    this.setState({
      content: e.target.value,
    });
  }
  onChangeThumbnail = (e) => {
    this.setState({
      thumbnail: e.target.value,
    });
  }
  onChangeBrief = (e) => {
    this.setState({
      brief: e.target.value,
    });
  }
  handlePost = (e) => {
    e.preventDefault();
    PostService.createPost({ ...this.state }).then(() => { alert('ok') })
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/profile" />;
    }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handlePost}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="password">Title</label>
              <Input
                type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <Input
                type="text"
                className="form-control"
                name="content"
                value={this.state.content}
                onChange={this.onChangeContent}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="thumbnail">Thumbnail</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.thumbnail}
                onChange={this.onChangeThumbnail}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="brief">Brief</label>
              <Input
                type="text"
                className="form-control"
                name="brief"
                value={this.state.brief}
                onChange={this.onChangeBrief}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
