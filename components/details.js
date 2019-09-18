import React, { useState, useEffect } from "react";

const Details = props => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://beta.stockzoom.com/api/v1/me/portfolios/" + props.id + "/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(post => {
          setPosts([post]);
        });
      } else {
        console.log("error retrieving data");
      }
    });
  }, []);
  return (
    <article>
      {posts
        ? posts.map((post, index) => (
            <div key={index}>
              <h2>{post.name}</h2>
              <p>Provider: {post.provider}</p>
              <p>
                Account: {post.kind}, {post.account_number}
              </p>
              <p>
                Total value: {post.total_value} {post.currency}
              </p>
              <p>
                Market value: {post.market_value} {post.currency}
              </p>
              <p>
                Cash: {post.cash} {post.currency}
              </p>
              <br />
              <span>Created: {post.created_at.substring(0, 10)}</span>
            </div>
          ))
        : null}
      <style jsx>
        {`
          article {
            border: 1px solid #DDD;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
          }
          div{
            margin: 20px;
          }
          p {
            margin: 0;
            padding: 0;
          }
          span {
            font-size: 12px;
          }
        `}
      </style>
    </article>
  );
};

export default Details;
