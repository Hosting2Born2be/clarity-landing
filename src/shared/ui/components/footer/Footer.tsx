import Link from "next/link";
import styles from "./Footer.module.scss";
import Image from "next/image";
import { Facebook } from "../icons/facebook/Facebook";
import { Instagram } from "../icons/instagram/Instagram";
import { TikTok } from "../icons/tiktok/TikTok";
import { Youtube } from "../icons/youtube/Youtube";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={"_container"}>
        <div className={styles.footer__row}>
          <div className={styles.footer__col1}>
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={186}
                height={33}
                quality={100}
              />
            </Link>
            <p>Smart electronic moneysolution in your pocket.</p>
          </div>
          <div className={styles.footer__col2}>
            <Link href="https://clarityglobalinc.com/" target="_blank">
              <Image
                src="/website.svg"
                alt="instagram"
                width={16}
                height={16}
                quality={100}
              />
              Our Website
            </Link>
            <Link href="https://clarityglobalinc.com/privacy-policy.html" target="_blank">
              <Image
                src="/privacy.svg"
                alt="instagram"
                width={16}
                height={16}
                quality={100}
              />
              Our Privacy
            </Link>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <p>
            © {new Date().getFullYear()} Clarity Global Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
