import { Button, Typography } from "@material-ui/core";
import MyModal from "../../Modal/Modal";

const Details = (props) => {
  console.log(props.data);

  return (
    <MyModal onClose={props.hideModal} pwidth="400px">
      <div
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "8px",
        }}
      >
        <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
          {" "}
          Invoice Details
        </Typography>
        {props.data?.sale?.products?.map((product) => {
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography style={{ width: "35%" }}> {product.item}</Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                {product.quantity}
              </Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                ${product.unitPrice}
              </Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                ${product.subtotal}
              </Typography>
            </div>
          );
        })}

        {props.data?.purchase?.products?.map((product) => {
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography style={{ width: "35%" }}> {product.item}</Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                {product.quantity}
              </Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                ${product.unitPrice}
              </Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                ${product.subtotal}
              </Typography>
            </div>
          );
        })}

{props.data?.service?.products?.map((product) => {
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography style={{ width: "35%" }}> {product.name}</Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                {product.quantity}
              </Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                ${product.unitPrice}
              </Typography>
              <Typography style={{ width: "25%", textAlign: "end" }}>
                {" "}
                ${product.subtotal}
              </Typography>
            </div>
          );
        })}

        <button
          style={{
            width: "120px",
            fontSize: "17px",
            fontWeight: "600",
            color: "white",
            height: "35px",
            border: "none",
            background: "#2F49D1",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
          }}
          onClick={() => props.hideModal()}
        >
          Close
        </button>
      </div>
    </MyModal>
  );
};

export default Details;
