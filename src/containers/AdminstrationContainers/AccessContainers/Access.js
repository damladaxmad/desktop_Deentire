import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, MenuItem, Menu, Divider } from "@material-ui/core";
import {Select} from "@mui/material"
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { setUsers } from "../../../redux/actions/usersActions";
import { constants } from "../../../Helpers/constantsFile";

const parentDivStyle = {
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  gap: "0px",
  background: "white",
  width: "92%",
  margin: "auto",
  marginTop: "20px",
  borderRadius: "8px",
  flexDirection: "column",
};

const selectStyle = { height: "40px", color: "#B9B9B9", width: "100%" };

const Access = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch()

  const tabs = [
    { name: "Dashboard", access: ["Dashboard"] },

    {
      name: "Customers",
      access: [
        "Customers", "Add New Customers", "View Transactions",
        "Update Customer", "Payment", "View Orders"
      ],
    },
    {
      name: "Menus",
      access: [
        "Menus", "Add New Menus", "Delete Menu",
        "Update Menu", "View Menu"
      ],
    },
    {
      name: "Order Lists",
      access: [
        "Order Lists", "Assign Order", "Finish Order",
        "Take Order", "Cancel Order"
      ],
    },
    {
      name: "New Order",
      access: ["New Order"],
    },
    {
      name: "Styles",
      access: [
        "Styles", "Add New Styles", "Delete Styles",
        "Update Styles", "View Styles"
      ],
    },
 
    // {
    //   name: "Employees",
    //   access: [
    //     "Employees",
    //     "Add New Employees",
    //     "Give User",
    //     "Delete Employee",
    //     "Update Employee",
    //   ],
    // },
     {
      name: "Adminstration",
      access: ["Adminstration", "Users", "Access", "Reset User", 
      "Delete User", "View Customers", "Disable User"],
    },
   
     
   ];

  const [currentUserPrivillages, setCurrentUserPrivillages] = useState([]);
  const [userAccess, setUserAccess] = useState([]);
  const [refresh, setRefresh] = useState(1)

  const [user, setUser] = useState(users[0]?._id);
  const userHandler = (e) => {
    fetchUsers()
    setUser(e.target.value);
  };

  const [tab, setTab] = useState(tabs[0].name);
  const tabHandler = (e) => {
    setTab(e.target.value);
  };

  const fetchUsers = async () => {
    const response = await axios
      .get(`${constants.baseUrl}/users`, {
        headers: {
          'authorization': constants.token
         },
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    dispatch(setUsers(response.data.data.users));
  };

  // useEffect(() => {
  //   fetchUsers()
  //   users.map((u) => {
  //     if (u._id == user) setCurrentUserPrivillages(u.privillages);
  //   }, []);
  // }, [user, tab, refresh]);

  const [selectAll, setSelectAll] = useState(false);
  const [engaged, setEngaged] = useState(false);

  const selectAllCeckBox = () => {
    let all;
    setSelectAll((state) => (state ? false : true));
    tabs.map((t) => {
      if (t.name == tab) {
        all = t.access;
      }
    });
    if (!selectAll) {
      const realAll = [...all, ...currentUserPrivillages];
      const pure = realAll.filter((v, i, a) => a.indexOf(v) === i);
      setCurrentUserPrivillages(pure);
    }
    if (selectAll) {
      const filteredArr = currentUserPrivillages.filter(
        (item) => !tabs[currentTab].access.includes(item)
      );
      setCurrentUserPrivillages(filteredArr);
      setRefresh(state => state + 1)
    }
  };

  // const selectAllCeckBox = () => {
  //   setSelectAll((state) => (state ? false : true));
  // }
  const unEngageAllHandler = () => {
    setEngaged(false);
  };

  let currentTab = 0;
  tabs.map((tabInstance, index) => {
    if (tabInstance.name == tab) {
      currentTab = index;
    }
  });

  const addUserAccess = (access) => {
    setUserAccess([...userAccess, access]);
  };

  const removeUserAccess = (access) => {
    setUserAccess((arr) => arr.filter((el) => el !== access));
    setCurrentUserPrivillages((arr) => arr.filter((el) => el !== access));
  };

  const resetUserAccess = (access) => {
    setUserAccess([]);
  };

  useEffect(() => {
    resetUserAccess();
    setSelectAll(false);
  }, [user, tab, refresh]);

  const UpdateUserPrivillages = async (data) => {
    console.log(user, userAccess, data, currentUserPrivillages)
    setCurrentUserPrivillages([...currentUserPrivillages, ...userAccess])
    const response = await axios
      .patch(`${constants.baseUrl}/users/${user}`, {
        privillages: currentUserPrivillages,
      }, {
        headers: {
          'authorization': constants.token
         },
      })
      .then(() => {
        alert("Successfully Given Access")
        fetchUsers()
      });
  };

  const saveHandler = () => {
    UpdateUserPrivillages("sths");
  };

  const removeCurrentUserPrivillages = (access) => {
    const filteredArr = currentUserPrivillages.filter((el) => el !== access);
    setCurrentUserPrivillages(filteredArr);
  };

  return (
    <div style={parentDivStyle}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          padding: "20px",
        }}
      >
        <FormControl style = {{width: "25%"}}>
          <Select
            style={selectStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            onChange={userHandler}
          >
            {users.map((user, index) => (
              <MenuItem value={user._id} key={index}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style = {{width: "25%"}}>
          {/* <InputLabel>Gender</InputLabel> */}

          <Select
            style={selectStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tab}
            onChange={tabHandler}
          >
            {tabs.map((tab, index) => (
              <MenuItem value={tab.name} key={index}>
                {tab.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={selectAll}
                onChange={selectAllCeckBox}
              />
            }
            label="Select All"
          />
        </FormGroup>

        <Button
          style={{
            backgroundColor: "#19274B",
            fontSize: "18px",
            fontWeight: "550",
            color: "white",
            width: "25%",
            height: "40px",
          }}
          onClick={saveHandler}
          variant="contained"
        >
          SAVE
        </Button>
      </div>

      <div
        style={{
          backgroundColor: "#DADBE4",
          opacity: 0.7,
          height: "2px",
          width: "100%",
        }}
      ></div>

      <div style={{ padding: "35px 30px" }}>
        <h3> User Access:</h3>
        {tabs[currentTab].access.map((access, index) => (
          <RenderCheckBoxes
            key={index}
            value={access}
            addUserAccess={addUserAccess}
            removeUserAccess={removeUserAccess}
            tab={tab}
            userAccess={userAccess}
            user={user}
            resetUserAccess={resetUserAccess}
            currentUserPrivillages={currentUserPrivillages}
            removeCurrentUserPrivillages={removeCurrentUserPrivillages}
            refresh = {refresh}
          />
        ))}
      </div>
      {/* {userAccess.map(access => (
         <p> {access}</p>
       ))} */}
    </div>
  );
};

const RenderCheckBoxes = (props) => {
  const [accessCheck, setAccessCheck] = useState(false);

  const accessCheckHanlder = (data) => {
    if (props.currentUserPrivillages?.includes(props.value)) {
      props.removeCurrentUserPrivillages(data);
      setAccessCheck(false);
    }
    if (!props.currentUserPrivillages?.includes(props.value)) {
      setAccessCheck((state) => (state ? false : true));
    }
    if (!accessCheck && !props.currentUserPrivillages?.includes(props.value))
      props.addUserAccess(data);
    if (accessCheck) props.removeUserAccess(data);
  };

  useEffect(() => {}, [props.currentUserPrivillages]);

  useEffect(() => {
    setAccessCheck(false);
  }, [props.tab, props.refresh]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            style={{ padding: "10px 25px" }}
            value={props.value}
            color="primary"
            checked={
              props.currentUserPrivillages?.includes(props.value)
                ? true
                : accessCheck
            }
            onChange={() => accessCheckHanlder(props.value)}
          />
        }
        label={props.value}
      />
    </FormGroup>
  );
};

export default Access;
