import { DialogContent, DialogContentText } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";

import AddedToBasket from "@/src/assets/icons/addedToBasket.svg";

import Button from "../base/Button/Button";
import css from "./Dialog.module.scss";
import { CustomDialog } from "./style";

const DialogComponent = ({ setOpenDialog, open }) => {
  const router = useRouter();

  return (
    <CustomDialog onClose={() => setOpenDialog(false)} open={open}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        <AddedToBasket />
      </DialogTitle>
      <DialogContentText
        sx={{
          margin: "0 auto",
          fontFamily: "Roboto",
          fontSize: { xs: "22px", sm: "32px", md: "32px" },
          fontWeight: "600",
          color: "#000000",
          marginTop: "24px",
          textAlign: "center",
        }}
      >
        Добавлено в корзину!
      </DialogContentText>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "0",
          marginTop: { xs: "20px", sm: "40px", md: "40px" },
        }}
      >
        <Button
          text="Оформить заказ"
          className={css.dialog_btn}
          variant="blue"
          onClick={() => {
            router.push("/basket/orderForm");
          }}
        />
        <Button
          text="Продолжить покупки"
          className={css.dialog_btn}
          onClick={() => setOpenDialog(false)}
          variant="lightBlue"
        />
      </DialogContent>
    </CustomDialog>
  );
};

export default DialogComponent;
