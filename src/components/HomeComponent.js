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
      tags: [],
      post_tags: []
    };
  }


  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        response.data.forEach(element => {
          PostService.getPostwithTag(element.id).then(
            response => {
              element.post_tags = response.data["tags"];
              this.setState({
                post_tags: response.data["tags"],
              });
              // console.log(this.state.post_tags);
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

  // handlePost = (slug) => {
  //   PostService.getSlug(slug).then(response => {
  //     alert(response.data.content);
  //   })
  // }
  handlePost = (slug) => {
    let { history } = this.props;
    history.push("/post/" + slug);
  }

  render() {
    console.log(this.state.content);
    console.log(this.state.tags);
    console.log(this.state.post_tags);
    return (
      <Container>
        <Row>
          <Col sm={9}>
            {this.state.content.map(item => {
              return <div key={item.id} className="home-container">
                <div className="course">
                  <div className="course-preview">
                    <img src={item.thumbnail} alt="none" className="img-fluid"></img>
                  </div>
                  <div className="course-info">
                    <h3 onClick={() => this.handlePost(item.slug)}>{item.title}</h3>
                    <h6>{item.brief}</h6>
                    <h6>TAG: {item.post_tags}</h6>
                    <h6>Date: {item.createdAt}</h6>
                  </div>
                </div>
              </div>
            })}
          </Col>
          <Col sm={3}>
            <div className="home-container">
              {this.state.tags.map(item => {
                return <div key={item.name} className="course">
                  {item.count >= 1 && <div className="course-info"><h6>{item.name} ({item.count})</h6></div>}
                </div>
              })}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
