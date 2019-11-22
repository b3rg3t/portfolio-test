import React, { useState, useEffect } from "react";

import Link from "next/link";
import { logout } from "./auth/auth.js";


///


export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if(localToken){
      setLoggedIn(true)
    }
  }, [])
  return (
    <header>
      <nav>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
          {loggedIn ? <button onClick={logout}>Log out</button> : <Link href="/login"><button>Log in</button></Link>}
        </div>
      </nav>
      <style jsx>
        {`
          div {
            width: 100%;
          }
          ul {
            display: flex;
            margin: 0;
            padding: 0;
          }
          li {
            list-style: none;
          }
          a {
            text-decoration: none;
            color: blue;
            font-family: "Arial";
          }
          button {
            border-radius: 5px;
            position: absolute;
            right: 50px;
            z-index: 10;
          }

          a:hover {
            opacity: 0.6;
          }
        `}
      </style>
    </header>
  );
}
