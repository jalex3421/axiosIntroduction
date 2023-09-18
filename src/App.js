import axios from "axios";
import React from "react";
import './App.css'
//definition of URL
const baseURL = "https://jsonplaceholder.typicode.com/posts/";

export default function App() {
  const [post, setPost] = React.useState(null);
  //This is gonna be useful to handle some errors
  const [error, setError] = React.useState(null);
  //Unlike other methods like Fetch API, you only need .then()
  //now, it is time to define some useEffects hooks

 //1) Hook to perform DELETE, PUT and POST
  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);

  //If you wanna do the get operation, you should use this hooks instead:
  /*
    React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);
  */

  //POST Operation
  function createNewPost() {
    axios.post(baseURL, {title: "POST example: ",body: "New post done!!"}).then((response) => {
        setPost(response.data);
      });
  }
  //PUT Operation
  function updatePost() {
    axios.put(`${baseURL}/1`, {title: "PUT example: ",body: "Updated post!"}).then((response) => {
        setPost(response.data);
      });
  }
  //DELETE OPERATION
  function deletePost() {
    axios.delete(`${baseURL}/1`).then(() => {
        alert("The post has been deleted");
        setPost(null)
      });
  }

  //HANDLE RESPONSES
  //CASE 1: Error
  if (error) return `Error: ${error.message}`;
  //CASE 2: There is no post available
  if (!post) return(<div>
    <h1>Nothing to show right now...</h1>
    <button onClick={createNewPost}>Create Post</button>
    <button onClick={updatePost}>Update Post</button>
  </div>);
  //CASE 3: There is a post to show 
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button className='create-post' onClick={createNewPost}>Create Post</button>
      <button className='update-post' onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}