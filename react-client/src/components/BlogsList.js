import React, { Component } from "react";
import BlogDataService from "../services/BlogService";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table"
import { FaEdit,FaTrash,FaPhabricator,FaPlusSquare } from "react-icons/fa";

export default class BlogsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBlogs = this.retrieveBlogs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBlog = this.setActiveBlog.bind(this);
    this.removeAllBlogs = this.removeAllBlogs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
	this.deleteBlog = this.deleteBlog.bind(this);

    this.state = {
      blogs: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveBlogs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBlogs() {
    BlogDataService.getAll()
      .then(response => {
        this.setState({
          blogs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBlogs();
    this.setState({
      currentBlog: null,
      currentIndex: -1
    });
  }

  setActiveBlog(blog, index) {
    this.setState({
      currentBlog: blog,
      currentIndex: index
    });
  }

  removeAllBlogs() {
    BlogDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  deleteBlog(id) {    
    BlogDataService.delete(id)
      .then(response => {
        console.log(response.data);
         this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  

  searchTitle() {
    this.setState({
      currentBlog: null,
      currentIndex: -1
    });

    BlogDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          blogs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, blogs, currentBlog, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
           <h4>Blogs List</h4>	
		   <Link to={"/add"} className="btn btn-sm btn-primary"><FaPlusSquare /> Add Blog</Link>
		   <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllBlogs}><FaTrash /> Remove All</button>
		  <Table striped bordered hover>
		  <thead>
			<tr>
			  <th width="8%">#</th>
			  <th width="26%">Title</th>
			  <th width="40%">Description</th>
			  <th width="14%">Status</th>
			  <th width="12%">Action</th>
			</tr>
		  </thead>
		  <tbody>
		   {blogs && blogs.map((blog, index) => (
			<tr>
			  <td>{index+1}</td>
			  <td className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveBlog(blog, index)} key={index}>{blog.title}</td>
			  <td>{blog.description}</td>
			  <td>{blog.published ? "Published" : "Pending"}</td>
			  <td>
			     <Link to={"#"} onClick={() => this.setActiveBlog(blog, index)} key={index} className="pdr5"><FaPhabricator /></Link>
			     <Link to={"/blogs/" + blog.id} className="pdr5"><FaEdit /></Link>				
				 <Link to={"#"} onClick={() => this.deleteBlog(blog.id)}><FaTrash /></Link>  			   
			  </td>
			</tr>
             ))}
          </tbody>
        </Table>  
         
        </div>
        <div className="col-md-12">
          {currentBlog ? (
            <div>
              <h4>Blog Details</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBlog.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBlog.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentBlog.published ? "Published" : "Pending"}
              </div>             
            </div>
          ) : (
            <div>              
            </div>
          )}
        </div>
      </div>
    );
  }
}
