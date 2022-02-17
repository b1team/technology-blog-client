import React, { Component } from "react";
import "../css/home.css";
import PostService from "../services/PostService.js";
import EventBus from "../common/EventBus";

export default class PostDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        PostService.getSlug(this.props.match.params.slug).then(
            response => {
                this.setState({
                    content: response.data
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
        );
        console.log(this.props.match.params.slug);
    }

    render() {
        console.log(this.state.content);
        return (
            <h2>Test</h2>
        );
    }
}
