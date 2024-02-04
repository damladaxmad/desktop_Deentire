import { Button, Divider, Typography } from "@material-ui/core";
import MyModal from "../Modal/Modal";
import { MdCheckBox } from "react-icons/md";
import { RiWallet3Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import moment from "moment";

const parentDivStyle = {
  width: "350px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "10px",
};

const ImageUrl = (props) => {
    const imageUrl = props.imageUrl
    console.log(imageUrl)
  return (
    <MyModal onClose={props.hideModal} width="350px" top="30%">
      <div style={parentDivStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
    <img
        src={imageUrl}
        alt="Your Image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      </div>

        <Button
          onClick={props.hideModal}
          style={{
            width: "100%",
            marginLeft: "auto",
            fontSize: "16px",
            backgroundColor: "#03656F",
            fontWeight: "600",
            color: "white",
            height: "35px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          OK
        </Button>
      </div>
    </MyModal>
  );
};

export default ImageUrl;