"use client";
import Image from "next/image";
import css from "./page.module.css";
import { fetchUsers } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/UserCard/UserCard";
import Loader from "./loader";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Paginations from "@/components/Pagination/Pagination";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [debaunced] = useDebounce(text, 300);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", currentPage, debaunced],
    queryFn: () =>
      fetchUsers({
        page: currentPage,
        search: debaunced,
      }),
  });

  useEffect(() => {
    const savedText = localStorage.getItem("search");

    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("search", text);
  }, [text]);

  const handleChange = (newText: string) => {
    setText(newText);
    setCurrentPage(1);
  };

  const totalPages = data ? Math.ceil(data.total / 10) : 0;

  return (
    <main className={css.wrapper}>
      <div className={css.box}>
        <h2>User Directory</h2>
        <SearchBar text={text} handleChange={handleChange} />
      </div>
      {isLoading && (
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      )}
      {isError && <p>Error {error?.message}</p>}
      {data && <UserCard users={data.users} />}
      {data?.users?.length === 0 && (
        <p className={css.noMatches}>There are no matches.</p>
      )}
      {data && data.total > 0 && totalPages > 1 && (
        <Paginations
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}
