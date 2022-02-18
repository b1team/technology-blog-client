import React, { Component } from "react";
//import { Row, Col, Container } from 'react-bootstrap';
import UserService from "../services/UserService";
import EventBus from "../common/EventBus";
import PostService from "../services/PostService.js";
import "../css/userBoard.css";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      tags: [],
      random_post: []
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
    PostService.getRandomPost().then(
      data => {
        console.log("______________+__________");
        console.log(data);
        this.setState({
          random_post: data["data"]
        });
        console.log(this.state.random_post);
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
  handleUpdate = (id) => {
    let { history } = this.props;
    history.push("/update/" + id);
  }
  handleGet = (slug) => {
    let { history } = this.props;
    history.push("/post/" + slug);
  }

  render() {
    return (
      <div className="userboard-wrapper">
        <div className="col-md-8">
          <h2 style={{ margin: '30px' }}>Bài viết của tôi</h2>
          {this.state.content.map(item => {
            console.log("_________________");
            console.log(item);
            return <div key={item.id} className="userboard-inner">
              <div className="col-md-2">
                <img src={item.thumbnail} alt="none" className="img-fluid" style={{ width: '200px' }}></img>
              </div>
              <div className="col-md-8">
                <div className="userboard-group">
                  <div className="userboard-inline">
                    <div className="userboard-time">
                      {item.createdAt}
                    </div>
                  </div>
                  <div className="userboard-title" onClick={() => this.handleGet(item.slug)}>
                    {item.title}
                  </div>
                  <div className="userboard-brief">
                    {item.brief}
                  </div>
                  <div className="userboard-tag">
                    {item.post_tags}
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <button className="deleteBtn" onClick={() => this.handleDelete(item.id)}>Delete</button>
                <button className="updBtn" onClick={() => this.handleUpdate(item.id)}>Update</button>
              </div>
            </div>
            // return <div key={item.id} className="home-container">
            //   <div className="course">
            //     <div className="course-preview">
            //       <img src={item.thumbnail} alt="none" className="img-fluid"></img>
            //     </div>
            //     <div className="course-info">
            //       <h3 onClick={() => this.handleGet(item.slug)}>{item.title}</h3>
            //       <h6>{item.brief}</h6>
            //       <h6>{item.createdAt}</h6>
            //       <button className="btn-1" onClick={() => this.handleDelete(item.id)}>Delete</button>
            //       <button className="btn-2" onClick={() => this.handleUpdate(item.id)}>Update</button>
            //     </div>
            //   </div>
            // </div>
          })}
        </div>
        <div className="col-md-4">
          <h2 style={{ margin: '30px' }}>Các bài viết nổi bật</h2>
          <div className="random-wrapped">
            <h2>Các bài viết nổi bật</h2>
            {this.state.random_post.map(item => {
              return <div key={item.title} className="random-group" onClick={() => this.handlePost(item.slug)}>
                <div className="col-md-3">
                  <img src={item.thumbnail} alt="none" className="img-fluid"></img>
                </div>
                <div className="col-md-9">
                  <div className="random-right">
                    <div className="random-title">
                      {item.title}
                    </div>
                    <div className="random-time">
                      {item.brief}
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
      // <Container>
      //   <Row>
      //     <Col sm={12}>
      // {this.state.content.map(item => {
      //   return <div key={item.id} className="home-container">
      //     <div className="course">
      //       <div className="course-preview">
      //         <img src={item.thumbnail} alt="none" className="img-fluid"></img>
      //       </div>
      //       <div className="course-info">
      //         <h3 onClick={() => this.handleGet(item.slug)}>{item.title}</h3>
      //         <h6>{item.brief}</h6>
      //         <h6>{item.createdAt}</h6>
      //         <button className="btn-1" onClick={() => this.handleDelete(item.id)}>Delete</button>
      //         <button className="btn-2" onClick={() => this.handleUpdate(item.id)}>Update</button>
      //       </div>
      //     </div>
      //   </div>
      //       })}
      //     </Col>
      //   </Row>
      // </Container>
    );
  }
}
