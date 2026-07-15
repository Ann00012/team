import Image from "next/image";
import css from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className={css.container}>
      <Image
        src="/red.png"
        alt="logo"
        className={css.logo}
        width="64"
        height="64"
      />
          <Link className={css.title} href="/">My Team</Link>
    </div>
  );
}
