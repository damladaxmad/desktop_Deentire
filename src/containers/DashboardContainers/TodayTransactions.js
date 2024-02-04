import { Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GrRefresh } from "react-icons/gr";

const titleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "grey",
};

const parentDivStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "100%",
};

export default function TodayTransactions() {
  const [transactions, setTransactions] = useState([]);
  const token = useSelector((state) => state.token.token);
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const [refresh, setRefresh] = useState(1);

  const today = new Date()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get(
          `https://deentire-api-rj2w.onrender.com/api/v1/transactions/user-transactions/${activeUser?._id}/?startDate=${today}&endDate=${today}`,
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((res) => {
          setTransactions(res.data?.data?.transactions);
        })
        .catch((err) => {
          alert(err.response?.data?.message);
        });
    };

    fetchData();
  }, [refresh]);

  console.log(transactions);

  return (
    <div style={parentDivStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography style={titleStyle}>Today Transactions</Typography>

        <GrRefresh
          style={{
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => setRefresh((state) => state + 1)}
        />
      </div>

      {transactions?.map((transaction, index) => {
        return <Transaction transaction={transaction} index={index} />;
      })}
    </div>
  );
}

function Transaction({ transaction, index }) {
  const transactionStyle = {
    background: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "15px",
    borderRadius: "10px",
    alignItems: "center",
    borderLeft:
      transaction?.credit > 0 ? "8px solid #036771" : "8px solid lightGrey",
  };

  function slicer (data) {


  }
  return (
    <div style={transactionStyle}>
      <Typography style={{ fontSize: "16px", flex: 0.2, color: "grey" }}>
        {index + 1}.
      </Typography>

      <Typography style={{ fontSize: "16px", flex: 1.5 }}>
        {transaction?.customer
          ? transaction.customer.name?.substring(0, 24)
          : transaction?.vendor?.name?.substring(0, 24)}
      </Typography>

      <Typography style={{ fontSize: "16px", flex: 1.3 }}>
        {transaction?.description?.substring(0, 20)}
        {transaction?.description?.length > 20 && "..."}
      </Typography>

      <Typography style={{ fontSize: "16px", flex: 0.8 }}>
        $
        {transaction?.debit > 0
          ? transaction?.debit?.toFixed(2)
          : transaction?.credit?.toFixed(2)}
      </Typography>

      <Typography style={{ fontSize: "16px", flex: 0.8 }}>
        {moment(transaction?.date).format("HH:mm a")}
      </Typography>

      <Typography
        style={{
          fontSize: "16px",
          flex: 0.3,
          color: transaction?.credit && "#036771",
          fontWeight: transaction?.credit && "bold",
        }}
      >
        {transaction?.debit > 0 ? "DEEN" : "BIXIN"}
      </Typography>
    </div>
  );
}
