import Link from "next/link";
import { CloudOff } from "lucide-react";
import { NOT_FOUND } from "@/constants/NotFound";
import styles from "./NotFound.module.scss";

export default function NotFoundUI() {
  return (
    <main className={styles.notFound}>
      <div className={styles.notFound__content}>
        <CloudOff size={80} className={styles.notFound__icon} />
        <h1 className={styles.notFound__title}>{NOT_FOUND.TITLE}</h1>
        <p className={styles.notFound__text}>{NOT_FOUND.TEXT}</p>
        <Link href="/" className={styles.notFound__backLink}>
          {NOT_FOUND.LINK}
        </Link>
      </div>
    </main>
  );
}
