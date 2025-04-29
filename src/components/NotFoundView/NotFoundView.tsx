import { useRouter } from "next/navigation";

import Button from "@/src/components/base/Button/Button";

import NotFoundStyles from "./NotFoundModal.module.scss";

const NotFoundView = () => {
  const router = useRouter();
  return (
    <div className={NotFoundStyles.wrapper}>
      <p>
        К сожалению, по вашему запросу ничего не найдено. Пожалуйста, проверьте правильность
        написания или попробуйте другой запрос.
      </p>
      <Button
        text="На главную"
        variant="blue"
        className={NotFoundStyles.btn}
        onClick={() => {
          router.push("/");
        }}
      />
    </div>
  );
};

export default NotFoundView;
