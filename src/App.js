import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { useDispatch } from "react-redux";
import axios from "axios";
import SignupAndLogin from "./SignupAndLogin/SignupAndLogin";
import "./App.css";
import { useSelector } from "react-redux";
import { setCompanyInfo } from "./redux/actions/companyInfoActions";
import NewLayout from "./containers/NewLayout";
import { setIsConnected } from "./redux/actions/isLoginActions";
import { setDashboard } from "./redux/actions/dashboardActions";
import useFetch from "./funcrions/DataFetchers";
import { constants } from "./Helpers/constantsFile";
import { setCustomers } from "./redux/actions/customersActions";
import Customers from "./Pages/Customers";
import { setVendors } from "./redux/actions/vendorsActions";
import Vendors from "./Pages/Vendors";
import ReportsPage from "./Pages/ReportsPage";
import { setAvailable } from "./redux/actions/availableActions";
import SendSMS from "./Pages/SendSMS.js";
import NewLogin from "./SignupAndLogin/NewLogin.js";
import Deen from "./Pages/Deen.js";
import Amaano from "./Pages/Amaano.js";
import Raage from "./Pages/Raage.js";
import Dhexe from "./Pages/Dhexe.js";
import Billing from "./containers/Billing.js";
import CustomSMS from "./Pages/CustomSMS.js";
import io from 'socket.io-client';
import { setSocketId } from "./redux/actions/socketIdActions.js";
import CashCustomers from "./Pages/CashCustomers.js";

const pages = [
  <Route path="/dashboard" element={<Dashboard />} />,
  <Route path="/customers" element={<Customers />} />,
  <Route path="/vendors" element={<Vendors />} />,
  <Route path="/reports" element={<ReportsPage />} />,
  <Route path="/deen" element={<Deen />} />,
  <Route path="/sms" element={<SendSMS />} />,
  <Route path="/custom-sms" element={<CustomSMS />} />,
  <Route path="/amaano" element={<Amaano />} />,
  <Route path="/raage" element={<Raage />} />,
  <Route path="/dhexe" element={<Dhexe/>} />,
  <Route path="/cash" element={<CashCustomers/>} />,
];

function App() {
  const isLogin = useSelector((state) => state.isLogin.isLogin);
  const isConnected = useSelector((state) => state.isLogin.isConnected);
  const [showLayout, setShowLayout] = useState(isLogin);
  const [active, setActive] = useState();
  const activeUser = useSelector((state) => state?.activeUser?.activeUser);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [lacagtaBillah, setLacagtaBillaha] = useState(false)

  useEffect(() => {
    console.log(activeUser);
  }, [activeUser]);

  const showHandler = (user) => {
    console.log(user)
    setTimeout(() => {
      if (user?.notify === "loop" || user?.notify == "stuck") {
        setLacagtaBillaha(true)
      }
      setShowLayout(true);
    }, 1000);
    setShowLayout(true);
  };

  useEffect(() => {
    setShowLayout(isLogin);
  }, [isLogin]);

  useEffect(() => {
    const socket = io.connect('https://deentire-api-rj2w.onrender.com');

    socket.on('connect', () => {
      console.log('Connected to server');
      dispatch(setSocketId(socket.id))
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#F0F2FA",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {lacagtaBillah && <Billing hideModal = {()=> {
        setLacagtaBillaha(false)
      }}/>}
      <Router>
        {!showLayout && (
          <Route
            path="/signup"
            element={<SignupAndLogin showHandler={showHandler} />}
          />
        )}
        {showLayout && (
          <NewLayout
            active={(data) => {
              setActive(data);
            }}
          >
            <Routes>{pages.map((page) => page)}</Routes>
          </NewLayout>
        )}
      </Router>
    </div>
  );
}

export default App;
