import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Typography, Button, MenuItem, Menu, Avatar } from "@material-ui/core";
import axios from "axios";
import {TiArrowUnsorted} from "react-icons/ti"
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../Helpers/constantsFile";
import { deleteFunction } from "../funcrions/deleteStuff";
import ResetUser from "../containers/AdminstrationContainers/UsersContainer/ResetUser";
import { useNavigate, useLocation } from "react-router-dom";
import ChargeUser from "../containers/AdminstrationContainers/UsersContainer/ChargeUser";
import Payment from "../containers/AdminstrationContainers/UsersContainer/Payment";
import {MdClose} from "react-icons/md"
import { deleteProduct } from "../redux/actions/productsActions";
import { deleteServiceTypes } from "../redux/actions/serviceTypesActions";
import { deleteCustomer } from "../redux/actions/customersActions";
import { deleteClient } from "../funcrions/deleteClient";

const Table = (props) => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)   
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false);
  const [userShow, setUserShow] = useState(false);
  const [cVModal, setCVmodal] = useState(false);
  const [instance, setInstance] = useState("");
  const [showChargeModal, setShowChargeModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [data, setData] = useState(props.data)
  const [myState, setMyState] = useState()
  const [del, setDel] = useState(1)
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const socket = useSelector(state => state.socketId.socketId)
  const token = useSelector(state => state.token.token)

  const columns = props.columns;

  useEffect(()=> {
    setData(props.data)
  }, [props.data])

  const showModal = () => {
    setShow(true);
    handleClose();
  };

  const showUserModal = () => {
    setUserShow(true);
    handleClose();
  };

  const hideModal = () => {
    setShow(false);
    setCVmodal(false);
    props.change();
  };

  const hideUserModal = () => {
    setUserShow(false);
  };

  const showCustomerVendorModal = () => {
    setCVmodal(true);
    setAnchorEl(null);
  };

  const showTransactionsFun = () => {
    props.showTransactions(instance)
    handleClose()
  }
  const showCustomersFun = () => {
    props.showCustomers(instance)
    handleClose()
  }
  const showVendorsFun = () => {
    props.showVendors(instance)
    handleClose()
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    instance
  ) => {
    
    setAnchorEl(event.currentTarget);
    setInstance(instance);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeInstance = () => {
    if (props.name == "Product")
    dispatch(
      deleteProduct(instance)
    )
    if (props.name == "Type")
    dispatch(
      deleteServiceTypes(instance)
    )

    if (props.name == "Customer")
    dispatch(
      deleteCustomer(instance)
    )
  }
  const deleteInstance = async (name, id) => {
    await deleteFunction(
      `Delete ${name}`,
      props.name == "Category" ? instance.categoryName : 
      props.name == "Type" ? instance.name : name,
      `${constants.baseUrl}/${props.url}/${id}`,
      props.change, removeInstance
    );
    setAnchorEl(null);
    handleClose();
  };

  const deleteInstance2 = async (name, id) => {
    await deleteClient(
      `Delete ${name}`, name,
      `${constants.baseUrl}/${props.url}/close-${props.name?.toLowerCase()}-statement/${id}`,
      ()=> props.change(instance), ()=> {}, token, socket
    );
    setAnchorEl(null);
    handleClose();
  };

  const updateInstance = () => {
    props.update(instance);
    handleClose();
  };


  const disableUser = () => {
    handleClose()
    axios.patch(`${constants.baseUrl}/users/${instance._id}`, {
      status: "disabled"
    },
    {
      headers: {
        "authorization": constants.token
      }
    }).then(res => {
      alert("Succesfully Disabled User")
      props.change()
    })
  }

  const enableUser = () => {
    handleClose()
    axios.patch(`${constants.baseUrl}/users/${instance._id}`, {
      status: "active"
    }).then(res => {
      alert("Succesfully Enabled User")
      props.change()
    })
  }

  const changePassword = () => {
    handleClose()
    axios.post(`${constants.baseUrl}/users/reset-password/${instance._id}`, {
      password: "12345", passwordConfirm: "12345"
    },
    {
      headers: {
        'authorization': constants.token
      },
    }).then(res => {
      alert("Succesfully Changed Password")
      props.change()
    }).catch((err) => {
      alert(err.response?.data?.message)
    })
  }



  const restore = () => {
    axios.post(`${constants.baseUrl}/${props.url}/restore/${instance._id}`, 
    null, {
      headers: {
        "authorization": constants.token
      }
    }).then((res)=> {
      props.change()
      alert("Successfully Restored")
    }).catch((err)=> {
      alert(err.response?.data?.message)
    })
    handleClose()
  }

  const cancelTransaction = () => {
    console.log(props.url, instance._id,)
    axios.post(`${constants.baseUrl}/${props.url}/cancel/${instance._id}`, 
    null, {
      headers: {
        "authorization": constants.token
      }
    }).then((res)=> {
      // props.change()
      alert("Successfully Canceled")
    }).catch((err)=> {
      alert(err.response?.data?.message)
    })
    handleClose()
  }

  const removeItem = () => {
    setInstance(instance);
    setAnchorEl(null)
    props.removeItem(instance.item)
  }
  let state = props.state;

  return (
    <div style={{ width: props.page == "New Purchase" ? "98%" : "95%", 
    margin: props.page == "New Purchase" ? "none" : "auto" }}>
      
      {userShow && (
        <ResetUser
          hideModal={hideUserModal}
          user={instance}
          change={() => props.change()}
        />
      )}

        {showChargeModal && <ChargeUser  hideModal={() => {
          setShowChargeModal(false)
        }}
          user={instance}
          change={() => props.change()}
        />}
        {showPaymentModal && <Payment  hideModal={() => {
          setShowPaymentModal(false)
        }}
          user={instance}
          change={() => props.change()}
        />}
  

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{marginTop: "25px"}}
      >
        {(props.name == "Customer" || props.name == "Vendor") && (
          <MenuItem
            onClick={() => {
             
              handleClose()
              props.pay(instance)
             
            }}
          >
            Payment
          </MenuItem>
        )}

        {
          <MenuItem
            onClick={() => {
                updateInstance();
            }}
          >
            Update {props.name}
          </MenuItem>
        }

{(props.name == "Customer" || props.name == "Vendor" || props.name == "Amaano") && (
          <MenuItem
            onClick={() => {
             
              handleClose()
              deleteInstance2(instance?.name, instance?._id)
             
            }}
          >
           Delete {props.name}
          </MenuItem>
        )}

        {(props.name == "Customer" || props.name == "Vendor" )
          &&  <MenuItem onClick={() => {
           showTransactionsFun()
          }}>View Transactions</MenuItem>}

      </Menu>

      <MaterialTable
      icons={tableIcons}
        columns={columns}
        data={data}
        localization={{
          body: {
            emptyDataSourceMessage: state,
          },
        }}
        options={{
          rowStyle: {},
          showTitle: false,
          paging: props.page == "New Purchase" ? false : true,
          exportButton: true,
          sorting: true,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: props.page == "New Purchase" ? 3 : 10,
        //   pageSize: props.data.length < 100 ? props.data.length < 8 ? 8 : props.data.length : 100,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "#F6F6F6", fontSize: "13px",
          fontWeight: "bold"
        // borderBottom: '1px solid black',
        // borderTop: '1px solid black' 
      },
        }}
     
          
        actions={[
          {
            icon: () => (
              <BiDotsHorizontalRounded
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            ),
            tooltip: "Save User",
            onClick: (event, rowData) => {
              handleClick(event, rowData);
            },
            position: "row",
          },
        ]}
        style={{ borderRadius: "10px", boxShadow: "none",
         border: props.page == "New Purchase" ? "1px solid black" : "none"}}
         onRowClick={(e, rowData)=> {
          if (props.type == "kaashle") return
          props.showTransactions(rowData)
         }}
      />
    </div>
  );
};

export default Table;
