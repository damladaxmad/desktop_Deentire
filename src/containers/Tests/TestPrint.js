import { Button, Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";
import moment from "moment";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
import printHeader from "../../assets/images/printHeader.jpg";
import secondHeader from "../../assets/images/secondHeader.png";
import kulmiyeLogo from "../../assets/images/kulmiyeLogo.jpg";

const TestPrint = (props) => {
    const componentRef = useRef();

    return (
        <>
        {props.apiData?.map(data => {
          return    <div
          id="saleReport"
          style={{
            alignSelf: "center",
          //   marginTop: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "820px",
            marginBottom: "30px",
            background: "white",
            borderRadius: '8px',
            paddingBottom: "10px",
            gap: "0px",
          }}
          class="waryaa"
          ref={componentRef}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "end",
            }}
          >
            <ReactToPrint
              trigger={() => (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#2F49D1",
                    color: "white",
                    width: "100px",
                    alignSelf: "flex-end",
                  }}
                  startIcon={
                    <AiFillPrinter
                      style={{
                        color: "white",
                      }}
                    />
                  }
                >
                  Print
                </Button>
              )}
              content={() => componentRef.current}
              pageStyle="print"
            />
          </div>
  
          <div style = {{
          }}>
          <img
              src={printHeader}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <div style = {{width: "90%", display: "flex",
        flexDirection: "column", margin: "15px auto"}}>

          <div style = {{width: "100%", display: "flex",
        justifyContent: "space-between", alignItems: "start"}}>
            <div>
          <div style = {{display: "flex", gap: "20px"}}>
              <Typography style = {{
                fontSize: "20px",
              }}>
                Name:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {data.patient?.name}
              </Typography>
            </div>
            <div style = {{display: "flex", gap: "20px",
          marginTop: "10px"}}>
              <Typography style = {{
                fontSize: "20px",
              }}>
                Phone:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {data.patient?.phone}
              </Typography>
            </div>
            </div>
              <div>
            <div style = {{display: "flex", gap: "20px",
          marginTop: "10px"}}>
              <Typography style = {{
                fontSize: "20px",
              }}>
                Age:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {data.patient?.age}
              </Typography>
            </div>
            <div style = {{display: "flex", gap: "20px",
          marginTop: "10px"}}>
              <Typography style = {{
                fontSize: "20px",
              }}>
                ID:
              </Typography>
              <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold"
              }}>
                {data.patient?.patientId >= 10 ? "0" : "00"}{data.patient?.patientId}
              </Typography>
            </div>
            </div>
          </div>

          

          <div style = {{width: "100%", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        marginTop: "30px"}}>
              <Typography style = {{
                fontSize: "24px",
              }}>
                ___{data.name}:
              </Typography>

              <div style = {{width: "65%", height: "50px", background: "white",
            border: "2px solid grey", borderRadius: "10px"}}>
              </div>
          </div>
          <Typography>
            {data.note}
          </Typography>

          <Typography style = {{
                fontSize: "22px",
                fontWeight: "bold",
                marginTop: "30px"
              }}>
            Prescription:
          </Typography>

          <div style = {{ height: "500px",
          display: "flex", justifyContent: "center"
          }}>
          <img
              src={kulmiyeLogo}
              style={{
                width: "70%",
                height: "100%",
                opacity: "0.1"
                
              }}
            />
          </div>

    
  
          </div>
          <Typography style = {{
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: "15px"
              }}>
                Doctor Signature:   _________________
              </Typography>
        </div>
        })}

        <Button variant="contained" style = {{
          backgroundColor: "#2F49D1",
          color: "white",
          width: "100px",
          alignSelf: "center"
        }}
        onClick = {() => props.goBack()}>
          Go back
        </Button>
     
      </>
    )
}

export default TestPrint