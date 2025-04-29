import { useState } from "react";

import CallIcon from "@/src/assets/icons/call.svg";
import LogoIcon from "@/src/assets/icons/logoIcon.svg";
import SearchIcon from "@/src/assets/icons/searchIcon.svg";
import Button from "@/src/components/base/Button/Button";
import MobileCategories from "@/src/components/categories/MobileCategories/MobileCategories";
import ModalVerificationCodeForm from "@/src/components/signUp/ModalVerificationCodeForm";

import css from "./HeaderView.module.scss";

const HeaderView = ({
  router,
  setIsSearchPanelVisible,
  setIsVisibleCategories,
  isVisibleCategories,
  setIsLoggedIn,
}) => {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  const handleVerificationSuccess = () => {
    setIsVerificationModalOpen(false);
    setIsLoggedIn(true);
  };
  return (
    <>
      <Button
        className={css.headerMobileLogo}
        leftIcon={<LogoIcon />}
        variant="icon"
        onClick={() => router.push("/")}
      />
      <div className={css.headerMobileBlock}>
        <Button
          leftIcon={<SearchIcon />}
          variant="icon"
          className={css.headerMobileButton}
          onClick={() => {
            setIsSearchPanelVisible(true);
          }}
        />
        <Button
          leftIcon={<CallIcon />}
          variant="icon"
          className={css.headerMobileButton}
          onClick={() => {
            window.location.href = "tel:+996708773883";
          }}
        />
        <MobileCategories
          isVisibleCategories={isVisibleCategories}
          setIsVisibleCategories={setIsVisibleCategories}
        />

        {isVerificationModalOpen && (
          <ModalVerificationCodeForm
            isOpen={isVerificationModalOpen}
            onClose={() => setIsVerificationModalOpen(false)}
            onSuccess={handleVerificationSuccess}
          />
        )}
      </div>
    </>
  );
};

export default HeaderView;
