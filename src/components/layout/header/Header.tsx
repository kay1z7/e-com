import { useState } from "react";

import { useCart } from "@/src/Context/cartContext";

import css from "./Header.module.scss";
import MobileHeader from "./MobileHeader/MobileHeader";
import WebHeader from "./WebHeader/WebHeader";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useCart();
  const [basket, setBasket] = useState([]);
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(false);

  const getBasket = (basketItems) => {
    setBasket(basketItems);
  };

  return (
    <header className={css.header}>
      <WebHeader
        getBasket={getBasket}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        autoCompleteVisible={autoCompleteVisible}
        setAutoCompleteVisible={setAutoCompleteVisible}
      />
      <MobileHeader
        basket={basket}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        autoCompleteVisible={autoCompleteVisible}
        setAutoCompleteVisible={setAutoCompleteVisible}
      />
    </header>
  );
};

export default Header;
