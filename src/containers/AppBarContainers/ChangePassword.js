import Modal from "../../Modal/Modal";
import { Button, Divider, Typography  } from "@material-ui/core";
import {TextField, Select} from "@mui/material"
import React, { useState } from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";

const ChangePassword = (props) => {

  const token = useSelector(state => state.token.token)

  const arr = [
    { label: "Geli Pin-ki hore", type: "text", name: "currentPassword" },
    { label: "Geli Pin-ka cusub", type: "text", name: "newPassword" },
    { label: "Ku celi pin-ka cusub", type: "text", name: "affirm" },
  ];

  const validate = (values) => {
    const errors = {};
   
    if (!values.currentPassword) {
      errors.currentPassword = "Field is Required";
    }

    if (!values.newPassword) {
      errors.newPassword = "Field is Required";
    }
    if (!values.affirm) {
      errors.affirm = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      affirm: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
        if (values.newPassword !== values.affirm) return alert("Isma laha labada password")
        console.log(values)
        axios.post(`${constants.baseUrl}/users/change-password/${props.user._id}`, {
          passwordCurrent: values.currentPassword,
          password: values.newPassword,
          passwordConfirm: values.affirm
        }, {
          headers: {
            authorization: token
          }
        }).then((res) => {
             alert("Waa la badalay Pin-ka")
             props.hideModal();
             resetForm();  
        }).catch((err)=> {
          alert(err?.response?.data?.message);
          console.log(values?.currentPassword, values?.newPassword)
        });
        alert(`${props.employee.first_name} ${props.employee.middle_name} is made a user`)
    
    },
  });

 
  return (
    <Modal onClose = {()=> props.hideModal() } pwidth = "450px" top = "26%">
      <div
        style={{
          display: "flex",
          width: "410px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
          padding: "10px"
        }}
      >
        <Typography style = {{
          fontWeight:"bold",
          fontSize: "20px",
          marginBottom: "10px"
        }}>BEDEL PIN-KA </Typography>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: "column", alignItems: "center" }}
      >
        {arr.map((a, index) => (
          <div>
            <input
              autoComplete="off"
              variant="outlined"
              label={a.label}
              id={a.name}
              placeholder = {a.label}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "310px", color: "black", borderRadius: "8px",
              height: "50px", padding: "15px", border: "1.5px solid lightGray" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}
  

        <Button
          style={{
            width: "310px",
            fontSize: "16px",
            backgroundColor: "#03656F",
            color: "white",
            height: "45px",
            fontWeight: "bold"
          }}
          type="submit"
          variant="contained"
        >
          BEDEL PIN-KA
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default ChangePassword;
