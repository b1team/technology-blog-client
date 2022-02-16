import React, { Component } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import UserService from "../services/UserService";
import EventBus from "../common/EventBus";
import PostService from "../services/PostService.js";
import "../css/post.css";
export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      tags: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard(localStorage.user_id).then(
      response => {
        this.setState({
          content: response.data
        });
      },
      PostService.getTopTags().then(
        response => {
          this.setState({
            tags: response.data
          });
        }
      ),
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
      <Container>
        <Row>
          <Col sm={9}>
            {this.state.content.map(item => {
              return <div key={item.id} className="home-container">
              <div className="course">
                <div className="course-preview">
                <img src={item.thumbnail} alt="none" class="img-fluid"></img>
                </div>
                <div className="course-info">
                  <h3>{item.title}</h3>
                  <h6>{item.brief}</h6>
                  <h6>{item.createdAt}</h6>
                  <button className="btn" onClick={() => this.handlePost(item.slug)}>Read</button>
                </div>
              </div>
            </div>
            })}
          </Col>
          <Col sm={3}>
          {this.state.tags.map(item => {
              return <div className="home-container">
              <div className="course">
                <div className="course-info">
                  <h6>{item.name}({item.count})</h6>
                </div>
              </div>
            </div>
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}
