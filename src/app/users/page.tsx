import { Suspense } from "react";
import UsersClient from "./usersClient";
import Loader from "../loader";

export default function UsersPage() {
  return (
    <Suspense fallback={<Loader />}>
      <UsersClient />
    </Suspense>
  );
}