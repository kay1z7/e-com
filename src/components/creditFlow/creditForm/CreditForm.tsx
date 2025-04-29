import Button from '../../base/Button/Button';
import DarkPopup from '../../popup/darkPopup/DarkPopup';
import LogoIcon from "@/src/assets/icons/logoIcon.svg";
import css from "./CreditForm.module.scss";
import { useState } from 'react';
import Image from 'next/image';
import OxusForm from './oxusForm/OxusForm';

interface Props {
  open: boolean;
  card: any
}
const installmentPlans = [
  {
    id: 1,
    number: 3,
    title: "мес",
  },
  {
    id: 2,
    number: 6,
    title: "мес",
  },
  {
    id: 3,
    number: 9,
    title: "мес",
  },
  {
    id: 4,
    number: 12,
    title: "мес",
  },
  {
    id: 5,
    number: 18,
    title: "мес",
  },
  {
    id: 6,
    number: 24,
    title: "мес",
  },
];

const CreditForm = ({open, card}: Props) => {
  const [installmentPlan, setInstallmentPlan] = useState(null);
  const [amount, setAmount] = useState(1);
  const [nextStep, setNextStep] = useState(false);

  const handleClick = (id) => {
    setInstallmentPlan(id);
  };
  
  if (!open) {
    return null;
  }
  if (nextStep) {
    return <OxusForm/>
  }
  return (
    <div>
      <DarkPopup topRight={true}>
        <div className={css.form}>
          <Button
            className={css.form_logo}
            leftIcon={<LogoIcon />}
            variant="icon"
          />
          <p>Оформление в кредит</p>
          <div className={css.form_blocks}>
            <div className={css.form_block}>
              <h3><span>1</span>Выбранный вами товар:</h3>
              <div className={css.form_block_item}>
                <div className={css.form_block_item_img}>
                  <Image 
                    src={`${"https://tanda-v1.s3.eu-north-1.amazonaws.com/"}${card?.images?.[0].file}`} 
                    alt={card?.title} 
                    width={200}
                    height={200}
                  />
                </div>
                <div className={css.form_block_item_desc}>
                  <div className={css.form_block_item_desc_name}>
                    <p>{card?.title}</p>
                    <span>{card?.category?.name}</span>
                  </div>
                  <div className={css.form_block_item_desc_price}>
                    <div>{+card?.discountedPrice * amount} сом</div>
                    <div className={`${css.buttonsContainer}`}>
                      <button className={`${css.addButton}`} onClick={() => {amount > 1 && setAmount((prev) => prev - 1)}}>
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 12.5H19.5"
                            stroke="#181818"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <p className={`${css.quantity}`}>{amount}</p>
                      <button className={`${css.subtractButton}`} onClick={() => {setAmount((prev) => prev + 1)}}>
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5.5V19.5"
                            stroke="#181818"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 12.5H19"
                            stroke="#181818"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={css.form_block}>
              <h3><span>2</span>Выберите срок кредита:</h3>
              <div className={css.form_block_installment}>
                <div className={css.form_block_installment_plan}>
                  {installmentPlans.map((item) => (
                    <div key={item.id} className={css.form_block_installment_plan_item}>
                      <div
                        className={`${css.form_block_installment_plan_block} ${installmentPlan === item.id ? `${css.active}` : ""}`}
                        onClick={() => handleClick(item.id)}
                      >
                        <p>{item.number}</p>
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={css.form_block_desc}>
                <div>Сумма кредита:</div>
                <div className={css.form_block_desc_price}>999999 сом</div>
                <div>Ежемесячный платеж:</div>
                <div className={css.form_block_desc_price}>999999 сом</div>
              </div>
            </div>
            <Button 
              onClick={() => setNextStep(true)}
              text="Продолжить"
              width="100%"
              variant="blue"
            />
          </div>
        </div>
      </DarkPopup>
    </div>
  );
};

export default CreditForm;