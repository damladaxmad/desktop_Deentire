import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownwardIcon';
import { forwardRef } from 'react';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Typography, Button, MenuItem, Menu, Avatar } from "@material-ui/core";
import {TiArrowUnsorted} from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../../Helpers/constantsFile";
import {MdClose} from "react-icons/md"


const PrintTable = (props) => {
  const tableIcons = {
    // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    // SortArrow: forwardRef((props, ref) => <ArrowDownwardIcon{...props} ref={ref}/>)
    
  };

 
  const dispatch = useDispatch()

  const columns = props.columns;
  console.log(props.data)

  const handler = (data) => {
    console.log(data)
    if (data?.length > 0) {
        return data.filter((std) => {
          //  if (std.testItem?.type == "urine") return
           return (std)
    });

    } else {
      return;
    }
  };

    return (
    <div style={{ width: "100%", 
    margin: "auto" }}>

{props.invoice != "invoice" && <Typography style = {{fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px"}}>{props.data[0]?.testItem?.category}</Typography>}

      <div style = {{height: "40px", border: "1px solid black", width: "100%",
    borderRadius: "10px", display: "flex", flexDirection: "row", gap: '15px',
     padding: "8px 15px"}}>
        {props.columns?.map(column => {
          return <p style = {{width: column.width, fontWeight: 'bold'}}> {column.title}</p>
        })}
      </div>

      <MaterialTable
      className = "table-container"
      icons={tableIcons}
        columns={props.columns}
        data={handler(props.data)}
     
        options={{
          rowStyle: {border: "none"},
          showTitle: false,
          paging: false,
          exportButton: true,
          sorting: true,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 10,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "", border: "1px solid black", fontSize: "13px",
          fontWeight: "bold", display: "none"
      },
        }}
      
        style={{ borderRadius: "10px", boxShadow: "none", widht: "100%",
         border: props.page == "New Purchase" ? "1px solid black" : "none",}}
       
      />
    </div>
  );
};

export default PrintTable;
