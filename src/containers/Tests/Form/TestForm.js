import { Typography } from "@material-ui/core";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TestForm = (props) => {
  const products = useSelector((state) => state.products.products);
  const serviceTypes = useSelector((state) => state.serviceTypes.serviceTypes);

  const [testName, setTestName] = useState();
  const [testNote, setTestNote] = useState();

  useEffect(()=> {
    if (props.reset) {
      setTestName("")
      setTestNote("")
    }
  }, [props.reset])

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
      }}
    >

<div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography style={{ fontWeight: "600", fontSize: "13px" }}>
          {" "}
          Test Name:
        </Typography>
        <Autocomplete
          autoComplete={false}
          onChange={(event, value) => props.testName(value?.name)}
          // key={`${props.autoReset}m`}
          id="country-select-demo"
          sx={{ width: 160 }}
          options={serviceTypes}
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
              class="myText"
              variant="outlined"
              placeholder="Select Service"
              style={{ border: "1.5px solid #6E6E6E", borderRadius: "8px" }}
              {...params}
              // label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      > 

        <Typography style={{ fontWeight: "600", fontSize: "13px" }}>
          {" "}
          Test Note:
        </Typography>
        <input
          value={testNote}
          type="text"
          style={{
            width: "160px",
            height: "38px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "1px solid #6E6E6E",
          }}
          onChange={(e) => {
            props.testNote(e.target.value);
            setTestNote(e.target.value);
          }}
        />
      </div>

 
    </div>
  );
};

export default TestForm;
