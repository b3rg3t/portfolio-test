import React, { useState } from "react";
import Layout from "../../components/layout.js";
import Link from "next/link";
import PortfolioChart from "../../components/instrument";
import Details from "../../components/details";

const Post = props => {
  const [details, setDetails] = useState(true);
  const [instrument, setInstrument] = useState(true);
  const showStocks = "Show Stocks"
  const hideStocks = "Hide Stocks"
  const showDetails = "Show Details"
  const hideDetails = "Hide Details"
  const toggleDetails = () => {
    details ? setDetails(false) : setDetails(true);
  };
  const toggleInstrument = () => {
    !instrument ? setInstrument(true): setInstrument(false);
  };
  return (
    <Layout>
      <ul>
        <li>
          <Link href="/portfolio">
            <a>Portfolios</a>
          </Link>
        </li>
        <li>
          <a onClick={toggleInstrument}>{!instrument ? `${showStocks}` : `${hideStocks}`}</a>
        </li>
        <li>
          <a onClick={toggleDetails}>{!details ? `${showDetails}` : `${hideDetails}`}</a>
        </li>
      </ul>

      {details ? <Details id={props.id} /> : null}
      {instrument ? <PortfolioChart id={props.id} /> : null}

      <style jsx>{`
        ul {
          padding: 0;
          display: flex;
        }
        li {
          list-style: none;
          margin-left: 15px;
        }
        a {
          text-decoration: none;
          color: blue;
          font-family: "Arial";
          cursor: pointer;
        }
        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  );
};

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  return { id };
};

export default Post;
