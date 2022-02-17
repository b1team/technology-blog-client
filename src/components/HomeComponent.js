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
      post_tags: [],
      random_post: []
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
    PostService.getRandomPost().then(
      data => {
        console.log("______________+__________");
        console.log(data);
        this.setState({
          random_post: data
        });
        console.log(this.state.random_post);
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
      <div className="home-wrapper">
        <div className="col-md-8">
          <h2 style={{ marginTop: '20px' }}>Các bài viết gần đây</h2>
          {this.state.content.map(item => {
            console.log(item);
            return <div key={item.id} className="home-inner">
              <div className="col-md-2">
                <img src={item.thumbnail} alt="none" className="img-fluid" style={{ width: '200px' }}></img>
              </div>
              <div className="col-md-10">
                <div className="home-group" onClick={() => this.handlePost(item.slug)}>
                  <div className="home-inline">
                    <div class="home-id">
                      userId:{item.id}
                    </div>
                    <div className="home-time">
                      {item.createdAt}
                    </div>
                  </div>
                  <div className="home-title" >
                    {item.title}
                  </div>
                  <div class="home-brief">
                    {item.brief}
                  </div>
                  <div className="home-tag">
                    {item.post_tags}
                  </div>

                </div>
              </div>
            </div>
          })}
        </div>
        <div className="col-md-4">
          <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Các tag bài viết</h2>
          <div className="home-container">
            {/* {this.state.tags.map(item => {
              return <div key={item.name} className="course">
                {item.count >= 1 &&
                  <div className="course-info">
                    <h6>{item.name} ({item.count})</h6>
                  </div>}
              </div>
            })} */}
            {this.state.tags.map(item => {
              return <div key={item.name} className="course">
                <div className="course-info">
                  <h6>{item.name} ({item.count})</h6>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    );
  }
}
