import { Typography } from "@material-ui/core";
import { constants } from "../../../Helpers/constantsFile";

const RevenueStats = (props) => {
  
  const orders = [
    // { name: "Payed Money", value: props.data?.payedMoney },
    // { name: "Owed Money", value: props.data?.ownedMoney },

    { name: "Today Orders", value: props.data?.totalOrders, isMoney: false },
    { name: "Estimated Profit", value: props.data?.estimatedPorfit, isMoney: true },
    { name: "Advanced Money", value: props.data?.advancedMoney, isMoney: true },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "9px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "30%",
      }}
    >
      <Typography style={{ color: "#3245E9", fontWeight: "bold" }}>
        Today
      </Typography>
      <Typography style={{ fontWeight: "600", fontSize: "22px" }}>
        Revenue stats
      </Typography>

      {orders.map((order, index) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography style={{ fontSize: "15px", color: "#575656" }}>
            {" "}
            {order.name}{" "}
          </Typography>
          <Typography style={{ fontSize: "15px", color: "#575656" }}>
            {" "}
            {order.isMoney && constants.moneySign}{order.value}{" "}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default RevenueStats;
