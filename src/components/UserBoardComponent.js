import React, { Component } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import UserService from "../services/UserService";
import EventBus from "../common/EventBus";
import PostService from "../services/PostService";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard(localStorage.user_id).then(
      response => {
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

  handlePost = (slug) => {
    let { history } = this.props;
    history.push("/post/" + slug);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={9}>
            {this.state.content.map(item => {
              return <div key={item.id} className="home-container">
                <div className="id">{item.id}</div>
                <div className="title">{item.title}</div>
                <div className="content">{item.content}</div>
                <div className="thumbnail">{item.thumbnail}</div>
                <div className="brief">{item.brief}</div>
                <div className="createAt">{item.createAt}</div>
                <div className="slug">{item.slug}</div>
                <button onClick={() => this.handlePost(item.slug)}>SEND</button>
              </div>
            })}
          </Col>
          <Col sm={3}>RIGHT SIDE</Col>
        </Row>
      </Container>
    );
  }
}
