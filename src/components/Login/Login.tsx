import styles from './Login.module.css';
import Styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import GithubIcon from "mdi-react/GithubIcon";
import { AuthContext } from "../../App";
import queryString from 'query-string';
import { userInfo } from 'os';
const Login: React.FC = () => {
  const [data, setData] = React.useState({ errorMessage: "", isLoading: false });
  const { state, dispatch } = useContext(AuthContext);
  const { client_id, redirect_uri } = state;
  const { Octokit } = require("@octokit/rest");


  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    console.log(url)
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, '', newUrl[0]);
      setData({ ...data, isLoading: true });
      console.log(data)

      const proxy_url = "https://cors-anywhere.herokuapp.com/"
      const target_url = `https://github.com/login/oauth/access_token?client_id=${state.client_id}&client_secret=${state.client_secret}&code=${newUrl[1]}&redirect_uri=${state.redirect_uri}`;
      // Use code parameter and other parameters to make POST request to proxy_server
      let access_token: any
      fetch(proxy_url+target_url, {
        method: "POST",

      })
        .then(response => response.text())
        .then(params => {
          access_token = queryString.parse(params)?.access_token || null
          const octokit = new Octokit({
            auth: access_token
          })
          return octokit.request("/user")
        })
        .then(user => {
          dispatch({
            type: "LOGIN",
            payload: { user: user.data, isLoggedIn: true , access_token: access_token}
          });
        })
        .catch(error => {
          console.log(error)
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        });
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <section className="container">
        <div>
          <h1>Welcome</h1>
          <span>Octokit Test App</span>
          <span>{data?.errorMessage}</span>
          <div className="login-container">
            {data.isLoading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {
                  // Link to request GitHub access
                }
                <a
                  className="login-link"
                  href={`https://github.com/login/oauth/authorize?scope=user,repo&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                  onClick={() => {
                    setData({ ...data, errorMessage: "" });
                  }}
                >
                  <GithubIcon />
                  <span>Login with GitHub</span>
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
};

export default Login;
