"use client";
import Image from "next/image";
import css from "./page.module.css";
import { fetchUsers } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/UserCard/UserCard";

export default function Home() {
  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  }
  );
  return (
    <main className={ css.wrapper}>
      
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error {error?.message}</p>}
      {data && <UserCard users={ data} /> }
      </main>
  );
}
