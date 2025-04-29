import type { FC } from "react";
import React from "react";

import Card from "../card/Card";
import css from "./CardsWrapper.module.scss";

interface Props {
  cards: any;
  title?: string;
}

const CardsWrapper: FC<Props> = ({ cards, title }) => {
  return (
    <div className={css.cards}>
      {title && <h1 className={css.cards_title}>{title}</h1>}
      <div className={css.cards_cards}>
        {cards?.map((item) => <Card key={`list-${item?.id}`} item={item} />)}
      </div>
    </div>
  );
};

export default CardsWrapper;
