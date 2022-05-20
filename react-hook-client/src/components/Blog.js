import React, { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from 'react-router-dom';
import BlogDataService from "../services/BlogService";
import { FaPhabricator } from "react-icons/fa";


const Blog = props => {
	
  const { id }= useParams();
  let navigate = useNavigate();

  const initialBlogState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentBlog, setCurrentBlog] = useState(initialBlogState);
  const [message, setMessage] = useState("");

  const getBlog = id => {
    BlogDataService.get(id)
      .then(response => {
        setCurrentBlog(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if(id)
      getBlog(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBlog({ ...currentBlog, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentBlog.id,
      title: currentBlog.title,
      description: currentBlog.description,
      published: status
    };

    BlogDataService.update(currentBlog.id, data)
      .then(response => {
        setCurrentBlog({ ...currentBlog, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBlog = () => {
    BlogDataService.update(currentBlog.id, currentBlog)
      .then(response => {
        console.log(response.data);
        setMessage("The blog was updated successfully!");
		navigate("/blogs");	
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBlog = () => {
    BlogDataService.remove(currentBlog.id)
      .then(response => {
        console.log(response.data);
        navigate("/blogs");	
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBlog ? (
         <div className="list row">
             <div className="col-md-12">
         
		   <h4>Edit Blog</h4>			
		      <Link to={"/blogs"} className="btn btn-sm btn-primary mb15"><FaPhabricator /> Blogs</Link>
	      
		  
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBlog.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBlog.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBlog.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBlog.published ? (
            <button
              className="btn btn-primary btn-sm mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="btn btn-danger btn-sm mr-2" onClick={deleteBlog}>
            Delete
          </button>

          <button type="submit" className="btn btn-success btn-sm" onClick={updateBlog}>Update</button>
          <p>{message}</p>
        </div>
		 </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Blog...</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
