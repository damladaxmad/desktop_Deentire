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

const TransactionForm = (props) => {
  const token = useSelector(state => state.token.token)

  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [disabled, setDisabled] = useState(false)
  const [ok, setOk] = useState("")
  const [usernameOrPasswordError, setUsernameOrPasswordError] = useState('')
  const today = new Date();
  const arr =  props.type == "bixin" ?   [
    { label: "Geli Lacagta", type: "number", name: "credit" },
    { label: "Geli Faahfaahin", type: "text", name: "description" },
    { label: "", type: "date", name: "date" },
  ] :
  [
    { label: "Geli Lacagta", type: "number", name: "debit" },
    { label: "Geli Faahfaahin", type: "text", name: "description" },
    { label: "", type: "date", name: "date" },
  ];

  console.log(props.update)
  const deleteTransaction = async () => {
    await deleteFunction(
      `Delete Transaction`,
      props.tran?.description,
      `${constants.baseUrl}/transactions/${props.tran?._id}`,
      ()=> {props.onDelete(props.tran?._id)}, ()=> {props.hideModal()},
      token
    );
  };

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px"}

  const dispatch = useDispatch()

  const validate = (values) => {
    const errors = {};

    if (!values.debit && props.type == "deen") {
      errors.debit = "Field is Required";
    }
    if (!values.credit && props.type == "bixin") {
      errors.credit = "Field is Required";
    }
    if (!values.description && props.type == "deen") {
      errors.description = "Field is Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      description: props.update ? props.tran.description : "",
      debit: props.update ? props.tran.debit : "",
      credit: props.update ? props.tran.credit : "",
      date: props.update ? props.tran.date  : today
    },
    validate,
    onSubmit: async (values, { resetForm }) =>  {
        values.description = values.description || "Payment";
        props.type == "bixin" ? values.debit = 0 : values.credit = 0
        values.vendor = props.instance?._id
        values.user = props.instance?.user?._id
      setDisabled(true)
      console.log(props.update)

      if (props.update){
        const res = await axios.patch(`${constants.baseUrl}/transactions/${props.tran?._id}`, values,
        {
          headers: {
            "authorization": token
          }
        }).then((res)=> {
          props.stateTran(res.data?.data?.transaction)
          // setOk("ok")
          props.hideModal()
          // alert("Waa lagu update gareeyay!")
          setDisabled(false)
          props.change()
        }
        ).catch((err)=> {
          alert(err.response.data.message);
          setDisabled(false)
        }
        )
      }

      else {
        const res = await axios.post(`${constants.baseUrl}/transactions`, values,
        {
          headers: {
            "authorization": token
          }
        }).then((res)=> {
          setDisabled(false)
          props.hideModal()
          // alert("Waa la bixiyay!")
          props.stateTran(res.data?.response?.data?.transaction)
          props.change()
        }
        ).catch((err)=> {
          alert(err.response.data.message);
          setDisabled(false)
        }
        )
      }

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
        {!props.update &&<Typography style = {{
            fontSize: "22px", fontWeight: "bold",
            marginBottom: "5px"
        }}> {props.type == "deen" ? "DEEN CUSUB FORM" : "PAYMENT FORM"}</Typography>}
        {props.update && 
        <div style = {{display: "flex", width: "300px", justifyContent: "space-between",
        alignItems: "end", marginBottom: "10px"}}>
        {/* <Typography style = {{
            fontSize: "22px", fontWeight: "bold",
            marginBottom: "5px",
        }}> UPDATE FORM</Typography> */}

        <Button style={{
          width: "100px",
          fontSize: "16px",
          backgroundColor: "#F03E06",
          fontWeight: "600",
          marginLeft: "auto",
          color: "white",
          height: "35px",
          border: "none",
          marginTop: "5px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={()=> deleteTransaction()}>
          DELETE
        </Button>
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
      {props.update ? "UPDATE" : "XAREY"} 
      </button>
    
    </form>
    </MyModal>
  );
};

export default TransactionForm;
