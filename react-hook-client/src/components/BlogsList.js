import React, { useState, useEffect } from "react";
import BlogDataService from "../services/BlogService";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table"
import { FaEdit,FaTrash,FaPhabricator,FaPlusSquare } from "react-icons/fa";

const BlogsList = () => {
	
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
      retrieveBlogs();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBlogs = () => {
    BlogDataService.getAll()
      .then(response => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBlogs();
    setCurrentBlog(null);
    setCurrentIndex(-1);
  };

  const setActiveBlog = (blog, index) => {
    setCurrentBlog(blog);
    setCurrentIndex(index);
  };
  
  
  const deleteBlog = (id) => {    
    BlogDataService.remove(id)
      .then(response => {
        console.log(response.data);
         refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
   

  const removeAllBlogs = () => {
    BlogDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BlogDataService.findByTitle(searchTitle)
      .then(response => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
	  
      <div className="col-md-12">
        <h4>Blogs List</h4>	
           <Link to={"/add"} className="btn btn-sm btn-primary"><FaPlusSquare /> Add Blog</Link>
		   <button className="m-3 btn btn-sm btn-danger" onClick={removeAllBlogs}><FaTrash /> Remove All</button>
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
			  <td className={"list-group-item " + (index === currentIndex ? "active" : "")} onClick={() => setActiveBlog(blog, index)} key={index}>{blog.title}</td>
			  <td>{blog.description}</td>
			  <td>{blog.published ? "Published" : "Pending"}</td>
			  <td>
			     <Link to={"#"} onClick={() => setActiveBlog(blog, index)} key={index} className="pdr5"><FaPhabricator /></Link>
			     <Link to={"/blogs/" + blog.id} className="pdr5"><FaEdit /></Link>				
				 <Link to={"#"} onClick={() => deleteBlog(blog.id)}><FaTrash /></Link>  			   
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
};

export default BlogsList;
