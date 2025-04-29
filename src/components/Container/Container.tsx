import cls from "./Container.module.scss";

const Container = ({ children }) => <div className={cls.container}>{children}</div>;

export default Container;
