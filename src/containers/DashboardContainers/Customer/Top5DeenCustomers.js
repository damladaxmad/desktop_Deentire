import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import { useState } from "react";
import { useEffect } from "react";

const Top5DeenCustomers = (props) => {
    const customers = useSelector((state) => state.customers.customers);
    const isDataFetched = useSelector((state) => state.customers.isDataFetched);
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        if (isDataFetched) setLoaded(true)
      }, [isDataFetched]);

      let skeArray = [1, 2, 3, 4 , 5]
    let values = []
    customers?.map(customer => {
        values.push(customer.balance)
    })
    let topValues = customers?.sort((a,b) => b.balance-a.balance).slice(0,5)
    console.log(topValues)


    return (
        <div style = {{background: "#01545C", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", minWidth: "34.5%"}}>
             {!loaded && (
          <LoadingPlaceHolder
            extraStyles={{
              height: "15px",
              width: "120px",
              marginBottom: "16px",
              borderRadius: "10px",
            }}
          />
        )}
            {loaded && <Typography style = {{color: "#B6C1C2", fontWeight: "bold"}}>
                Customers Deen
            </Typography>}
            {!loaded && (
          <LoadingPlaceHolder
            extraStyles={{
              height: "15px",
              width: "160px",
              marginBottom: "16px",
              borderRadius: "10px",
            }}
          />
        )}
           {loaded && <Typography style = {{fontWeight: "600", fontSize: "22px",
        color: "white"}}>
            Top Deen Customers
            </Typography>}

            {loaded ? topValues?.map((customer, index) => {
                if (customer?.balance < 1) return
                if (!loaded) return  <LoadingPlaceHolder
                      extraStyles={{
                        height: "15px",
                        marginBottom: "16px",
                        borderRadius: "10px",
                      }}
                    />
                return <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> {customer.name.substring(0, 20)}
                {customer.name.length <= 20 ? null : "..." } </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "#f5f5f5"}}> ${customer.balance?.toFixed(2)} </Typography>
                </div>
                }) : skeArray?.map(index => {
                    if (!loaded) return  <LoadingPlaceHolder
                    extraStyles={{
                      height: "15px",
                      marginBottom: "16px",
                      borderRadius: "10px",
                    }}
                  />
                })}


        </div>
    )
}

export default Top5DeenCustomers