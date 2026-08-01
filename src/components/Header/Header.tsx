"use client";

import Image from "next/image";
import css from "./Header.module.css";
import Link from "next/link";
import { useAuthStore } from "@/services/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Header() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser && !user) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, [user, setUser]);

  const handleLogout = () => {
    logout(); 
    router.push("/login");
  };

  return (
    <div className={css.container}>
      <div className={css.leftSection}>
        <Image src="/red.png" alt="logo" className={css.logo} width={64} height={64} />
              <Link className={css.title} href="/">My Team</Link>
              <Link href='/addUser' className={css.addUser }>Add new user</Link>
      </div>

      <div className={css.rightSection}>
        {user ? (
          <div className={css.userInfo}>
            <Image
              src={user?.image || "/globe.svg"} 
              alt="avatar"
              width={40}
              height={40}
              className={css.avatar}
            />
            <span className={css.username}>
              {user.firstName ? `${user.firstName} ${user.lastName || ""}` : user.username}
            </span>
            <button onClick={handleLogout} className={css.logoutBtn}>
              Log out
            </button>
          </div>
        ) : (
          <Link href="/login" className={css.loginBtn}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}