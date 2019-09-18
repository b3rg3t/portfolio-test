import Router from "next/router";

export const logout = () => {
  localStorage.removeItem("token");
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};

export const login = token => {
  localStorage.setItem("token", [token]);
  Router.push("/");
  localStorage.removeItem("logout");
};

export const VerifyToken = function(token) {
  // const localStorageToken = localStorage.getItem("token");
  if (token) {
    fetch("https://beta.stockzoom.com/api-token-verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        token: token
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(({ token }) => login(token));
      } else {
        console.log("failed to verify token");
        Router.push("/login");
      }
    });
  }
  return token;
};
