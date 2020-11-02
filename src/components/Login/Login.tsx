import styles from './Login.module.css';

import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import GithubIcon from "mdi-react/GithubIcon";
import { AuthContext } from "../../App";


const Login: React.FC = () => {
  const [data, setData] = React.useState({ errorMessage: "", isLoading: false });
  const { state, dispatch } = useContext(AuthContext);

  const { client_id, redirect_uri } = state;

  return (
  <div className={styles.Login} data-testid="Login">
    Login Component
    <p>{client_id}</p>
    <p>{redirect_uri}</p>
    
  </div>
  )
};

export default Login;
