import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import io from 'socket.io-client';
import Register from "../utils/Register";
import AmaanoTransactions from "../containers/Books/Amaano/AmaanoTransactions"
import { addAmaano, deleteAmaano, setAmaano, setAmaanoFetched, updateAmaano } from "../redux/actions/amaanoActions";

const Amaano = (props) => {
  const amaano = useSelector((state) => state.amaano.amaano);
  const dispatch = useDispatch();
  const [newAmaano, setNewAmaano] = useState(false);
  const [buttonName, setButtonName] = useState("Add New Amaano");
  const [update, setUpdate] = useState(false);
  const [updatedAmaano, setUpdatedAmaano] = useState(null);
  const [del, setDel] = useState(1);
  const [amaanoInfo, setAmaanoInfo] = useState();
  const [state, setState] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [instance, setInstance] = useState();
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const token = useSelector((state) => state.token.token);
  const isDataFetched = useSelector((state) => state.amaano.isDataFetched);

  useEffect(() => {
    if (!isDataFetched && token) {
      const fetchData = async () => {
        const response = await axios
          .get(
            `${constants.baseUrl}/depositors/user-depositors-with-transactions/${activeUser?._id}`,
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then((res) => {
            dispatch(setAmaano(res?.data?.data?.depositors));
            dispatch(setAmaanoFetched(true));
          })
          .catch((err) => {
            alert(err.response?.data?.message);
          });
      };
      fetchData();
    }
  }, [isDataFetched, token]);

  const calculateBalanceForAmaano = (am) => {
    let balance = 0;

    am?.transactions?.forEach((transaction) => {
      if (transaction.debit) {
        balance += transaction.debit; // Add debit amount
      } else if (transaction.credit) {
        balance -= transaction.credit; // Subtract credit amount
      }
    });

    return balance;
  };

//   Calculate and update the balance for each customer
  amaano?.forEach((am) => {
    const balance = calculateBalanceForAmaano(am);
    am.balance = balance; // Add a 'balance' property to each customer object
  });

//   Log the updated customers array with balances
  console.log(amaano);

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

  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1);

  const addAmaanoHandler = () => {
    setQuery("");
    if (buttonName == "Add New Amaano") {
      setNewAmaano(true);
      setButtonName("Go To Amaano");
      return;
    } else if (buttonName == "Go To Amaano") {
      setShowTransactions(false);
      setNewAmaano(false);
      setButtonName("Add New Amaano");
      setUpdate(false);
    }
  };

  const handler = (data) => {
    if (data?.length > 0) {

      if (query == "") {
        return data
          .filter((std) => {
            if (std.status == "closed") return
            else return std.balance >= 0 || std.balance <= 0;
          })
          .sort((a, b) => b.balance - a.balance);
      } else {
        return data?.filter(
          (std) =>
            (std.balance <= 0) &&
            (std.name.toLowerCase().includes(query?.toLocaleLowerCase()) ||
              std.phone.toLowerCase().includes(query?.toLocaleLowerCase()))
        );
      }
    } else {
      return;
    }
  };

  const updateHandler = (am) => {
    setNewAmaano(true);
    setButtonName("Go To Amaano");
    setUpdate(true);
    setUpdatedAmaano(am);
  };

  useEffect(() => {
    setState("Loading...");
  }, [force]);

  useEffect(() => {}, [del]);

  useEffect(() => {
    setDel((state) => state + 1);
  }, [amaano]);

  useEffect(() => {
    if (query != "") {
      setState("No matching amaano!");
    }
  }, [query]);

  const hideModal = () => {};

  const addCus = (am) => {
    dispatch(addAmaano(am));
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
  dispatch(updateAmaano(newObj));
  setDel((state) => state + 1);
  setInstance(newObj);
}, [stateTransactions])

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "#EFF0F6",
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
            {newAmaano
              ? "Create New Amaano"
              : "Amaano"}
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
              addAmaanoHandler();
            }}
            startIcon={
              newAmaano || showTransactions ? (
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
      { !showTransactions && (
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
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "none",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          
        </div>
      )}

      {showTransactions && (
        <AmaanoTransactions
          instance={instance}
          name="Amaano"
          newData={(data) => {
            dispatch(updateAmaano(data));
            setDel((state) => state + 1);
            setInstance(data);
          }}
          hideModal={() => {
            setShowTransactions(false);
            setNewAmaano(false);
            setButtonName("Add New Amaano");
          }}
        />
      )}

    {!showTransactions && (
        <Table
          data={handler(amaano)}
          showTransactions={(instance) => {
            console.log(instance);
            setShowTransactions(true);
            setInstance(instance);
            setButtonName("Go To Amaano");
          }}
          pay={(instance) => {
            setInstance(instance);
          }}
          change={(data)=> {
            dispatch(deleteAmaano(data))
            changeHandler()
          }}
          update={updateHandler}
          state={state}
          columns={columns}
          url="depositors"
          name="Amaano"
        />
      )}

      {newAmaano && (
        <Register
          update={update}
          instance={updatedAmaano}
          hideModal={(data) => {
            setUpdate(false);
            setNewAmaano(false);
            // changeHandler();
            setButtonName("Add New Amaano");
          }}
          fields={fields}
          url="depositors"
          name="Amaano"
          change={(data) => {
            console.log(data);
            dispatch(updateAmaano(data?.depositor));
            setDel((state) => state + 1);
          }}
          addCus={(amaano) => addCus(amaano)}
        />
      )}
    </div>
  );
};

export default Amaano;
