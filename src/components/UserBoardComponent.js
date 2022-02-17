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

  handleGet = (slug) => {
    let { history } = this.props;
    history.push("/post/" + slug);
  }

  handleDelete = (id) => {
    PostService.deletePost(id).then(() => {
      this.reloadPage();
    })
  }
  reloadPage = () => {
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
    )
  }
  handleUpdate = () => {
    let { history } = this.props;
    history.push("/post/update");
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}>
            {this.state.content.map(item => {
              return <div key={item.id} className="home-container">
                <div className="course">
                  <div className="course-preview">
                    <img src={item.thumbnail} alt="none" className="img-fluid"></img>
                  </div>
                  <div className="course-info">
                    <h3 onClick={() => this.handleGet(item.slug)}>{item.title}</h3>
                    <h6>{item.brief}</h6>
                    <h6>{item.createdAt}</h6>
                    <button className="btn-1" onClick={() => this.handleDelete(item.id)}>Delete</button>
                    <button className="btn-2" onClick={() => this.handleUpdate(item.id)}>Update</button>
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
