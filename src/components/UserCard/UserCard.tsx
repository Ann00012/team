import { User } from "@/services/types";
import css from "./UserCard.module.css";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  users: User[];
}
export default function UserCard({ users }: UserCardProps) {
  return (
    <>
      {" "}
      <ul className={css.userList}>
        {users?.map((x) => {
          return (
            <li className={css.userCard} key={x.id}>
                <Image
                  src={x.image || "globe.svg"}
                  alt={x.lastName}
                  className={css.avatar}
                  width="55"
                  height="55"
                />
                <div className={css.info}>
                  <h3>
                    {x.firstName} {x.lastName}
                  </h3>
                  <p>{x.username}</p>
                  <span>{x.email}</span>
                  <div className={css.actions}>
                    <Link href={`/user/${x.id}`} className={css.link}>
                      View Profile
                    </Link>

                    <button className={css.deleteBtn}>Delete</button>
                  </div>
                </div>
          
            </li>
          );
        })}
      </ul>
    </>
  );
}
