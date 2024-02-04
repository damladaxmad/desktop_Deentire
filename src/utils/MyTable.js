import React, { useEffect, useState } from "react";
import {MdClose} from "react-icons/md"
import MaterialTable from "material-table";
import { constants } from "../Helpers/constantsFile";
import { useSelector } from "react-redux";

const MyTable = (props) => {

  const columns = props.columns;
  const [instance, setInstance] = useState("");
  const [way, setWay] = useState(props.way)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    instance
  ) => {
    setInstance(instance);
   props.way == "Service" ? props.removeItem(instance.name) : props.removeItem(instance)
  };

  const removeItem = () => {
    setInstance(instance);
    // setAnchorEl(null)
    props.removeItem(instance.item)
  }


  let topValues = props.data?.sort((a,b) => b.balance-a.balance).slice(0,props.data?.length);
  // topValues?.forEach(myFun)
  
  // topValues?.map(t => {
  //   if (real.includes(t.name)) return
  //   unreal.push(t.name)
  // })

  // console.log(real)
  // console.log(unreal)
  // console.log(cost)
  // console.log(categories)
  // const counts = {};
  // categories?.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
  // console.log(counts)

  return (
    <div style={{ width: props.page == "New Purchase" ? "98%" : 
    props.kind == "Report" ? "100%" : "95%", 
    margin: props.page == "New Purchase" ? "none" : "auto" }}>

      <MaterialTable
    //   icons={tableIcons}
        columns={columns}
        data={topValues}
        options={{
          rowStyle: {},
          showTitle: false,
          paging: props.page == "New Purchase" || props.kind == "Report" ? false : true,
          exportButton: true,
          sorting: false,
          showTextRowsSelected: false,
          toolbar: false,
          pageSizeOptions: [2, 5, 8, 10, 20, 25, 50, 100],
          pageSize: props.page == "New Purchase" ? 3 : 10,
          draggable: false,
          actionsColumnIndex: -1,
          headerStyle: { background: "#F6F6F6", fontSize: "13px",
          fontWeight: "bold", display: props.kind == "Report" && "none"
      },
        }}
       actions={[
          props.kind != "Report" && {
            icon: () => (
              <MdClose style = {{color: "#E9356E", fontWeight: "bold", 
            fontSize: "24px"}}
              />
            ),
            tooltip: "Save User",
            onClick: (event, rowData) => {
              handleClick(event, rowData);
            },
            position: "row",
          },
        ]}

        components={
          props.kind == "Report" && {
          Row: (props) => {
            return (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent:"space-between",
                  borderBottom: "0.5px solid #C1C1C1",
                  padding: "6px 0px",
                  fontSize: 15,
                }}
              >
                
                <p style={{ margin: "0px", width: "35%",  }}>
                 {props.data.name} 
                </p>
                <p style={{ margin: "0px", width: "21%", textAlign: "end" }}>
                  {way == "summary" ? props.data.totalQuantity : props.data.phone}
                </p>
                <p style={{ margin: "0px", width: "21%", textAlign: "end" }}>
                  {way == "summary" ? props.data.avgUnitPrice?.toFixed(2) : props.data.district}
                </p>
                <p style={{ margin: "0px", width: "21%", textAlign: "end" }}>
                  {constants.moneySign}{way == "summary" ? props.data.totalPrice?.toFixed(2) : props.data.balance?.toFixed(2)}
                </p>
              </div>
            );
          },
        }}
        style={{ borderRadius: "10px", boxShadow: "none",
         border: props.page == "New Purchase" ? "1px solid black" : "none"}}
      />
    </div>
  );
};

export default MyTable;
