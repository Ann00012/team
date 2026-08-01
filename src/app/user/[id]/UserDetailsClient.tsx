"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  fetchSingleUser,
  fetchUserTodos,
  fetchUserPosts,
} from "@/services/api";
import Loader from "@/app/loader";
import css from "./UserDetailt.module.css";
import UpdateUsera from "@/components/UpdateUser/UpdateUser";

export default function UserDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchSingleUser(id),
    refetchOnMount: false,
  });

  const {
    data: todosData,
    error: todosError,
    isError: isTodosError,
    isLoading: todosLoading,
  } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchUserTodos(id),
  });

  const { data: postsData } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchUserPosts(id),
  });

  return (
    <div className={css.wrapper}>
      {isLoading && <Loader />}
      {isError && <p>Error {error?.message}</p>}

      {data && (
        <div className={css.container}>
          <Image
            src={data.image}
            alt={data.lastName}
            width="140"
            height="140"
            className={css.avatar}
          />
          <p className={css.userName}>
            {data.firstName} {data.lastName}
          </p>
          <a className={css.email} href={`mailto:${data.email}`}>
            {data.email}
          </a>
          <a className={css.phone} href={`tel:${data.phone}`}>
            {data.phone}
          </a>
          <p className={css.email}>Age:{data.age}</p>
          <p className={css.role}>Role: {data.role}</p>
          <button className={css.editBtn} onClick={() => setIsModalOpen(true)}>
            Edit Profile
          </button>
          <button className={css.backBtn} onClick={() => router.push("/")}>
            Back to Directory
          </button>
        </div>
      )}

      {isModalOpen && data && (
        <div className={css.modalOverlay}>
          <div className={css.modalContent}>
            <button onClick={() => setIsModalOpen(false)}>✕</button>

            <UpdateUsera user={data} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
      <div className={css.mainContent}>
        <div className={css.tabsContainer}>
          <button
            className={`${css.tab} ${activeTab === "posts" ? css.active : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={`${css.tab} ${activeTab === "todos" ? css.active : ""}`}
            onClick={() => setActiveTab("todos")}
          >
            Todos
          </button>
        </div>

        <div className={css.contentArea}>
          {activeTab === "posts" && (
            <>
              <h2 className={css.todosTitle}>User Posts</h2>
              <ul className={css.postList}>
                {postsData?.posts.map((post) => (
                  <li key={post.id} className={css.postCard}>
                    <h3 className={css.postTitle}>{post.title}</h3>
                    <p className={css.postBody}>{post.body}</p>

                    <div className={css.postTags}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={css.tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className={css.postFooter}>
                      <span>👁️ {post.views} views</span>
                      <span>❤️ {post.reactions?.likes || 0} likes</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {activeTab === "todos" && (
            <>
              <h2 className={css.todosTitle}>User Todos</h2>
              {todosLoading && <Loader />}
              {isTodosError && <p>Error {todosError?.message}</p>}
              {todosData?.todos?.length === 0 && (
                <p className={css.noTodos}>No todos</p>
              )}

              <ul className={css.todoList}>
                {todosData?.todos?.map((todo) => (
                  <li key={todo.id} className={css.todoItem}>
                    <input type="checkbox" checked={todo.completed} readOnly />
                    <span>{todo.todo}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
