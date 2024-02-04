import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import MyModal from "../../Modal/Modal"
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../../Helpers/constantsFile";
import { setCustomers } from "../../redux/actions/customersActions";
import useFetch from "../../funcrions/DataFetchers";
import { setVendors } from "../../redux/actions/vendorsActions";
import { Button, Typography } from "@material-ui/core";
import moment from "moment";
import { deleteFunction } from "../../funcrions/deleteStuff";

const Payment = (props) => {

  const token = useSelector(state => state.token.token)

  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [disabled, setDisabled] = useState(false)
  const [ok, setOk] = useState("")
  const [usernameOrPasswordError, setUsernameOrPasswordError] = useState('')
  const today = new Date();
  const arr =   [
    { label: "Geli Faahfaahin", type: "text", name: "description" },
    { label: "Geli Lacagta", type: "number", name: "credit" },
    { label: "", type: "date", name: "date" },
  ]

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px"}

  const dispatch = useDispatch()

  const validate = (values) => {
    const errors = {};

    if (!values.credit) {
      errors.credit = "Field is Required";
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      description:  "",
      credit: "",
      date: moment(today).format("YYYY-MM-DD")
    },
    validate,
    onSubmit: async (values, { resetForm }) =>  {
       values.description = values.description || "Payment";
        values.debit = 0
        values.vendor = props.instance?._id
        values.user = props.instance?.user?._id
      setDisabled(true)

        const res = await axios.post(`${constants.baseUrl}/transactions`, values,
        {
          headers: {
            "authorization": token
          }
        }).then((res)=> {
          setDisabled(false)
          props.hideModal()
          alert("Waa la bixiyay!")
          props.stateTran(res.data?.response?.data?.transaction)
        }
        ).catch((err)=> {
          alert(err.response.data.message);
          setDisabled(false)
        }
        )
    },
  });

  return (
    <MyModal onClose = {props.hideModal} width = "300px" top = "30%">
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", gap: "12px", flexWrap: "wrap",
      justifyContent: "center", flexDirection: "column", width: "380px",
      padding:"16px 0px",
      alignItems: "center"
     }}
    >
        <Typography style = {{
            fontSize: "22px", fontWeight: "bold",
            marginBottom: "5px"
        }}> {"PAYMENT FORM"}</Typography>
        {props.update && 
        <div style = {{display: "flex", width: "300px", justifyContent: "space-between",
        alignItems: "end", marginBottom: "10px"}}>
        </div>}

      {arr.map((a, index) => (
        <div>
          <input
            placeholder={a.label}
            id={a.name}
            name={a.name}
            type={a.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[a.name]}
            style={{
              width: "300px",
              height: "50px",
              padding: "15px",
              fontSize: "16px",
              border: "1px solid grey",
              borderRadius: "6px",
            }}
            key={index}
          />
          {formik.touched[a.name] && formik.errors[a.name] ? (
            <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
          ) : null}
        </div>
      ))}

      <button
        disabled = {disabled}
        style={{
          width: "300px",
          fontSize: "18px",
          backgroundColor: disabled ? "lightgrey" : "#03656F",
          fontWeight: "600",
          color: "white",
          height: "45px",
          border: "none",
          marginTop: "5px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        type="submit"
      >
        {" "}
      BIXIN
      </button>
    
    </form>
    </MyModal>
  );
};

export default Payment;
