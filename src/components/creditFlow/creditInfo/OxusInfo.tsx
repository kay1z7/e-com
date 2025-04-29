"use client";
import Button from '../../base/Button/Button';
import InfoBlock from '../../layout/infoBlock/InfoBlock';
import WalletImg from '@/src/assets/icons/wallet2.svg';
import css from './OxusInfo.module.scss';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/Context/cartContext';

const oxusData = [
    {
        text: "Кредиты на любые нужды — от бытовых покупок до развития бизнеса."
    },
    {
        text: "Гибкие условия — возможность выбора срока и размера платежей, исходя из ваших возможностей."
    },
    {
        text: "Простое оформление — минимальный пакет документов и быстрое рассмотрение заявки."
    },
    {
        text: "Поддержка клиентов — консультации и помощь на всех этапах сотрудничества."
    }
]

const OxusInfo = () => {
  const {setIsCredit} = useCart();
  const router = useRouter();
  const handleBack = () => {
    router.back();
    setIsCredit(true);
  }
  return (
    <InfoBlock breadCrumbs='Оформление в кредит'>
      <div className={css.credit_info_wrapper}>
        <div className="block_title">Что такое ОКСУС?</div>
        <p className={css.text}>ОКСУС - это микрофинансовая компания в Бишкеке, предоставляющая удобные и доступные финансовые услуги для физических лиц и малого бизнеса. Мы предлагаем:</p>
        {oxusData.map((item, index) => (
          <ul key={index}>
            <li>{item.text}</li>
          </ul>
        ))}
        <Button
          onClick={handleBack}
          text="Продолжить"
          variant="blue"
          width='min(80%, 25rem)'
        />
        <WalletImg/>
      </div>
    </InfoBlock>
  );
};

export default OxusInfo;
