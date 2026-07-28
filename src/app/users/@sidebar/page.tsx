"use client";

import { useRouter, useSearchParams } from "next/navigation";
import css from "./page.module.css";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sortBy");
  const currentOrder = searchParams.get("order");

  const handleSort = (field: string) => {
    let newOrder = "asc";
    if (currentSort === field && currentOrder === "asc") {
      newOrder = "desc";
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", field);
    params.set("order", newOrder);

    router.push(`/users?${params.toString()}`);
  };

  const isActive = (field: string) => currentSort === field;

  return (
    <aside className={css.sidebar}>
      <h3 className={css.title}>Sorting Options</h3>
      <div className={css.btnGroup}>
        <button
          onClick={() => handleSort("firstName")}
          // Динамічно додаємо клас active, якщо це поле зараз вибране
          className={`${css.sortBtn} ${isActive("firstName") ? css.active : ""}`}
        >
          Sort by Name{" "}
          {isActive("firstName") && (currentOrder === "asc" ? "↑" : "↓")}
        </button>

        <button
          onClick={() => handleSort("age")}
          className={`${css.sortBtn} ${isActive("age") ? css.active : ""}`}
        >
          Sort by Age {isActive("age") && (currentOrder === "asc" ? "↑" : "↓")}
        </button>

        <button
          onClick={() => handleSort("email")}
          className={`${css.sortBtn} ${isActive("email") ? css.active : ""}`}
        >
          Sort by Email{" "}
          {isActive("email") && (currentOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>
    </aside>
  );
}
