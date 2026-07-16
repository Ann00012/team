"use client";
import Image from "next/image";
import css from "./page.module.css";
import { fetchUsers } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/UserCard/UserCard";
import Loader from "./loader";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useState } from "react";

export default function Home() {
  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  }
  );
  const [text, setText] = useState("");
  const handleChange = (newText: string) => {
    setText(newText);
    
  };

  const filterData = data?.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));

  return (
    <main className={ css.wrapper}>
      <SearchBar text={text } handleChange={handleChange} />
      {isLoading && <Loader/>}
      {isError && <p>Error {error?.message}</p>}
      {data && filterData && <UserCard users={filterData} />}
      {filterData?.length===0 && <p>There are no matches.</p> }
      </main>
  );
}
