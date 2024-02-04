import { Box, Button, formatMs, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import MyModal from "../../../Modal/Modal";
import React, { useState } from "react";
import { constants } from "../../../Helpers/constantsFile";
import { Autocomplete, FormControl, MenuItem } from "@mui/material";
import Register from "../../../utils/Register";
import TestForm from "./TestForm";
import TestTable from "./TestTable";
import { useDispatch, useSelector } from "react-redux";
import { addTableTestData, deleteTableTestData, setTableTestData } from "../../../redux/actions/tableTestDataActions";
import { addTest } from "../../../redux/actions/testsActions";

const TestPopUp = (props) => {
  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Phone", type: "text", name: "phone" },
    { label: "Enter Age", type: "text", name: "age" },
  ];

  const [file, setFile] = useState();
  const [name, setName] = useState(props.update ? props.name : null);
  const [disabled, setDisabled] = useState(false);
  const formData = new FormData();
  const [newPatient, setNewPatient] = useState(false);
  const [patientInfo, setPatientInfo] = useState()

  const patients = useSelector(state => state.patients.patients)
  const tableTestData = useSelector(state => state.tableTestData.tableTestData)
  console.log(patients)

  const addPatient = () => {
    setNewPatient(true);
  };

  const [reset, setReset] = useState(false)

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  if (file) {
    formData.append("cover", file);
  }

  const dispach = useDispatch()

  const [apiData, setApiData] = useState([])

  const [data, setData] = useState(
    {
      name: null,
      note: null,
      patient: null,

    }
  )


  const removeItem = (item) => {
    dispach(deleteTableTestData(item))
    setApiData((current) => current.filter((i) => i.item !== item.item));
    // setPurchaseData((prevState) => {
    //   return {
    //     ...prevState,
    //     item: null,
    //   };
    // });
  };


  const createTest = () => {

    // if (props.products?.length < 1) return alert("Add items to the list!")
    
    // setDisable(true)
    if (apiData?.length < 1) return alert("Add tests to the table!")
    axios.post(`${constants.baseUrl}/tests`, apiData,
    {
      headers: {
        "authorization": constants.token
      }
    }
    ).then((res) => {
      alert("Succesfully created test(s)!")
      dispach(addTest(res.data?.data?.test))
      props.togglePrint(tableTestData)
      dispach(setTableTestData([]))
      props.hideModal()
    }).catch((err) => {
      alert(err.response?.data?.message)
      // setDisable(false)
    })
  }

  return (
    <MyModal
      onClose={() => props.hideModal()}
      // pwidth="650px"
      // pheight = "478px"
      top="17%"
      left="32%"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "15px",
          width: "100%",
          height: "400px",
          overflowY: "scroll",
          overFlowX: "hidden",
          padding: "15px",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <Typography
            style={{
              color: "#4F32D2",
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "10px",
            }}
          >
            Create Test
          </Typography>
        </div>

        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
     
        <Autocomplete
          id="country-select-demo"
          // key={props.autoReset}
          // disabled={disable}
          sx={{ width: 200 }}
          onChange={(event, value) => {
            setPatientInfo(value)
            setData((prevState) => {
              return {
                ...prevState,
                patient: value,
              };
            });
          }}
          options={patients}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.name}
              {/* ({option.code}) +{option.phone} */}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              placeholder="Select Patient"
              style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />

          <Typography
            style={{
              color: "#F22417",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => addPatient()}
          >
            Add Patient
          </Typography>
        </div>

        <div style = {{display: "flex", flexDirection: "row",
        width: "100%",
     alignItems: "flex-end", gap: "30px"}}>

          <TestForm  
          reset={reset}
          testName={(data) => {
          setData((prevState) => {
            return {
              ...prevState,
              name: data,
            };
          });
          setReset(false);
        }}
        testNote={(data) => {
          setData((prevState) => {
            return {
              ...prevState,
              note: data,
            };
          });
          setReset(false);
        }}/>

          <div>
          <Button
            // disabled = {disable}
            style={{
              width: "140px",
              fontSize: "15px",
              height: "40px",
              borderRadius: "8px",
              fontWeight: "bold",
              background: "black",
              color: "white",
              alignSelf: "end"
            }}
            onClick={() => {
              
            
              if (!data?.name || !data?.patient) {
                return alert ("Please fill all the blanks")
              }
              dispach(addTableTestData({
                name: data.name, note: data.note, patient: data.patient
              }))
              setData((prevState) => {
                return {
                  ...prevState,
                  name: null,
                  note: null,
                };
              });
              setApiData([...apiData, {
                name: data.name, note: data.note, patient: data.patient?.id
              }]);
              setReset(true)
            }}
         
            variant="contained"
          >
            Add TEST
          </Button>
          </div>
        </div>

        <TestTable 
        removeItem={(item) => removeItem(item)} 
       />

        <Button
          //   disabled = {disable}
          style={{
            width: "181px",
            fontSize: "16px",
            backgroundColor: "#5130DE",
            color: "white",
            height: "50px",
            fontWeight: "bold",
          }}
          type="submit"
          variant="contained"
          onClick={() => createTest()}
        >
          Create Test
        </Button>

        {newPatient && (
          <Register
            //   update={update}
            //   instance={updatedCustomer}
            //   reset={resetFomr}
            hideModal={(data) => {
              setNewPatient(false);
              props.change()
            }}
            fields={fields}
            url="patients"
            name="Patient"
            //   change={() => changeHandler()}
            //   addCus = {(customer) => addCus(customer)}
          />
        )}
      </div>
    
    </MyModal>
  );
};

export default TestPopUp;
