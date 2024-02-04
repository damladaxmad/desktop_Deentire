import React, { useEffect, useState } from "react";
import StatCard from "../containers/DashboardContainers/Summary/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import WeeklyChart from "../containers/DashboardContainers/Weekly/WeeklyChart";
import OrderUpdates from "../containers/DashboardContainers/Weekly/OrderUpdates";
import RevenueStats from "../containers/DashboardContainers/Weekly/RevenueStats";
import Top5Employees from "../containers/DashboardContainers/Monthly/Top5Employees";
import Top5DeenCustomers from "../containers/DashboardContainers/Customer/Top5DeenCustomers";
import { setDashboard } from "../redux/actions/dashboardActions";
import useFetch from "../funcrions/DataFetchers";
import Top5OrderCustomers from "../containers/DashboardContainers/Customer/Top5OrderCustomers";
import { read } from "original-fs";
import Top5DeenVendors from "../containers/DashboardContainers/Customer/Top5OrderCustomers";
import moment from "moment";
import axios from "axios";
import { constants } from "../Helpers/constantsFile";
import { setCustomers, setCustomersFetched } from "../redux/actions/customersActions";
import { setVendors, setVendorsFetched } from "../redux/actions/vendorsActions";
import TodayTransactions from "../containers/DashboardContainers/TodayTransactions";

const Dashboard = () => {

  const dashboard = useSelector((state) => state.dashboard.dashboard);
  const dispatch = useDispatch()

  const [state, setState] = useState(1)
  const customers = useSelector(state => state.customers.customers)
  const vendors = useSelector(state => state.vendors.vendors)
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("MM")
  );

  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const token = useSelector((state) => state.token.token);
  const isDataFetched = useSelector((state) => state.customers.isDataFetched);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!isDataFetched && token) {
      const fetchData = async () => {
        const response = await axios
          .get(
            `${constants.baseUrl}/customers/user-customers-with-transactions/${activeUser?._id}`,
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then((res) => {
            dispatch(setCustomers(res?.data?.data?.customers));
            dispatch(setCustomersFetched(true));
          })
          .catch((err) => {
            alert(err.response?.data?.message);
          });
      };
      const fetchData2 = async () => {
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
      fetchData2();
    }
  }, [isDataFetched, token]);

  let recievable = 0
  let customerLength = 0
  customers?.map(customer => {
    if (customer.type && customer.type !== "deynle") return
    recievable += customer.balance
    customerLength += 1
  })

  let payble = 0
  vendors?.map(vendor => {
    payble += vendor.balance
  })

  const myDate = [
    {label: "macaamiisha", value: customerLength, isMoney: false},
    {label: "deenta maqan", value: recievable, isMoney: true},
    {label: "shirkadaha", value: vendors?.length, isMoney: false},
    {label: "kugu maqan", value: payble, isMoney: true}
  ]


  return (

    <div
      id="uni"
      style={{
        height: "100%",
        width: "92%",
        margin: "0px auto",
        display: "flex",
        gap: "32px",
        flexDirection: "column",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
        Dashboard
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {myDate.map((d, index) => (
          <StatCard value={d} key={index} type = "summary"/>
        ))}
      </div>

         <div
        style={{
          display: "flex",
          width: "98.5%",
          gap: "50px",
          flexWrap: "wrap",
          marginTop: "15px"
        }}
      >
        <Top5DeenCustomers  /> 
        <Top5DeenVendors  /> 
        </div>

        <TodayTransactions />

    </div>
  );
};

export default Dashboard;