import Layout from "../components/layout";
import React, { useState } from "react";
import { VerifyToken } from "./auth/auth"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const GetToken = function(email, password) {
    fetch("https://beta.stockzoom.com/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: `{"password": "${password}", "email": "${email}"}`
    }).then(response => {
      if (response.ok) {
        response.json().then(({ token }) => RefreshToken(token));
      }
      else{
        console.log("error! couldn´t get token")
      }
    });
  };
  const RefreshToken = function(token) {
    fetch("https://beta.stockzoom.com/api-token-refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        token: token
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(({ token }) => VerifyToken(token));
      }
      else{
        console.log("error! couldn´t refresh token")
      }
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    GetToken(email, password);
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <style jsx>{`
        display: flex;
        flex-direction: column;
        margin: auto;
        form {
          width: 50%;
          justify-content: center;
          align-items: center;
        }
        input {
          margin: 10px 0;
          width: 100%;
        }
        button {
          border-radius: 5px;
        }
      `}</style>
    </Layout>
  );
};


export default Login;
