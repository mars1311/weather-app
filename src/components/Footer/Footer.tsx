import React from "react";
import Link from "next/link";
import { CloudSun } from "lucide-react";
import { FOOTER } from "@/constants/Footer";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          <div className={styles.footer__brand}>
            <CloudSun
              className={styles.footer__icon}
              size={20}
              aria-hidden="true"
            />
            <span className={styles.footer__name}>{FOOTER.NAME}</span>
          </div>
          <div className={styles.footer__status}>
            <span className={styles.footer__pulse}></span>
            <span className={styles.footer__status_text}>{FOOTER.INFO}</span>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <p className={styles.footer__copyright}>
            &copy; {currentYear} {FOOTER.INFO2}
          </p>
          <nav className={styles.footer__legal} aria-label="Legal navigation">
            <Link href="/privacy" className={styles.footer__link}>
              {FOOTER.PRIVACY}
            </Link>
            <Link href="/terms" className={styles.footer__link}>
              {FOOTER.TERMS}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
