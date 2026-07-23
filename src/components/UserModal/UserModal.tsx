import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewUser } from "@/services/api";
import { toast } from "react-toastify";
import css from "./UserModal.module.css";

const validation = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be longer")
    .max(60, "Username must be shorter")
    .required("Username is required"),

  lastName: Yup.string()
    .min(3, "Last name must be longer")
    .max(70, "Last name must be shorter")
    .required("Last name is required"),

  firstName: Yup.string()
    .min(3, "First name must be longer")
    .max(70, "First name must be shorter")
    .required("First name is required"),

  img: Yup.string(),

  role: Yup.string()
    .min(3, "Role must be longer")
    .max(70, "Role must be shorter"),
});

export default function UserModal() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: {
      username: string;
      lastName: string;
      firstName: string;
      img?: string;
      role?: string;
    }) =>
      addNewUser(
        values.username,
        values.lastName,
        values.firstName,
        values.img,
        values.role,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      toast.success("New user added");
    },

    onError: () => {
      toast.error("Error while adding user");
    },
  });

  return (
    <Formik
      initialValues={{
        username: "",
        firstName: "",
        lastName: "",
        img: "",
        role: "",
      }}
      onSubmit={mutation.mutate}
      validationSchema={validation}
    >
      <Form className={css.form}>
        <h2 className={css.title}>Add New User</h2>

        <div className={css.fieldGroup}>
          <label htmlFor="username">Username</label>

          <Field
            name="username"
            id="username"
            placeholder="Enter username"
            className={css.input}
          />

          <ErrorMessage name="username" component="p" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="firstName">First Name</label>

          <Field
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            className={css.input}
          />

          <ErrorMessage name="firstName" component="p" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="lastName">Last Name</label>

          <Field
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            className={css.input}
          />

          <ErrorMessage name="lastName" component="p" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="role">Role</label>

          <Field
            name="role"
            id="role"
            placeholder="Enter role"
            className={css.input}
          />

          <ErrorMessage name="role" component="p" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="img">Image URL</label>

          <Field
            name="img"
            id="img"
            placeholder="Enter image URL"
            className={css.input}
          />

          <ErrorMessage name="img" component="p" className={css.error} />
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Adding..." : "Add User"}
        </button>
      </Form>
    </Formik>
  );
}
