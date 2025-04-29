import { useState } from "react";

import BasketIcon from "@/src/assets/cart.svg";
import BasketIconBlue from "@/src/assets/cart_blue.svg";
import CatalogIcon from "@/src/assets/catalog.svg";
import CatalogIconBlue from "@/src/assets/catalog_blue.svg";
import HomeIcon from "@/src/assets/home.svg";
import HomeIconBlue from "@/src/assets/home_blue.svg";
import UserIcon from "@/src/assets/user.svg";
import UserIconBlue from "@/src/assets/user_blue.svg";

import Button from "../base/Button/Button";
import SignUp from "../signUp/SignUp";
import css from "./MobileBottomNav.module.scss";

const MobileBottomNav = ({
  router,
  basket,
  handleCartClick,
  setIsVisibleCategories,
  isVisibleCategories,
  isLoggedIn,
}) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const handleAuthClick = () => {
    if (!isLoggedIn) setIsSignUpModalOpen(true);
    else router.push("/profile");
    setIsVisibleCategories(false);
  };
  return (
    <div className={css.nav}>
      <Button
        leftIcon={router.pathname === "/" && !isVisibleCategories ? <HomeIconBlue /> : <HomeIcon />}
        className={`${css.mobileNavButton} ${router.pathname === "/" && !isVisibleCategories && css.active}`}
        variant="icon"
        onClick={() => {
          router.push("/");
          setIsVisibleCategories(false);
        }}
      />
      <Button
        leftIcon={isVisibleCategories ? <CatalogIconBlue /> : <CatalogIcon />}
        className={`${css.mobileNavButton} ${isVisibleCategories && css.active}`}
        variant="icon"
        onClick={() => setIsVisibleCategories(!isVisibleCategories)}
      />
      <Button
        leftIcon={
          router.pathname === "/basket/basket" && !isVisibleCategories ? (
            <BasketIconBlue />
          ) : (
            <BasketIcon />
          )
        }
        className={`${css.mobileNavButton} ${router.pathname === "/basket/basket" && !isVisibleCategories && css.active}`}
        variant="icon"
        onClick={handleCartClick}
      >
        {!!basket && (
          <div className={css.count_wrapper}>
            <span className={css.count}>{basket}</span>
          </div>
        )}
      </Button>
      <Button
        leftIcon={
          router.pathname === "/profile" && !isVisibleCategories ? <UserIconBlue /> : <UserIcon />
        }
        className={`${css.mobileNavButton} ${router.pathname === "/profile" && !isVisibleCategories && css.active}`}
        variant="icon"
        onClick={handleAuthClick}
      />
      {isSignUpModalOpen && <SignUp onClose={() => setIsSignUpModalOpen(false)} />}
    </div>
  );
};

export default MobileBottomNav;
