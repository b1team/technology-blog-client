import React, { Component } from "react";
import "../css/home.css";
import PostService from "../services/PostService.js";
import UserService from "../services/UserService.js";
import CommentService from "../services/CommentService.js";
import EventBus from "../common/EventBus";
import "../css/comment.css";
import { Markup } from 'interweave';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            post_username: "",
            post_user_id: "",
            comment: "",
            username: localStorage.getItem("user")["username"],
            user_id: localStorage.getItem("user_id"),
            post_id: 0,
            data_comment: []
        };
    }

    componentDidMount() {
        PostService.getSlug(this.props.match.params.slug).then(
            response => {
                // console.log(this.props);
                UserService.getUserById(response.data.user_id).then(
                    user_response => {
                        response.data.username = user_response.data['username'];

                        this.setState({
                            post_username: response.data.username,
                            post_user_id: response.data.user_id
                        });
                        // console.log(this.state.user_id);
                    }
                )
                this.setState({
                    content: response.data,
                    post_id: response.data.id
                });
                console.log("start");
                console.log(this.state.post_id);
                CommentService.getComment(this.state.post_id).then(
                    data => {
                        this.setState({
                            data_comment: data.data
                        })
                        console.log(data.data);
                    }
                );
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

    onChangeComment = (e) => {
        this.setState({
            comment: e.target.value,
        });
    }

    clearInput = () => {
        this.setState({
            comment: null
        })
    }

    handleComment = (e) => {
        e.preventDefault();
        CommentService.comment({"post_id": this.state.post_id, "comment": this.state.comment, "user_id": this.state.user_id}).then(() => { this.clearInput(); this.reloadPage() })
    }

    reloadPage = () => {
        PostService.getSlug(this.props.match.params.slug).then(
            response => {
                // console.log(this.props);
                UserService.getUserById(response.data.user_id).then(
                    user_response => {
                        response.data.username = user_response.data['username'];

                        this.setState({
                            post_username: response.data.username,
                            post_user_id: response.data.user_id
                        });
                        // console.log(this.state.user_id);
                    }
                )
                this.setState({
                    content: response.data,
                    post_id: response.data.id
                });
                console.log("start");
                console.log(this.state.post_id);
                CommentService.getComment(this.state.post_id).then(
                    data => {
                        this.setState({
                            data_comment: data.data
                        })
                        console.log(data.data);
                    }
                );
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
            <div className="postDetail-wrapped">
                <div className="col-md-8">
                    <div className="detail-title">
                        {this.state.content.title}
                    </div>
                    <div className="detail-username">
                        Created By {this.state.post_username}
                    </div>
                    <div className="detail-createdAt">
                        {this.state.content.createdAt}
                    </div>
                    <div className="detail-content">
                    <Markup content={this.state.content.content} />
                       
                    </div>

                </div>
                <div className="col-md-4"></div>
                
                <div className="col-md-12">
                    <h5 className="card-header">Leave a Comment:</h5>
                    <div className="card-body">
                        <form action="" method="POST" onSubmit={this.handleComment}>
                            <div className="form-group">
                                <textarea id="create_comment" name="comment" className="form-control" rows="3"
                                    onChange={this.onChangeComment}></textarea>
                            </div>
                            <button type="submit" className=" btn-primary" >Submit</button>
                            {/* onClick={this.handleComment()} */}
                            {/* onclick="addComment(); return false;" */}
                        </form>
                    </div>
                    <div id="comment-box">
                        <h2>Bình luận</h2>
                        {this.state.data_comment.map(item => {
                            return <div key={item.id} className="comment-group">
                                <div className="col-md-12">
                                    <div className="comment-username">
                                        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="none" className="img-fluid" style={{ height: '40px' }}></img>
                                        <div className="comment-username-detail">
                                            {item.user.username}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="comment-bottom">
                                        <div className="comment-content">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            // <div key="" className="home-container">
            //     <div className="container">
            //         <div className="row">
            //             <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            //                 <h1 className="mt-4">{this.state.content.title}</h1>
            //                 <p className="lead">
            //                     by
            //                     <p href="#">{this.state.username}</p>
            //                 </p>
            //                 <p>Posted on date {this.state.content.createdAt}</p>
            //                 {this.state.content.content}
            //                 <div className="card my-4">
            //                     <h5 className="card-header">Leave a Comment:</h5>
            //                     <div className="card-body">
            //                         <form action="" method="POST">
            //                             <div className="form-group">
            //                                 <textarea id="create_comment" name="comment" class="form-control" rows="3"></textarea>
            //                             </div>
            //                             <button type="submit" class=" btn-primary" onclick="addComment(); return false;">Submit</button>
            //                         </form>
            //                     </div>
            //                 </div>

            //                 <div id="comment-box">

            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}
