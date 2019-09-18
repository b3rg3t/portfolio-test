import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

const Portfolio = () => {
  return (
    <Layout>
      <h3>Portfolios</h3>
      <GetPortfolio />
      <style jsx>
        {`
          p {
            margin: 10px 0 0 0;
          }
          h1 {
            margin: 0;
            padding: 0;
          }
          ul {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </Layout>
  );
};
function GetPortfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [token, setToken] = useState("");
  useEffect(function GetUserPortfolio() {
    const token = localStorage.getItem("token");
    setToken(token);
    fetch("https://beta.stockzoom.com/api/v1/me/portfolios/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(portfolio => setPortfolio(portfolio.results));
      } else {
        console.log("User is not signed in");
        alert("You have to sign in to see your portfolio!");
        Router.push("/login");
      }
    });
  }, []);
  return (
    <main>
      <ul>
        {portfolio
          ? portfolio.map(port => (
              <li key={port.alias}>
                <Link href={`/p/[id]`} as={`/p/${port.alias}`}>
                  <a>
                    <b>{port.name}</b>
                  </a>
                </Link>
                <p>
                  Cash: {port.cash} {port.currency}
                </p>
              </li>
            ))
          : null}
      </ul>
      <style jsx>
        {`
          div {
            display: flex;
            flex: 1 1;
            margin: 0;
          }
          p {
            margin: 3px 10px;
            width: 50%;
          }
          li {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 5px 0;
            padding: 20px 10px;
            border: 1px solid #ddd;
            width: 50%;
            border-radius: 5px;
          }
          a {
            text-decoration: none;
            color: blue;
            font-family: "Arial";
          }
          a:hover {
            opacity: 0.6;
          }
          span {
            margin-left: 10px;
            font-size: 12px;
          }
        `}
      </style>
    </main>
  );
}
export default Portfolio;
