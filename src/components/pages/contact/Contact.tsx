import React from "react";

import InfoBlock from "../../layout/infoBlock/InfoBlock";
import css from "./Contact.module.scss";

const Contact = () => {
  return (
    <InfoBlock>
      <h1 className="block_title">Контакты</h1>
      <div className="block_content">
        <div className={css.block_item}>
          <h2 className={css.block_subtitle}>1. Контактная информация</h2>{" "}
          <ul className={css.list}>
            <li className={css.block_text}>
              Электронная почта:{" "}
              <a href="mailto:tandakgz@gmail.com" rel="nofollow">
                tandakgz@gmail.com
              </a>{" "}
            </li>
            <li className={css.block_text}>
              Телефон:{" "}
              <a href="tel:+996703175950" rel="nofollow">
                +996 703 175 950
              </a>
            </li>
          </ul>
        </div>
        <div className={css.block_item}>
          <h2 className={css.block_subtitle}>2. Социальные сети</h2>{" "}
          <ul className={css.list}>
            <li className={`${css.block_text}`}>
              <a
                href="https://www.instagram.com/tandakgz/profilecard/?igsh=bzV0bzJ1djNseWpl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li className={`${css.block_text}`}>
              <a
                href="https://wa.me/708773883/?text= Здравствуйте, я Вам пишу с сайта tanda.kg"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </InfoBlock>
  );
};

export default Contact;
