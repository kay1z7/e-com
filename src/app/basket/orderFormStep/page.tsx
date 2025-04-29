import OrderFormStep from "@/src/components/basket/cartOrderForm/steps/OrderFormStep";
import InfoBlock from "@/src/components/layout/infoBlock/InfoBlock";

export default function OrderFormStepContainer() {
  return (
    <div>
      <InfoBlock>
        <OrderFormStep />
      </InfoBlock>
    </div>
  );
}
