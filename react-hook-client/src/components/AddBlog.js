import React, { useState } from "react";
import BlogDataService from "../services/BlogService";
import { Link } from "react-router-dom";
import { FaPhabricator } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddBlog = () => {
	
  const [submitted, setSubmitted] = useState(false);
  
  const validationSchema = () => {
		return Yup.object().shape({
			title: Yup.string().required('Title is required'),
			description: Yup.string().required('Description is required'),   
		});
	};	
	
	const formik = useFormik({
			enableReinitialize: true,
			initialValues: {
				title: "",
				description: "",     
				published: false,
			},
			validationSchema,  
			onSubmit:(data) => {			   	  
				    BlogDataService.create(data).then(response => {       
                              setSubmitted(true);
							  formik.values.title='';
							  formik.values.description='';
                             //console.log(response.data);
						  })
						  .catch(e => {
							console.log(e);
					 });  
				  
				  
			},
  });
		
  
  const newBlog = () => { 
    setSubmitted(false);
  };

  return (
     <div className="list row">
      <div className="col-md-12">
	   <h4>Add Blog</h4>	
           <Link to={"/blogs"} className="btn btn-sm btn-primary mb15"><FaPhabricator /> Blogs</Link>	  
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBlog}>
            Add
          </button>
        </div>
      ) : (
        <div>
		<form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"      
              name="title"	
			  onChange={formik.handleChange}
              value={formik.values.title}
            />			 
			 <div className="text-danger">
                {formik.errors.title ? formik.errors.title : null}
            </div>	
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"    
              name="description"
			  onChange={formik.handleChange}
              value={formik.values.description}
			  
            />
		     
			<div className="text-danger">
                {formik.errors.description ? formik.errors.description : null}
            </div>			 
          </div>

           <button type="submit" className="btn btn-success">
              Submit
          </button>
		  </form> 
        </div>
      )}
	 
    </div>
   </div>	
  );
};

export default AddBlog;
