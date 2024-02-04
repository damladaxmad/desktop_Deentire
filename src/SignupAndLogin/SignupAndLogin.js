import React, { useEffect, useState } from "react";
import { TextField, Button, } from "@material-ui/core";
import { useFormik } from "formik";
import axios from "axios";
import Login from "./Login";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SignupAndLogin = (props) => {
  const classes=useStyles()
  const isConnected = useSelector(state => state.isLogin.isConnected)

    const showHandler = (user) => {
      props.showHandler(user)
    }

    const parentDivStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        minWidth: "400px%",
        maxWidth: "400px",
        marginBottom: "10px",
        gap: "16px",
        background: "white",
        padding: '16px',
        borderRadius: "10px",
        marginTop: "13%"
      }

    
  return (
    <div
      style={parentDivStyle}
    >
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center"
          }}>
        {isConnected == "no connection" && <p style={{color: "red"}}> No Server Connection!</p>}
        <p style={{margin: "0px",
        fontSize:"22px", fontWeight: "700",
        color: "#03656F",}}
        >Login</p>
        </div>
        
       {/* {isConnected == "loading" && status && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>} */}
      <Login showHandler = {(user) => showHandler(user)} />
    </div>
  );
};

export default SignupAndLogin;