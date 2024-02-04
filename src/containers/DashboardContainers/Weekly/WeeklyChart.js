import { Typography } from "@material-ui/core";

const WeeklyChart = (props) => {

  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "9px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "280px",
      }}
    >
      <Typography style={{ fontWeight: "550", fontSize: "18px" }}>
        Weekly Charts
      </Typography>

      <div style={{ display: "flex", gap: "14px" }}>
        {props.data?.map((day) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "#8B8B8B" }}>{day.orders}</Typography>
            <div
              style={{
                background: "#F0F2FA",
                width: "14px",
                height: "100px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  background: day.orders >= 10 ? "#3245E9" : "#F2994A",
                  width: "14px",
                  height: day.orders > 10 ? "100px" : `${day.orders}0px`,
                  borderRadius: "6px",
                }}
              ></div>
            </div>
            <Typography style={{ fontSize: "11px", fontWeight: "600" }}>{day.day.slice(0, 3).toUpperCase()}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyChart;

