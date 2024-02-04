import { Button, Typography } from "@mui/material";
import MaterialTable from "material-table";
import MyModal from "../../Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";
import moment from "moment";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
import MyTable from "../../utils/MyTable"
import PrintTable from "./PrintTable";
import { constants } from "../../Helpers/constantsFile";
// import PrintTable from "./printTable";

const PrintReport = (props) => {
    const componentRef = useRef();

    const columns = [
        { title: "Customer Name", field: "name", width: "30%" },
        { title: "Customer Phone", field: "phone" , width: "20%" },
        { title: "Location", field: "district", width: "20%"  },
        { title: "Balance", field: "balance", width: "30%",  render: (data) => {
          return (
            <p style={{ alignSelf: "end" }}>
              {constants?.moneySign}{data?.balance?.toFixed(2)} 
            </p>
          );
        }, }, 
      ]
    const data =  props.data

    const itemsPerPage = 12; // Number of items to display per page

    // Calculate number of complete pages
    const completePages = Math.floor(data.length / itemsPerPage);
  
    // Calculate the number of rows in the incomplete page
    const rowsOnIncompletePage = data.length % itemsPerPage;
  
    return (

        <MyModal
    onClose={() => props.hideModal()}
    pwidth="650px"
    pheight = "478px"
    top="15%"
    left="30%"
  >
        <div
          id="saleReport"
          style={{
            alignSelf: "start",
          //   marginTop: "10px",
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
            width: "101%",
            height: "100%",
            padding: "15px",
            marginBottom: "30px",
            background: "white",
            borderRadius: '8px',
            paddingBottom: "10px",
            gap: "0px",
            overflowY: "scroll"
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
  
        <div style = {{display: "flex", flexDirection:"column",
        gap: "30px", padding: "20px", marginTop: "23px",
        widht: "100%"}}>
            <div style = {{display: "flex", flexDirection: "column", gap: "0px"}}>
                <Typography style = {{
                    fontSize: "20px", fontWeight: "bold"
                }}> ISKAASHI SUPERMARKET</Typography>
                <Typography style = {{
                    fontSize: "20px",
                }}> 0616549198</Typography>
            </div>
            <div style = {{display: "flex", flexDirection: "column", gap: "0px"}}>
                <Typography style = {{
                    fontSize: "20px", fontWeight: "bold"
                }}> ISKAASHI SUPERMARKET</Typography>
                <Typography style = {{
                    fontSize: "20px",
                }}> 0616549198</Typography>
            </div>
        </div>
        {[...Array(completePages)].map((_, index) => (
        <div key={index} style={{ pageBreakAfter: 'always', width: "100%" }}>
          <MaterialTable
          style={{ width: '100%', border: "none", marginTop:"30px" }}
            columns={columns}
            data={data.slice(index * itemsPerPage, (index + 1) * itemsPerPage)}
            title={`Printable Table - Page ${index + 1}`}
            options={{
              paging: false, // Disable material-table's built-in pagination
              toolbar: false, // Hide toolbar (including header)
              showTitle: false, 
              sorting: false, // Disable sorting
              cellStyle: { borderBottom: 'none' }, // Remove cell borders
              rowStyle: { borderBottom: 'none' }, // Remove row borders
              showTextRowsSelected: false,// Disable material-table's built-in pagination
            }}
          />
        </div>
      ))}

      {/* Display the incomplete table */}
      {rowsOnIncompletePage > 0 && (
        <div style={{ pageBreakBefore: 'always', width: "100%" }}>
          <MaterialTable
          options = {{
            toolbar: false,
          }}
          style={{ width: '100%', marginTop: "30px" }}
            columns={columns}
            data={data.slice(completePages * itemsPerPage)}
            title={`Incomplete Table`}
            options={{
              paging: false, // Disable material-table's built-in pagination
              toolbar: false, // Hide toolbar (including header)
              showTitle: false, 
              sorting: false, // Disable sorting
              cellStyle: { borderBottom: 'none' }, // Remove cell borders
              rowStyle: { borderBottom: 'none' }, // Remove row borders
              showTextRowsSelected: false,// Disable material-table's built-in pagination
            }}
          />
        </div>
      )}
            {/* <PrintTable columns = {columns} data = {data}  /> */}
            <div className="print-footer">
          <Typography>Deentire by Tacabtire</Typography>
        </div>

        <div className="page-break"></div>
         
        </div>
        

     
      </MyModal>
    )
}

export default PrintReport