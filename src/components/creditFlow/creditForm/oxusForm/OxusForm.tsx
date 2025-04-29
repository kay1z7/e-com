import DarkPopup from '@/src/components/popup/darkPopup/DarkPopup';
import React from 'react';
import css from './OxusForm.module.scss';
import Image from 'next/image';
import Button from '@/src/components/base/Button/Button';
import LogoIcon from "@/src/assets/icons/logoIcon.svg";

const OxusForm = () => {
  return (
    <div>
      <DarkPopup topRight>
      <div className={css.form}>
          <Button
            className={css.form_logo}
            leftIcon={<LogoIcon />}
            variant="icon"
          />
          <p>Оформление в кредит</p>
          <div className={css.form_blocks}>
            <div className={css.form_block}>
              <h3><span>3</span>Заполните данные:</h3>
              <div className={css.form_block_item}>
                
              </div>
            </div>
            <Button
              text="Отправить код подтверждения"
              width="100%"
              variant="blue"
            />
          </div>
        </div>
      </DarkPopup>
    </div>
  );
};

export default OxusForm;
