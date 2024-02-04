import Modal from "../../../Modal/Modal";
import { Button, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import {TextField, Select} from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { constants } from "../../../Helpers/constantsFile";

const Payment = (props) => {

  const arr = [
    { label: "Enter Credit", type: "number", name: "credit" },

  ];

  const validate = (values) => {
    const errors = {};
   
    if (!values.credit) {
      errors.credit = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      client: props.user._id,
      user: "Super User",
      description: "Payment",
      transactionType: "Payment",
      credit: null
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log(values)
        axios.post(`${constants.baseUrl}/transactions`, values
        , {
          headers: {
            'authorization': constants.token
            },
        }).then((res) => {
             alert("Successfully Payed")
             resetForm();
             props.hideModal();
             props.change()
        }).catch((err) => {
          alert(err.response.data.message);
        });
       
    
    },
  });

 
  return (
    <Modal onClose = {props.hideModal} pwidth = "450px" top = "26%">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2>Charge User </h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: "column", alignItems: "center" }}
      >
        {arr.map((a, index) => (
          <div>
            <TextField
              disabled = {a.name == "name" ? true : null}
              variant="outlined"
              label={a.label}
              id={a.name}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "290px", color: "black", }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}
  

        <Button
          style={{
            width: "290px",
            fontSize: "16px",
            background: "#19274B",
            fontWeight: "bold",
            color: "white",
          }}
          type="submit"
          variant="contained"
        >
          Pay Money
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default Payment;
