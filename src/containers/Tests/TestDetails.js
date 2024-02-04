import { Button, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { useState } from "react"
import axios from "axios"
import { constants } from "../../Helpers/constantsFile"
import {MdOutlineDelete} from "react-icons/md"
import { deleteFunction } from "../../funcrions/deleteStuff"
import { addTest, deleteTest, setTests, updateTest } from "../../redux/actions/testsActions"
import Register from "../../utils/Register"
import { useEffect } from "react"
import useFetch from "../../funcrions/DataFetchers"


const TestDetails = (props) => {

  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Phone", type: "text", name: "phone" },
    { label: "Enter Age", type: "text", name: "age" },
  ];

   const tests = useSelector(state => state.tests.tests)
   const [updatePatient, setUpdatePatient] = useState(false)
   const [del, setDel] = useState(1)

   let myTests = []

   tests?.map(test => {
    if (test.patient?.id == props.data?.id) {
      myTests.push(test)
    }
   })



    return (
        <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          width: "100%",
          margin: "30px auto",
        }}
      >
         
         <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "20px 30px",
            background: "white",
            width: "95.3%",
            margin: "auto",
            marginTop: "20px",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
            <div>
            <Typography style = {{fontWeight: "bold",
        fontSize: "20px"}}>
                {props.data?.name}
            </Typography>
            <Typography style = {{
                fontSize: "18px",
                color: "#696767"
            }}> {props.data?.phone} - {props.data?.age} Jir</Typography>
            </div>


            <Typography style ={{
                color: "#4421DE",
                fontWeight: "bold",
                fontSize: "18px",
                cursor: "pointer"
            }}
            onClick= {()=> setUpdatePatient(true)}> Edit Patient</Typography>
            </div>

            <div style = {{
   display: "flex",
   justifyContent: "start",
   alignItems: "center",
   width: "95.3%",
   margin: "30px auto",
   flexWrap: "wrap",
   gap: "25px"
  }}>

{updatePatient && (
        <Register
          update={updatePatient}
          instance={props.data}
          reset={()=> {
            setDel(del => del + 1)
          }}
          hideModal={(data) => {
            setUpdatePatient(false);
            props.change("update")
          //   !update && setNewCustomers(false);
          //  dispatch(deleteCustomer(data))
          //  dispatch(addCustomer(data))
          //   changeHandler();
          //   setButtonName("Add New Customers");
          }}
          fields={fields}
          url="patients"
          name="Patient"
          // change={() => changeHandler()}
          // addCus = {(customer) => addCus(customer)}
        />
      )}
            {myTests?.reverse().map(test => {
              return <MyTests data = {test} change = {() => {
                props.change()
              }} />
            })}

        </div>

        </div>
    )
}

const MyTests = (props) => {

  const [response, setResponse] = useState()
  const dispatch = useDispatch()

  const responseHandler = () => {
    axios.patch(`${constants.baseUrl}/tests/${props.data.id}`, {
      response: response
    },
    {
      headers: {
        "authorization": constants.token
      }
    }
    ).then((res) => {
      alert("Succesfully added response!")
      setResponse("")
      dispatch(updateTest(res.data?.data?.test.id))
      props.change()
    }).catch((err) => {
      alert(err.response?.data?.message)
      // setDisable(false)
    })
  }

  const deleteTestFun = () => {
  deleteFunction(
    "Delete Test", props.data.name, `${constants.baseUrl}/tests/${props.data.id}`,
    () => {
      dispatch(deleteTest(props.data))
    },
    () => {
      props.change()
    }
  )
  }

  return <div style = {{
    width: "31.3%",
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    alignItems: "center"

  }}>
    <div style = {{width: "100%", display: "flex",
  flexDirection: "column", gap: "4px"}}>
    <div style = {{display: "flex", 
    width: "100%", alignItems: "center",
  justifyContent: "space-between"}}>
      <Typography style = {{
        fontSize: "16px",
        fontWeight: "bold"
      }}>
        {props.data?.name}
      </Typography>

      <Typography style = {{
        fontSize: "16px",
        color: "#737373"
      }}>
        {moment(props.data?.date).format("YYYY-MM-DD")}
      </Typography>

      <MdOutlineDelete style = {{color: "red", fontSize: "20px",
    cursor: "pointer"}} onClick = {() => deleteTestFun()}/>
    </div>

    <div style = {{height: "1px", background: "lightGrey", width: "100%"}}> </div>
    </div>

    <Typography>
      {props.data?.response ? props.data?.response : "no response" }
    </Typography>

    <div style = {{display: "flex", width: "100%",
  flexDirection: "column", gap: "12px"}}>
    <input
          value={response}
        //   disabled = {true}
          type="text"
          style={{
            width: "100%",
            height: "40px",
            padding: "8px",
            fontSize: "15px",
            borderRadius: "8px",
            background: "#F0F2FA",
            border: "1px solid #6E6E6E",
          }}
          placeholder="Response Here"

          onChange={(e) => {
            setResponse(e.target.value);
          }}
        />
    <Button
          //   disabled = {disable}
          style={{
            width: "100%",
            fontSize: "16px",
            backgroundColor: "#5130DE",
            color: "white",
            height: "40px",
            fontWeight: "bold",
          }}
          variant="contained"
          onClick={() => responseHandler()}
        >
          Add response
        </Button>

        </div>
    
  </div>
}

export default TestDetails