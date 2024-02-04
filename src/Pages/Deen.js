import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import MyModal from "../Modal/Modal"
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../Helpers/constantsFile";
import { setCustomers, updateCustomer } from "../redux/actions/customersActions";
import useFetch from "../funcrions/DataFetchers";
import { setVendors } from "../redux/actions/vendorsActions";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import moment from "moment";
import { deleteFunction } from "../funcrions/deleteStuff";
import { Autocomplete } from "@mui/material";
import "../App.css"

const Deen = (props) => {

  const token = useSelector(state => state.token.token)
  const customers = useSelector(state => state.customers.customers)
  const [customer, setCustomer] = useState()
  const [stateTransactions, setStateTransactions] = useState(customer?.transactions || [])
  
  const stateTransactionHandler = (d) => {
    setStateTransactions(prevTransactions => {
      const filteredTransactions = prevTransactions?.filter(item => item._id !== d?._id);
      const updatedTransactions = [...filteredTransactions, d];
      return updatedTransactions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
    });
}

const newObj = { ...customer, transactions: stateTransactions };

useEffect(()=> {
  dispatch(updateCustomer(newObj));
}, [stateTransactions])

  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [disabled, setDisabled] = useState(false)
  const [ok, setOk] = useState("")
  const [usernameOrPasswordError, setUsernameOrPasswordError] = useState('')
  const today = new Date();
  const arr =  
  [
    { label: "Geli Faahfaahin", type: "text", name: "description" },
    { label: "Geli Lacagta", type: "number", name: "debit" },
    { label: "", type: "date", name: "date" },
  ];


  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px"}

  const dispatch = useDispatch()

  const validate = (values) => {
    const errors = {};

    if (!values.debit) {
      errors.debit = "Field is Required";
    }
  
    if (!values.description) {
      errors.description = "Field is Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      description: props.update ? props.tran.description : "",
      debit: props.update ? props.tran.debit : "",
      credit: props.update ? props.tran.credit : "",
      date: props.update ? moment(props.tran.date).format("YYYY-MM-DD")  : 
      moment(today).format("YYYY-MM-DD")
    },
    validate,
    onSubmit: async (values, { resetForm }) =>  {
        props.type == "bixin" ? values.debit = 0 : values.credit = 0
        values.description = values.description || "Payment";
        values.customer = customer
        values.user = props.instance?.user?._id
      setDisabled(true)
    
      const res = await axios.post(`${constants.baseUrl}/transactions`, values,
        {
          headers: {
            "authorization": token
          }
        }).then((res)=> {
          setDisabled(false)
          alert("Waa la xareeyay!")
          stateTransactionHandler(res.data?.response?.data?.transaction)

          resetForm()
        }
        ).catch((err)=> {
          alert(err.response.data.message);
          setDisabled(false)
        }
        )

    },
  });

  return (
    <div style = {{display: "flex", flexDirection: "column",
    width: "95%", margin: "20px auto", alignItems: "center"}}>

    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", gap: "12px", flexWrap: "wrap",
      justifyContent: "center", flexDirection: "column", width: "50%",
      padding:"30px 0px", background: "white",
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
      alignItems: "center", borderRadius: "10px"
     }}
    >
        {!props.update &&<Typography style = {{
            fontSize: "22px", fontWeight: "bold",
            marginBottom: "15px"
        }}> DEEN CUSUB FORM</Typography>}

        <Autocomplete
          fullWidth
          disableClearable   
          ListboxProps={{ style: { height: "330px" } }}
          autoComplete={false}
          style = {{width: "402px"}}
          onChange={(event, value) => setCustomer(value)}
        //   key={`${props.autoReset}m`}
          id="country-select-demo"
        //   sx={{ width: 200 }}
          options={customers}
        //   autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              style = {{display: "flex", flexDirection: "column",
            justifyContent: "start", alignItems: "start"}}
            >
                <p style = {{margin: "0px", fontSize: "16px"}}> {option.name}</p>
                <p style = {{margin: "0px", fontSize: "12px", color: "#A2A0A0"}}> {option.phone} </p>
             
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              class="myText"
              variant="outlined"
              placeholder="Select Customer"
              style={{ border: "1px solid grey", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />

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
              width: "400px",
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
          width: "400px",
          fontSize: "18px",
          backgroundColor: disabled ? "lightgrey" : "#03656F",
          fontWeight: "600",
          color: "white",
          height: "45px",
          border: "none",
          marginTop: "15px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        type="submit"
      >
        {" "}
      {props.update ? "UPDATE" : "XAREY"} 
      </button>
    
    </form>
    </div>
  );
};

export default Deen;
