import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import { useEffect } from "react";
import { useState } from "react";

const Top5DeenVendors = (props) => {
    const [loaded, setLoaded] = useState(false)
    const vendors = useSelector((state) => state.vendors.vendors);
    const isDataFetched = useSelector((state) => state.vendors.isDataFetched);

    useEffect(() => {
        if (isDataFetched) setLoaded(true)
      }, [isDataFetched]);

      let skeArray = [1, 2, 3, 4 , 5]

    let values = []
    vendors?.map(vendor => {
        values.push(vendor.balance)
    })
    let topValues = vendors?.sort((a,b) => b.balance-a.balance).slice(0,5);
    console.log(topValues)


    return (
        <div style = {{background: "white", padding: "24px", 
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
            {loaded && <Typography style = {{color: "grey", fontWeight: "bold"}}>
                Vendors Deen
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
        color: "black"}}>
            Top Deen Vendors
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
                color: "black"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "15px",
                color: "black"}}> {customer.name.substring(0, 20)}
                {customer.name.length <= 20 ? null : "..." } </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "black"}}> ${customer.balance?.toFixed(2)} </Typography>
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

export default Top5DeenVendors