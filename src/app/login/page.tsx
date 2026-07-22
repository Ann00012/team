"use client";
import { useMutation } from "@tanstack/react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginUser } from "@/services/api";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/services/useAuthStore";

const validation = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be longer")
    .max(60, "Username must be shoter")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be longer than 8 charatres")
    .max(70, "Password must be shoter")
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
      <Form>
        <div>
          <Field name="username" placeholder="Username" id="userName" />
          <ErrorMessage
            name="username"
            component="div"
            style={{ color: "red" }}
          />
        </div>

        <div>
          <Field
            name="password"
            placeholder="Password"
            id="userPassword"
            type="password"
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />
        </div>
        
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Loading..." : "Sign In"}
        </button>
      </Form>
    </Formik>
  )
};