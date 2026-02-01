import React from "react";
import { CloudSun } from "lucide-react";
import { HEADER } from "@/constants/Header";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <CloudSun
            className={styles.header__icon}
            size={32}
            aria-hidden="true"
          />
          <div className={styles.header__content}>
            <h1 className={styles.header__title}>{HEADER.TITLE}</h1>
            <span className={styles.header__text}>{HEADER.TEXT}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
