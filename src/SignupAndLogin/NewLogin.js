import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { constants } from "../Helpers/constantsFile";
import { setActiveUser } from "../redux/actions/activeUseActions";
import { setToken } from "../redux/actions/tokenActions";
import { setIsLogin } from "../redux/actions/isLoginActions";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

const NewLogin = (props) => {
  const dispatch = useDispatch();
  const [usernameOrPasswordError, setUsernameOrPasswordError] = useState("");
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setFieldError, setSubmitting }) => {
    try {
      const res = await axios.post(`${constants?.baseUrl}/users/authenticate`, {
        username: values.username,
        password: values.password,
        version: "notify_version",
      });
      props.showHandler()
      dispatch(setActiveUser(res.data?.data?.user));
      dispatch(setToken(`Bearer ${res?.data?.token}`));
      dispatch(setIsLogin(true));
      console.log("Login successful:", res?.data);
    } catch (error) {
      setUsernameOrPasswordError(error.response?.data?.message);
      if (error.response) {
        const { data } = error.response;
        if (data && data.error) {
          setFieldError("password", data.error); // Set error for password field, for example
        }
      }
    }
    setSubmitting(false);
  };

  return (
    <div
      style={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "15px",
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
        padding: "20px 60px",
        borderRadius: "10px",
        marginTop: "13%",
      }}
    >
      <Typography
        style={{
          color: "#03656F",
          alignSelf: "center",
          fontWeight: "bold",
          fontSize: "28px",
        }}
      >
        LOGIN
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <Field
                  placeholder="Enter Username"
                  id="username"
                  name="username"
                  type="text"
                  style={{
                    width: "290px",
                    height: "50px",
                    padding: "15px",
                    fontSize: "16px",
                    border: "1.5px solid grey",
                    borderRadius: "6px",
                  }}
                />
                <ErrorMessage name="username" component="div" 
                style = {{ color: "red"}} />
              </div>

              <div>
                <Field
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  type="password"
                  style={{
                    width: "290px",
                    height: "50px",
                    padding: "15px",
                    fontSize: "16px",
                    border: "1.5px solid grey",
                    borderRadius: "6px",
                  }}
                />
                <ErrorMessage name="password" component="div" 
                 style = {{ color: "red"}} />
              </div>

              {/* <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button> */}
              <Button
                disabled={isSubmitting}
                style={{
                  width: "290px",
                  fontSize: "20px",
                  backgroundColor: !isSubmitting ? "#03656F" : "lightgray",
                  fontWeight: "600",
                  color: "white",
                  height: "50px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "5px",
                  // pointerEvents: "none"
                }}
                type="submit"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              {usernameOrPasswordError != "" ? (
              <p style={{ alignSelf: "center", color: "red" }}>
                {usernameOrPasswordError}
              </p>
            ) : null}
            </div>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewLogin;
