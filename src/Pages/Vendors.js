import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setEmployees } from "../redux/actions/employeesActions";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import Register from "../utils/Register";
import io from 'socket.io-client';
import {
  addVendor,
  deleteVendor,
  deleteVendorTransaction,
  setVendor,
  setVendors,
  setVendorsFetched,
  updateVendor,
  updateVendorProperty,
  updateVendorTransaction,
  updateVendorTransactions,
} from "../redux/actions/vendorsActions";
import Transactions from "../containers/VendorContainers/Transactions.";
import Payment from "../containers/VendorContainers/Payment";
import TransactionForm from "../containers/VendorContainers/TransactionForm";

const Vendors = () => {
  const vendors = useSelector((state) => state.vendors.vendors);
  const mySocketId = useSelector(state => state.socketId.socketId)
  const dispatch = useDispatch();
  const [newVendors, setNewVendors] = useState(false);
  const [buttonName, setButtonName] = useState("Add New Vendors");
  const [update, setUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const statusArr = ["All", "Deen", "Clear"];
  const [status, setStatus] = useState(statusArr[0]);
  const [updatedVendor, setUpdatedVendor] = useState(null);
  const [del, setDel] = useState(1);
  const [showOrders, setShowOrders] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [vendorInfo, setVendorInfo] = useState();
  const [state, setState] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [instance, setInstance] = useState();
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const token = useSelector((state) => state.token.token);
  const isDataFetched = useSelector((state) => state.vendors.isDataFetched);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!isDataFetched && token) {
      const fetchData = async () => {
        const response = await axios
          .get(
            `${constants.baseUrl}/vendors/user-vendors-with-transactions/${activeUser?._id}`,
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then((res) => {
            dispatch(setVendors(res?.data?.data?.vendors));
            dispatch(setVendorsFetched(true));
          })
          .catch((err) => {
            alert(err.response?.data?.message);
          });
      };
      fetchData();
    }
  }, [isDataFetched, token]);

  const calculateBalanceForCustomer = (vendor) => {
    let balance = 0;

    vendor?.transactions?.forEach((transaction) => {
      if (transaction.debit) {
        balance += transaction.debit; // Add debit amount
      } else if (transaction.credit) {
        balance -= transaction.credit; // Subtract credit amount
      }
    });

    return balance;
  };

  // Calculate and update the balance for each customer
  vendors?.forEach((vendor) => {
    const balance = calculateBalanceForCustomer(vendor);
    vendor.balance = balance; // Add a 'balance' property to each customer object
  });

  // Log the updated customers array with balances
  console.log(vendors);

  const columns = [
    // { title: "ID", field: "customerId" },
    { title: "Full Name", field: "name", width: "24%" },
    { title: "Phone Number", field: "phone" },
    { title: "Address", field: "district" },
    {
      title: "Balance",
      field: "balance",
      editable: "never",
      render: (data) => <p> {data?.balance.toFixed(2)}</p>,
    },
  ];
  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Phone", type: "number", name: "phone" },
    { label: "Enter Address", type: "text", name: "district" },
  ];

  const changeHandler = () => {
    setDel((state) => state + 1);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    customer
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1);

  const addVendorHandler = () => {
    setQuery("");
    if (buttonName == "Add New Vendors") {
      setNewVendors(true);
      setButtonName("Go To Vendors");
      setShowOrders(false);
      return;
    } else if (buttonName == "Go To Vendors") {
      setShowOrders(false);
      setShowTransactions(false);
      setNewVendors(false);
      setButtonName("Add New Vendora");
      setUpdate(false);
    }
  };

  const handler = (data) => {
    if (data?.length > 0) {
      if (query == "") {
        return data
          .filter((std) => {
            if (status == "Deen") return std.balance > 0;
            else if (status == "Clear") return std.balance == 0;
            else return std.balance >= 0 || std.balance <= 0;
          })
          .sort((a, b) => b.balance - a.balance);
      } else {
        return data?.filter(
          (std) =>
            (status == "Deen"
              ? std.balance > 0
              : status == "Clear"
              ? std.balance == 0
              : std.balance >= 0 || std.balance <= 0) &&
            (std.name.toLowerCase().includes(query) ||
              std.phone.toLowerCase().includes(query))
        );
      }
    } else {
      return;
    }
  };

  const updateHandler = (vendor) => {
    setNewVendors(true);
    setButtonName("Go To Vendors");
    setUpdate(true);
    setUpdatedVendor(vendor);
  };

  const resetFomr = () => {
    // setForce((state) => state + 1);
  };

  useEffect(() => {
    setState("Loading...");
  }, [force]);

  useEffect(() => {}, [del]);

  useEffect(() => {
    setDel((state) => state + 1);
  }, [vendors]);

  useEffect(() => {
    if (query != "" || status != "All") {
      setState("No matching vedors!");
    }
  }, [query, status]);

  const showOrdersHandler = (vendor) => {
    setShowOrders(true);
    setButtonName("Go To Vendors");
    setVendorInfo(vendor);
  };

  const hideModal = () => {};

  const addCus = (vendor) => {
    dispatch(addVendor(vendor));
    setDel((state) => state + 1);
  };

  const [stateTransactions, setStateTransactions] = useState(instance?.transactions)

  const stateTransactionHandler = (data) => {
    let newArray = instance?.transactions.filter(item => item._id !== data?._id);
    let newArray2 = [...newArray, data];
    setStateTransactions(newArray2); 
}

const newObj = { ...instance, transactions: stateTransactions };

useEffect(()=> {
  dispatch(updateVendor(newObj));
  setDel((state) => state + 1);
  setInstance(newObj);
}, [stateTransactions])

useEffect(() => {
  const socket = io.connect('https://deentire-api-rj2w.onrender.com');
  socket.on('vendorEvent', (data) => {
    handleVendorEvent(data)
  });
  socket.on('transactionEvent', (data) => {
    handleTransactionEvent(data)
  });

  return () => {
    socket.disconnect();
  };
}, []);


const handleVendorEvent = (data) => {
  
  const { socketId, userId, vendor, eventType } = data;
  
  console.warn(mySocketId, socketId)
  if (mySocketId == socketId) return
  if (activeUser?._id !== userId) return
  if (eventType === 'add') {
    addCus(vendor)
  } else if (eventType === 'delete') {
    dispatch(deleteVendor(vendor))
  } else if (eventType === 'update') {
    dispatch(updateVendor(vendor));
  }

  };
const handleTransactionEvent = (data) => {
  
  const { socketId, userId, vendor, transaction, eventType } = data;

  if (mySocketId == socketId) return
  if (activeUser?._id !== userId) return
  if (eventType === 'add') {
    dispatch(updateVendorTransactions(vendor?._id, transaction));
  } else if (eventType === 'delete') {
    dispatch(deleteVendorTransaction(vendor?._id, transaction?._id))
  } else if (eventType === 'update') {
    dispatch(updateVendorTransaction(vendor?._id, transaction));
  }

  };



  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EFF0F6",
      }}
    >
      {!showTransactions && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            margin: "auto",
          }}
        >
          <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
            {" "}
            {newVendors
              ? "Create New Vendors"
              : showOrders
              ? "Vendor Details"
              : showTransactions
              ? "Vendor Transactions"
              : "Vendors"}
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#03656F",
              color: "white",
              height: "45px",
              fontWeight: "bold",
            }}
            onClick={() => {
              addVendorHandler();
            }}
            startIcon={
              newVendors || showOrders || showTransactions ? (
                <BiArrowBack
                  style={{
                    color: "white",
                  }}
                />
              ) : (
                <MdAdd
                  style={{
                    color: "white",
                  }}
                />
              )
            }
          >
            {buttonName}
          </Button>
        </div>
      )}
      {!showOrders && !showTransactions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "20px",
            background: "white",
            width: "95.3%",
            margin: "auto",
            marginTop: "20px",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              width: "400px",
              height: "40px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "none",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <FormControl style={{ padding: "0px", margin: "0px" }}>
            <Select
              style={{ height: "40px", color: "#B9B9B9", width: "172px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={statusHandler}
            >
              {statusArr.map((status, index) => (
                <MenuItem value={status} key={index}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </div>
      )}

      {showTransactions && (
        <Transactions
          instance={instance}
          name="Vendor"
          newData={(data) => {
            dispatch(updateVendor(data));
            setDel((state) => state + 1);
            setInstance(data);
          }}
          hideModal={() => {
            setShowTransactions(false);
            setNewVendors(false);
            setButtonName("Add New Vendors");
          }}
        />
      )}

    {showPayment && (
        <Payment
          name={"Customer"}
          instance={instance}
          type={"bixin"}
          hideModal={() => {
            setShowPayment(false);
          }}
          stateTran = {(data) => stateTransactionHandler(data)}
        />
      )}

      {!showTransactions && (
        <Table
          data={handler(vendors)}
          showTransactions={(instance) => {
            console.log(instance);
            setShowTransactions(true);
            setInstance(instance);
            setButtonName("Go To VendorS");
          }}
          pay={(instance) => {
            setShowPayment(true);
            setInstance(instance);
          }}
          change={(data)=> {
            dispatch(deleteVendor(data))
            changeHandler()
          }}
          update={updateHandler}
          showOrders={(customer) => showOrdersHandler(customer)}
          state={state}
          columns={columns}
          url="vendors"
          name="Vendor"
        />
      )}

      {newVendors && (
        <Register
          update={update}
          instance={updatedVendor}
          reset={resetFomr}
          hideModal={(data) => {
            setUpdate(false);
            setNewVendors(false);
            // changeHandler();
            setButtonName("Add New Vendors");
          }}
          fields={fields}
          url="vendors"
          name="Vendor"
          change={(data) => {
            console.log(data);
            dispatch(updateVendor(data?.vendor));
            setDel((state) => state + 1);
          }}
          addCus={(customer) => addCus(customer)}
        />
      )}
    </div>
  );
};

export default Vendors;
