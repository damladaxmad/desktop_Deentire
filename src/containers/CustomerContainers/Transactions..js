import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import { Divider, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AiFillPrinter } from "react-icons/ai";
import { BsShareFill } from "react-icons/bs";
import { Button } from "@mui/material";
import { constants } from "../../Helpers/constantsFile";
import "../../utils/print.css";
import Details from "./Details";
import TransactionForm from "./TransactionForm";
import { updateCustomerProperty, updateCustomerTransaction } from "../../redux/actions/customersActions";
import { useEffect } from "react";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './ScrollArrow.css';
import { MdArrowDownward } from "react-icons/md";
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import Invoice from "./Invoice";
import { MdImage } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import ImageUrl from "../ImageUrl";
import io from 'socket.io-client';

// Function to generate the PDF invoice
const generateInvoicePDF = (invoiceData) => {
  // Use invoiceData to populate the PDF template
  // Create a React PDF document
  return (
    <Document>
      <Page>
        {/* Your PDF invoice content */}
        <View>
          <Text>Invoice Details:</Text>
          {/* Render invoice details using Text components */}
        </View>
      </Page>
    </Document>
  );
};


const Transactions = (props) => {
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);
  const [show, setShow] = useState(false);
  // const [data, setData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const componentRef = useRef();
  const [detailData, setDetailData] = useState();
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [type, setType] = useState("")
  // const transactions = useSelector((state) => state.customers.customers.find((customer) => customer._id === props.instance_id)?.transactions || []);
  const customers = useSelector((state) => state.customers.customers);
  const [stateCustomer, setStateCustomer] = useState(props.instance)
  const [stateTransactions, setStateTransactions] = useState(props.instance?.transactions || [])
  const [data, setData] = useState(props.instance?.transactions || [])
  const [editedDate, setEditedDate] = useState(null);
  const [update, setUpdate] = useState(false)
  const [tran, setTran] = useState()
  const [rerender, setRerender] = useState(1)
  const [showArrow, setShowArrow] = useState(true);
  const [showImageUrl, setShowImageUrl] = useState(false);
  const [image, setImage] = useState();
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const mySocketId = useSelector(state => state.socketId.socketId)

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const hideArrow = () => {
    setShowArrow(false);
  };

  const showArrowOnTouch = () => {
    setShowArrow(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 20; // Adjust threshold as needed

      // If the user is near the bottom, hide the arrow
      setShowArrow(!isScrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stateTransactionHandler = (d) => {
    const currentDate = new Date();
    d.date = currentDate;
    setStateTransactions((prevTransactions = []) => {
      const filteredTransactions = prevTransactions.filter(item => item._id !== d?._id);
      const updatedTransactions = [...filteredTransactions, d];
      return updatedTransactions
    });
  }

  const deletedTransaction = (transactionIdToRemove) => {
    setStateTransactions((prevTransactions) => {
      return prevTransactions.filter(
        (transaction) => transaction._id !== transactionIdToRemove
      );
    });
  };

  const updateTransaction = (updatedTransaction) => {
    setStateTransactions((prevTransactions) => {
      return prevTransactions.map((transaction) => {
        if (transaction._id === updatedTransaction._id) {
          // Update the transaction with the new data
          return { ...transaction, ...updatedTransaction };
        }
        return transaction;
      });
    });
  };


  const newObj = { ...stateCustomer, transactions: stateTransactions };
  const dispatch = useDispatch()

  useEffect(()=> {
    props.newData(newObj)
    setData(newObj?.transactions)
  }, [stateTransactions])

  console.log(stateTransactions, newObj)
  console.log(props.instance)

  const detailHandler = (data) => {
    setDetailData(data);
    setShowDetails(true);
  };

  let balances = []
  let prevBalance = 0
  let newStuff = ""

  props.instance?.transactions?.map((t, index) => {
    balances.push((t.debit - t.credit) + prevBalance)
    prevBalance = balances[index]
  })

  console.log(balances)

  // console.log(balances)
  let myIndex = 0

  const materialOptions = {
    showTitle: false,
    exportButton: true,
    sorting: true,
    showTextRowsSelected: false,
    toolbar: false,
    paging: false,
    pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
    pageSize: 4,
    draggable: false,
    actionsColumnIndex: -1,
    rowStyle: (rowData) => {
      return {
        backgroundColor: rowData?.debit == 0 && "#CDEBEE",
        borderBottom: "1px solid #A6A6A6"
      };
    },
    headerStyle: {
      background: "white",
      fontSize: "15px",
      borderRadius: "10px 10px 0px 0px",
      fontWeight: "bold",
      border: "1p solid #ABABAB"
    },
  };

  const columns = [

    {
      title: "Description",
      field: "description", width: "25%",
      cellStyle: { border: "none" },
    },
  
    {
      title: "Date",
      field: "date",
      type: 'date',
      render: (data) => {
        const formatted = moment(data.date).format("DD/MM/YYYY");
        return <p>{formatted}</p>;
      },
      cellStyle: { border: "none" },
    },
    // { title: "User", field: "user", cellStyle: { border: "none" }, width: "20%" },
    { title: "Debit", field: "debit", 
    editable: rowData => rowData.debit == 0 && "never" ,
    cellStyle: { border: "none" } },
    { title: "Credit", field: "credit", 
    editable: rowData => rowData.credit == 0 && "never",
    cellStyle: { border: "none" } },
    {
      title: "Balance",
      field: "balance",
      render: (data) => {
        return (
          <p style={{ alignSelf: "end" }}>
             {constants?.moneySign}{balances[data.tableData.id]?.toFixed(2)} 
          </p>
        );
      },
      cellStyle: { border: "none" },
    },

   
  ];

  const hideModal = () => {
    setShow(false);
  };

  useEffect(() => {
    const socket = io.connect('https://deentire-api-rj2w.onrender.com');
  
    socket.on('transactionEvent', (data) => {
      handleTransactionEvent(data)
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);
  
  const handleTransactionEvent = (data) => {
    
    const { socketId, userId, customer, transaction, eventType } = data;
    // if (customer) alert("is a customer")
    // else alert("is not a customer")

    console.warn(mySocketId, socketId)
    if (mySocketId == socketId) return
    if (activeUser?.id !== userId) return
    if (eventType === 'add') {
      stateTransactionHandler(transaction)
    } else if (eventType === 'delete') {
      deletedTransaction(transaction?._id)
    } else if (eventType === 'update') {
      updateTransaction(transaction)
    }
  
    };
  

  return (
    <>

{showArrow  && <div className="scroll-arrow" onClick={scrollToBottom}
style = {{background: "black", boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',}}>
    
<MdArrowDownward style = {{color: "white", fontSize: "20px", }}/>
    </div>}

      {showTransactionForm && <TransactionForm  name={props.name}
      instance = {props.instance} type = {type}
      hideModal = {()=> {
        setUpdate(false)
        setShowTransactionForm(false)
      }}
      stateTran = {(data) => stateTransactionHandler(data)}
      onDelete = {(id)=> {
        console.log(id)
        deletedTransaction(id)}}
      update = {update} tran = {tran}/>}

      {showImageUrl && <ImageUrl ImageUrl = {image}
      hideModal = {()=> {
        setShowImageUrl(false)
      }}/>}

      <div style = {{display: "flex",
      width: "90%",
      margin: "10px auto",
      justifyContent: "space-between"}}>

          <div style = {{display: "flex", gap: "20px"}}>
            <Button    variant="contained"
          style={{
            backgroundColor: "#5130DE",
            color: "#036771",
            height: "50px",
            background: "white",
            borderRadius: "5px",
            width: "160px",
            fontSize: "16px",
            height: "50px",
            fontWeight: "bold",
            border: "1px solid #036771"
          }}
          onClick = {()=> {
            setType("bixin")
            setShowTransactionForm(true)
            
            }}>Bixin</Button>
            <Button    variant="contained"
          style={{
            backgroundColor: "#5130DE",
            color: "white",
            background: "#03656F",
            borderRadius: "5px",
            width: "160px",
            fontSize: "16px",
            height: "50px",
            fontWeight: "bold",
          }}
          onClick = {()=> {
            setType("deen")
            setShowTransactionForm(true)
            
            }}>Deen Cusub</Button>
          </div>

          <Button    variant="contained"
          style={{
            backgroundColor: "#5130DE",
            color: "black",
            height: "50px",
            background: "white",
            borderRadius: "5px",
            width: "160px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "1px solid black"
          }}
          startIcon={
              <BiArrowBack
                style={{
                  color: "black",
                }}
              />
          }
          onClick = {()=> {
            props.hideModal()
            }}>go back</Button>
      </div>


      <div style = {{display: "flex",
      width: "90%",
      alignItems: "flex-end",
      margin: "15px auto",
      justifyContent: "space-between"}}>

<div style = {{display: "flex", flexDirection: "column",
        }}>
            <Typography style = {{
          fontSize: "20px", fontWeight: "bold"}}>
              {stateCustomer?.name}
            </Typography>
            <Typography style = {{ color: "#7F7F7F",
          fontSize: "20px"}}>
              {stateCustomer?.phone}
            </Typography>
          </div>


          <div style = {{display: "flex", flexDirection: "column",
        alignItems: "end"}}>
            <Typography style = {{
          fontSize: "23px", fontWeight: "bold"}}>
             {constants?.moneySign}{balances.length > 0 ?  balances[balances.length - 1].toFixed(2) : "0"}
            </Typography>

            {/* <Typography style = {{color: "#777676",
          fontSize: "20px"}}>
              Balance
            </Typography> */}
          </div>
      
      </div>  

         <MaterialTable
          columns={columns}
          data={data}

          options={materialOptions}
          style={{
            borderRadius: "10px",
            boxShadow: "none",
            width: "90%",
            margin: "20px auto",
            border: "1px solid #A6A6A6",
            marginTop: "15px",
            background: "#F0F2FA",
          }}
          onRowClick={(e, rowData)=> {
            setUpdate(true)
            setTran(rowData)
            setShowTransactionForm(true)
            rowData?.debit > 0 ? setType("deen") : setType("bixin")
          }}
        />      


    </>
  );
};



const TableActions = (props) => {
  return (
    <div style = {{display: "flex", flexDirection: "column", gap: "5px",
    alignItems: "center"}}>
      <div style = {{width: "45px", height: "40px", 
      background: props.type == "share" ? "#036771": "white",
    borderRadius: "8px", display: "flex", alignItems: "center",
    border: props.type == "share" ? "none" : "1.5px solid black",
    justifyContent: "center", cursor: "pointer"}}>
        <BsShareFill style = {{color: props.type == "share" ? "white": "black", fontWeight: "bold",
      fontSize: "18px"}}/>
      </div>
      <Typography style = {{
        fontSize: "12px"
      }}>SHARE</Typography>
      </div>
  )
}

export default Transactions;
