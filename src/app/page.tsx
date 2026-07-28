import Link from "next/link";
import css from "./page.module.css"; // або твої стилі

export default function HomePage() {
  return (
    <main
      className={css.container}
      style={{ textAlign: "center", padding: "60px 20px" }}
    >
      <h1 style={{ fontSize: "36px", marginBottom: "16px" }}>
        Welcome to Admin Panel
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Manage your users, check profiles, and filter data effortlessly.
      </p>

      <Link
        href="/users"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Go to Users Directory
      </Link>
    </main>
  );
}
