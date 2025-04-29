import { Suspense } from "react";

import Footer from "./footer/Footer";
import Header from "./header/Header";
import css from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={css.layout}>
      <Suspense>
        <Header />
      </Suspense>
      <div className={css.layout_fixed_block} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
