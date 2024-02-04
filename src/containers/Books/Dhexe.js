// import React, { useState, useEffect, useReducer } from "react";
// import { Button, } from "@material-ui/core";
// import { MdAdd } from "react-icons/md";
// import { BiArrowBack } from "react-icons/bi";
// import { FormControl, MenuItem, Menu } from "@material-ui/core";
// import { Select, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { BiDotsVerticalRounded } from "react-icons/bi";
// import io from 'socket.io-client';
// import { constants } from "../../Helpers/constantsFile";
// import { addCustomer, deleteCustomer, setCustomers, setCustomersFetched, updateCustomer } from "../../redux/actions/customersActions";
// import Transactions from "../CustomerContainers/Transactions.";
// import { Payment } from "@material-ui/icons";
// import Register from "../../utils/Register";
// import Table from "../../utils/Table";


// const Dhexe = (props) => {
//   const customers = useSelector((state) => state.customers.customers);
//   const dispatch = useDispatch();
//   const [newCustomers, setNewCustomers] = useState(false);
//   const [buttonName, setButtonName] = useState("Add New Customers");
//   const [update, setUpdate] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const statusArr = ["All", "Deen", "Clear"];
//   const [status, setStatus] = useState(statusArr[0]);
//   const [updatedCustomer, setUpdatedCustomer] = useState(null);
//   const [del, setDel] = useState(1);
//   const [showOrders, setShowOrders] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState();
//   const [state, setState] = useState("");
//   const [showTransactions, setShowTransactions] = useState(false);
//   const [instance, setInstance] = useState();
//   const activeUser = useSelector((state) => state.activeUser.activeUser);
//   // const token = useSelector((state) => state.token.token);
//   // const isDataFetched = useSelector((state) => state.customers.isDataFetched);
//   const [isLogin, setIsLogin] = useState(false);

//   // useEffect(() => {
//   //   if (!isDataFetched && token) {
//   //     const fetchData = async () => {
//   //       const response = await axios
//   //         .get(
//   //           `${constants.baseUrl}/customers/user-customers-with-transactions/${activeUser?._id}`,
//   //           {
//   //             headers: {
//   //               authorization: token,
//   //             },
//   //           }
//   //         )
//   //         .then((res) => {
//   //           dispatch(setCustomers(res?.data?.data?.customers));
//   //           dispatch(setCustomersFetched(true));
//   //         })
//   //         .catch((err) => {
//   //           alert(err.response?.data?.message);
//   //         });
//   //     };
//   //     fetchData();
//   //   }
//   // }, [isDataFetched, token]);

//   // const calculateBalanceForCustomer = (customer) => {
//   //   let balance = 0;

//   //   customer?.transactions?.forEach((transaction) => {
//   //     if (transaction.debit) {
//   //       balance += transaction.debit; // Add debit amount
//   //     } else if (transaction.credit) {
//   //       balance -= transaction.credit; // Subtract credit amount
//   //     }
//   //   });

//   //   return balance;
//   // };

//   // Calculate and update the balance for each customer
//   // customers?.forEach((customer) => {
//   //   const balance = calculateBalanceForCustomer(customer);
//   //   customer.balance = balance; // Add a 'balance' property to each customer object
//   // });

//   // Log the updated customers array with balances
//   console.log(customers);

//   const columns = [
//     // { title: "ID", field: "customerId" },
//     { title: "Full Name", field: "name", width: "24%" },
//     { title: "Phone Number", field: "phone" },
//     { title: "Address", field: "district" },
//     {
//       title: "Balance",
//       field: "balance",
//       editable: "never",
//       render: (data) => <p> {data?.balance.toFixed(2)}</p>,
//     },
//   ];
//   const fields = [
//     { label: "Enter Name", type: "text", name: "name" },
//     { label: "Enter Phone", type: "text", name: "phone" },
//     { label: "Enter Address", type: "text", name: "district" },
//   ];

//   const changeHandler = () => {
//     setDel((state) => state + 1);
//   };

//   const handleClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     customer
//   ) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const statusHandler = (e) => {
//     setStatus(e.target.value);
//   };

//   const [query, setQuery] = useState("");
//   const [force, setForce] = useState(1);

//   const addCustomerHandler = () => {
//     setQuery("");
//     if (buttonName == "Add New Customers") {
//       setNewCustomers(true);
//       setButtonName("Go To Customers");
//       setShowOrders(false);
//       return;
//     } else if (buttonName == "Go To Customers") {
//       setShowOrders(false);
//       setShowTransactions(false);
//       setNewCustomers(false);
//       setButtonName("Add New Customers");
//       setUpdate(false);
//     }
//   };

//   const handler = (data) => {
//     if (data?.length > 0) {

//       if (query == "") {
//         return data
//           .filter((std) => {
//             if (std.status == "closed") return
//             if (status == "Deen") return std.balance > 0;
//             else if (status == "Clear") return std.balance == 0;
//             else return std.balance >= 0 || std.balance <= 0;
//           })
//           .sort((a, b) => b.balance - a.balance);
//       } else {
//         return data?.filter(
//           (std) =>
//             (status == "Deen"
//               ? std.balance > 0
//               : status == "Clear"
//               ? std.balance == 0
//               : std.balance >= 0 || std.balance <= 0) &&
//             (std.name.toLowerCase().includes(query) ||
//               std.phone.toLowerCase().includes(query))
//         );
//       }
//     } else {
//       return;
//     }
//   };

//   const updateHandler = (customer) => {
//     setNewCustomers(true);
//     setButtonName("Go To Customers");
//     setUpdate(true);
//     setUpdatedCustomer(customer);
//   };

//   const resetFomr = () => {
//     // setForce((state) => state + 1);
//   };

//   useEffect(() => {
//     // setState("Loading...");
//   }, [force]);


//   useEffect(() => {}, [del]);

//   // useEffect(() => {
//   //   if (!isDataFetched) {
//   //     setState("Loading...");
//   //   } else if (true) {
//   //     customers?.map(c => {
//   //       if (c.type != "dhexe")
//   //       setState("No customers found!");
//   //     })
//   //   }
//   // }, [customers, isDataFetched]);

//   useEffect(() => {
//     if (query != "" || status != "All") {
//       setState("No matching customers!");
//     }
//   }, [query, status]);

//   const showOrdersHandler = (customer) => {
//     setShowOrders(true);
//     setButtonName("Go To Customers");
//     setCustomerInfo(customer);
//   };

//   const hideModal = () => {};

//   const addCus = (customer) => {
//     dispatch(addCustomer(customer));
//     setDel((state) => state + 1);
//   };

//   const [stateTransactions, setStateTransactions] = useState(instance?.transactions)
  
//   const stateTransactionHandler = (data) => {
//     let newArray = instance?.transactions.filter(item => item._id !== data?._id);
//     let newArray2 = [...newArray, data];
//     setStateTransactions(newArray2); 
// }

// const newObj = { ...instance, transactions: stateTransactions };

// useEffect(()=> {
//   dispatch(updateCustomer(newObj));
//   setDel((state) => state + 1);
//   setInstance(newObj);
// }, [stateTransactions])

//   return (
//     <div
//       style={{
//         height: "100%",
//         width: "100%",
//         margin: "0px auto",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#F0F2FA",
//       }}
//     >
//       {!showTransactions && (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "95%",
//             margin: "auto",
//           }}
//         >
//           <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
//             {" "}
//             {newCustomers
//               ? "Create New Customers"
//               : showOrders
//               ? "Customer Details"
//               : showTransactions
//               ? "Customer Transactions"
//               : "Dhexe Customers"}
//           </Typography>
//           <Button    variant="contained"
//           style={{
//             backgroundColor: "#5130DE",
//             color: "black",
//             height: "45px",
//             background: "white",
//             borderRadius: "5px",
//             width: "160px",
//             fontSize: "16px",
//             fontWeight: "bold",
//             border: "1px solid black"
//           }}
//           startIcon={
//               <BiArrowBack
//                 style={{
//                   color: "black",
//                 }}
//               />
//           }
//           onClick = {()=> {
//             props.goBack()
//             }}>go back</Button>
          
//         </div>
//       )}
//       {!showOrders && !showTransactions && (
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: "20px",
//             padding: "20px",
//             background: "white",
//             width: "95.3%",
//             margin: "auto",
//             marginTop: "20px",
//             borderRadius: "8px 8px 0px 0px",
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Search"
//             style={{
//               width: "400px",
//               height: "40px",
//               padding: "10px",
//               fontSize: "16px",
//               borderRadius: "8px",
//               background: "#EFF0F6",
//               border: "none",
//             }}
//             onChange={(e) => setQuery(e.target.value)}
//           />

// <Button
//             variant="contained"
//             style={{
//               backgroundColor: "#03656F",
//               color: "white",
//               height: "45px",
//               fontWeight: "bold",
//             }}
//             onClick={() => {
//               addCustomerHandler();
//             }}
//             startIcon={
//               newCustomers || showOrders || showTransactions ? (
//                 <BiArrowBack
//                   style={{
//                     color: "white",
//                   }}
//                 />
//               ) : (
//                 <MdAdd
//                   style={{
//                     color: "white",
//                   }}
//                 />
//               )
//             }
//           >
//             {buttonName}
//           </Button>
//         </div>
//       )}

//       {showTransactions && (
//         <Transactions
//           instance={instance}
//           name="Customer"
//           newData={(data) => {
//             dispatch(updateCustomer(data));
//             setDel((state) => state + 1);
//             setInstance(data);
//           }}
//           hideModal={() => {
//             setShowTransactions(false);
//             setNewCustomers(false);
//             setButtonName("Add New Customers");
//           }}
//         />
//       )}

//       {showPayment && (
//         <Payment
//           name={"Customer"}
//           instance={instance}
//           type={"bixin"}
//           hideModal={() => {
//             setShowPayment(false);
//           }}
//           stateTran = {(data) => stateTransactionHandler(data)}
//         />
//       )}

//       {!showTransactions && (
//         <Table
//           data={handler(customers)}
//           showTransactions={(instance) => {
//             console.log(instance);
//             setShowTransactions(true);
//             setInstance(instance);
//             setButtonName("Go To Customers");
//           }}
//           pay={(instance) => {
//             setShowPayment(true);
//             setInstance(instance);
//           }}
//           change={(data)=> {
//             dispatch(deleteCustomer(data))
//             changeHandler()
//           }}
//           update={updateHandler}
//           showOrders={(customer) => showOrdersHandler(customer)}
//           state={state}
//           columns={columns}
//           url="customers"
//           name="Customer"
//         />
//       )}

//       {newCustomers && (
//         <Register
//           update={update}
//           special = "Dhexe"
//           instance={updatedCustomer}
//           reset={resetFomr}
//           hideModal={(data) => {
//             setUpdate(false);
//             setNewCustomers(false);
//             // changeHandler();
//             setButtonName("Add New Customers");
//           }}
//           fields={fields}
//           url="customers"
//           name="Customer"
//           change={(data) => {
//             console.log(data);
//             dispatch(updateCustomer(data?.customer));
//             setDel((state) => state + 1);
//           }}
//           addCus={(customer) => addCus(customer)}
//         />
//       )}
//     </div>
//   );
// };

// export default Dhexe;

const Dhexe = (props) => {

return (
  <div onClick={()=> props.goBack()}>
    Hello
  </div>
)

}

export default Dhexe