import Link from "next/link";
import { useRouter } from "next/navigation";

import InstagramIcon from "@/src/assets/icons/instagramIcon.svg";
import LogoIcon from "@/src/assets/icons/logoIcon.svg";
import WhatsAppIcon from "@/src/assets/icons/whatsAppIcon.svg";

import Button from "../../base/Button/Button";
import css from "./Footer.module.scss";

const company = [
  { title: "О нас", link: "/company/about" },
  { title: "Политика конфиденциальности", link: "/company/privacyPolicy" },
];

const contacts = [
  {
    title: "tandakgz@gmail.com",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=tandakgz@gmail.com",
    type: "email",
  },
  { title: "+996 703 175 950", link: "+996 703 175 950", type: "tel" },
  { title: "+996 703 175 950 ", link: "+996 703 175 950", type: "tel" },
];

const Footer = () => {
  const router = useRouter();

  return (
    <footer className={css.footer}>
      <div className={css.footer_wrapper}>
        <div className={css.footer_wrapper_first}>
          <Button
            className={css.footer_wrapper_logo}
            leftIcon={<LogoIcon />}
            variant="icon"
            onClick={() => router.push("/")}
          />
          <div className={css.footer_wrapper_icons}>
            <a href="https://www.instagram.com/tandakgz/profilecard/?igsh=bzV0bzJ1djNseWpl">
              <Button
                leftIcon={<InstagramIcon />}
                variant="icon"
                className={css.footer_wrapper_icon}
              />
            </a>
            <a href="https://wa.me/708773883/?text= Здравствуйте, я Вам пишу с сайта tanda.kg">
              <Button
                leftIcon={<WhatsAppIcon />}
                variant="icon"
                className={css.footer_wrapper_icon}
              />
            </a>
          </div>
        </div>
        <div className={css.footer_wrapper_second}>
          <p className={css.footer_wrapper_second_title}>Компания</p>
          {company.map((x) => (
            <Link
              key={`${x.link}-contacts-${x.title}`}
              href={x.link}
              className={css.footer_wrapper_second_text}
            >
              {x.title}
            </Link>
          ))}
        </div>

        <div className={css.footer_wrapper_second}>
          <p className={css.footer_wrapper_second_title}>Контакты</p>
          {contacts.map((x) => (
            <a
              key={`${x.link}-contacts-${x.title}`}
              href={x.type === "tel" ? `tel:${x.link}` : `${x.link}`}
              className={css.footer_wrapper_second_text}
            >
              {x.title}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
