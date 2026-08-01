import { Suspense } from "react";
import css from "./usersLayout.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function UsersLayout({ children, sidebar }: Props) {
  return (
    <div className={css.container}>
      <aside className={css.sidebarWrapper}>
        <Suspense fallback={<div>Loading sidebar...</div>}>{sidebar}</Suspense>
      </aside>

      <main className={css.contentWrapper}>{children}</main>
    </div>
  );
}
