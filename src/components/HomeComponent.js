import React, { Component } from "react";
import "../css/home.css";
import { Row, Col, Container } from 'react-bootstrap';
import UserService from "../services/UserService.js";
import PostService from "../services/PostService.js";
import "../css/post.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      tags: []
    };
  }
  

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        response.data.forEach(element => {
          PostService.getPostwithTag(element.id).then(
            response => {
              element.tags = response.data["tags"][0];
            }
          )
        });
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
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  
  handlePost = (slug) => {
    PostService.getSlug(slug).then(response => {
      alert(response.data.content);
    })
  }
  render() {
    console.log(this.state.content);
    console.log(this.state.tags);
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
                  <h6>TAG: {item.tags}</h6>
                  <h6>Date: {item.createdAt}</h6>
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
