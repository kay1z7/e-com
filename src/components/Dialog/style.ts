import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";

export const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    margin: "0",
    width: "80%",
    padding: "60px 55px 67px 55px",
    borderRadius: "16px",

    "@media (max-width: 600px)": {
      width: "90%",
      padding: "60px 13px 36px 13px",
    },

    "@media (min-width: 600px) and (max-width: 900px)": {
      width: "90%",
      padding: "60px 40px 43px 40px",
    },
  },
}));
