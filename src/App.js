import { useEffect, useState } from "react";

import "./styles.css";
const api = "https://jsonplaceholder.typicode.com/posts";

function PostCard({ title, body }) {
  return (
    <card className="PostCard">
      <p className="PostCardTitle">{title}</p>
      <p className="PostCardBody">{body}</p>
    </card>
  );
}

export default function App() {
  const [state, setState] = useState("loading");
  const [posts, setPosts] = useState([]);

  async function fetchData() {
    try {
      const resp = await fetch(api);
      const data = await resp.json();

      setPosts(data);
      setState("success");
    } catch (e) {
      console.log(e);
      setState("error");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (state === "error") {
    return (
      <div className="App">
        <h1>Something went wrong!</h1>
        <p>Try reloading the page</p>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="App">
        <h1>Loading posts...</h1>
        <p>Please wait</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="PostCardContainer">
        {posts.map((post) => {
          return <PostCard title={post.title} body={post.body} />;
        })}
      </div>
    </div>
  );
}
