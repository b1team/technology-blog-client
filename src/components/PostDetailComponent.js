import React, { Component } from "react";
import "../css/home.css";
import PostService from "../services/PostService.js";
import UserService from "../services/UserService.js";
import EventBus from "../common/EventBus";
import "../css/comment.css";

export default class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            username: ""
        };
    }

    componentDidMount() {
        PostService.getSlug(this.props.match.params.slug).then(
            response => {
                UserService.getUserById(response.data.user_id).then(
                    user_response => {
                        response.data.username = user_response.data['username'];
                        this.setState({
                            username: response.data.username,
                        });
                    }
                )
                this.setState({
                    content: response.data
          
                  });
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
        );
    }

    render() {
        return (
            <div key="" className="home-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                                <h1 className="mt-4">{this.state.content.title}</h1>
                                <p className="lead">
                                by
                                <p href="#">{this.state.username}</p>
                                </p>
                                <p>Posted on date {this.state.content.createdAt}</p>
                                <div id="post-content" class="mb-4">
                                    {this.state.content.content}
                                </div>
                                <div className="card my-4">
                                <h5 className="card-header">Leave a Comment:</h5>
                                <div className="card-body">
                                    <form action="" method="POST">
                                        <div className="form-group">
                                            <textarea id="create_comment" name="comment" class="form-control" rows="3"></textarea>
                                        </div>
                                        <button type="submit" class=" btn-primary" onclick="addComment(); return false;">Submit</button>
                                    </form>
                                </div>
                            </div>

                            <div id="comment-box">

                            </div>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
}
