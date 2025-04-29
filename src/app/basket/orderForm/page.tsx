import CartOrderForm from "@/src/components/basket/cartOrderForm/CartOrderForm";
import InfoBlock from "@/src/components/layout/infoBlock/InfoBlock";

export default function CartOrderFormContainer() {
  return (
    <div>
      <InfoBlock>
        <CartOrderForm />
      </InfoBlock>
    </div>
  );
}
