import { Button, Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";
import JsPDF from "jspdf";
import moment from "moment";
import ReactToPrint from "react-to-print";
import React, { useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
// import "./printDesign.css";
import useFetch from "../funcrions/DataFetchers";
import { setSales } from "../redux/actions/salesActions";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../Helpers/constantsFile";
import { setPurchases } from "../redux/actions/purchasesActions";

const Reports = (props) => {
  const componentRef = useRef();
  let totalSales = 0;
  const dispatch = useDispatch();
  console.log(props.purchases)

  return (
    <>
      <div
        id="saleReport"
        style={{
          alignSelf: "center",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: props.kind == "Report" ?  "100%": "85%",
          marginBottom: "30px",
          background: "white",
          borderRadius: '8px',
          padding: "30px 65px",
          gap: "10px",
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

        <h2> {props.name} Report</h2>
        <div
          style={{
            display: "flex",
            gap: "1.5%",
            marginBottom: "20px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <p style={{ margin: "0px" }}>
            {" "}
            {moment(props.startDate).format("MM/DD/YYYY")}
          </p>

          <Divider
            orientation="vertical"
            style={{
              width: "1.5px",
            }}
          />

          <p style={{ margin: "0px" }}>
            {" "}
            {moment(props.endDate).format("MM/DD/YYYY")}
          </p>
        </div>

        {
        // props.name == "Sales" ? props.sales?.map((sale) => {
        //   // if (sale.paymentType != props.type && props.type != "all") return;
        //     totalSales += sale.total;
        //     return (
        //       <>
        //         <div className="page-break"> </div>
        //         <Comp sale={sale} />
        //       </>
        //     );
        // }) : 
        props.purchases?.map((sale) => {
            // if (sale.paymentType != props.type && props.type != "all") return;
            // else {
              totalSales += sale.total;
              return (
                <>
                  <div className="page-break"> </div>
                  <Comp sale={sale} name = {props.name}/>
                </>
              );
            // }
          })}
        <Divider orientation="horizantal" color="white" />
        {!props.purchases && <p> Loading...</p>}
        <div
          style={{
            margin: "0px auto",
            background: "white",
            borderRadius: "0px 0px 10px 10px",
            display: "flex",
            fontSize: "15px",
            justifyContent: "flex-end",
            gap: "15px",
            padding: "2px 18px",
            width: "100%",
          }}
        >
          <p
            style={{
              margin: "0px",
              fontWeight: "700",
              padding: "5px 0px",
            }}
          >
            Total:
          </p>
          <p style={{ padding: "5px 0px" }}> {constants.moneySign}{totalSales?.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};

const Comp = (props) => {
  const columns = [
    {
      title: "Product Name",
      field: "item",
      width: "4%",
      cellStyle: { padding: "0px 30px", height: "0px" },
    },
    { title: "Quantity", field: "quantity" },
    { title: "Price", field: "price", render: (data) => <p>R{data.price}</p> },
    {
      title: "Subtotal",
      field: "subtotal",
      render: (data) => <p>{constants.moneySign}{data.subtotal?.toFixed(2)}</p>,
    },
  ];

  const [name, setName] = useState(props.name)

  

  return (
    <div class="saleComponent" style={{ width: "100%", marginTop: "0px" }}>
      <div
        style={{
          background: "#F0F2FA",
          opacity: 0.8,
          height: "25px",
          // padding: "5px 5px",
          border: "0.1px solid grey",
          display: "flex",
          borderRadius: "5px",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography> RefNumber: {props.sale.refNumber}</Typography>
        <Typography> {props.sale?.date?.slice(0, 10)}</Typography>
        <Typography> Type: {props.sale.paymentType}</Typography>
        <Typography> Discount: ${props.sale.discount}</Typography>
        <Typography> Total: {constants.moneySign}{props.sale.total?.toFixed(2)}</Typography>
      </div>
      <MaterialTable
        columns={columns}
        data={props.name == "Services" ? props.sale.serviceItems : props.sale.products}
        options={{
          rowStyle: { height: "2px" },
          showTitle: false,
          exportButton: true,
          sorting: false,
          paging: false,
          hideHeader: true,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: 8,
          draggable: false,
          rowStyle: {
            height: "30px",
            padding: "0px",
          },
          actionsColumnIndex: -1,
          headerStyle: { display: "none" },
        }}
        components={{
          Row: (props) => {
            return (
              <div
                style={{
                  display: "flex",
                  // width: "100%",
                  // justifyContent: "space-around",
                  margin: "1px 20px",
                  borderBottom: "0.5px solid grey",
                  padding: "2px 0px",
                  fontSize: 13,
                }}
              >
                <p style={{ margin: "0px", width: "50%" }}>
                  {" "}
                  {name == "Services" ? props.data.name : props.data.item}
                </p>
                <p style={{ margin: "0px", width: "20%" }}>
                  {" "}
                  {props.data.quantity}
                </p>
                <p style={{ margin: "0px", width: "20%" }}>
                  {" "}
                  {constants.moneySign}{props.data.unitPrice}
                </p>
                <p style={{ margin: "0px", width: "20%", textAlign: "end" }}>
                  {" "}
                  {constants.moneySign}{props.data.subtotal?.toFixed(2)}
                </p>
              </div>
            );
          },
        }}
        style={{ boxShadow: "none", background: "white", width: "65%" }}
      />
      <div
        style={{
          margin: "0px auto",
          background: "white",
          borderRadius: "0px 0px 10px 10px",
          display: "flex",
          fontSize: "13px",
          justifyContent: "flex-end",
          gap: "15px",
          padding: "2px 18px",
          width: "30%",
        }}
      >
        <p
          style={{
            margin: "0px",
            fontWeight: "700",
            padding: "5px 0px",
          }}
        >
          Total:
        </p>
        <p style={{ padding: "5px 0px" }}> {constants.moneySign}{props.sale.total?.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Reports;
