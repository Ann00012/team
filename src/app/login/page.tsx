"use client";
import { useMutation } from "@tanstack/react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginUser } from "@/services/api";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/services/useAuthStore";
import css from "./login.module.css";

const validation = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be longer")
    .max(60, "Username must be shorter")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be longer than 8 characters")
    .max(70, "Password must be shorter")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: (values: { username: string; password: string }) =>
      loginUser(values.username, values.password),
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data));
      setUser(data);
      toast.success("Successfully login!");
      router.push("/");
    },
    onError: (error) => {
      toast.error(`Error ${error}`);
    },
  });

  return (
    <div className={css.container}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          mutation.mutate(values);
        }}
        validationSchema={validation}
      >
        <Form className={css.form}>
          <h2 className={css.title}>Sign In</h2>

          <div className={css.fieldGroup}>
            <label htmlFor="userName" className={css.label}>
              Username
            </label>
            <Field
              name="username"
              placeholder="Enter your username"
              id="userName"
              className={css.input}
            />
            <ErrorMessage
              name="username"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="userPassword" className={css.label}>
              Password
            </label>
            <Field
              name="password"
              placeholder="Enter your password"
              id="userPassword"
              type="password"
              className={css.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className={css.submitBtn}
          >
            {mutation.isPending ? "Loading..." : "Sign In"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
