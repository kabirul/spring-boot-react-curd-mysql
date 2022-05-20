import http from "./HttpService";

const getAll = () => {
  return http.get("/blogs");
};

const get = (id) => {
  return http.get("/blogs/"+id);
};

const create = (data) => {
  return http.post("/blogs", data);
};

const update = (id, data) => {
  return http.put("/blogs/"+id, data);
};

const remove = (id) => {
  return http.delete("/blogs/"+id);
};

const removeAll = () => {
  return http.delete("/blogs");
};

const findByTitle = (title) => {
  return http.get("/blogs?title="+title);
};

const BlogService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default BlogService;
