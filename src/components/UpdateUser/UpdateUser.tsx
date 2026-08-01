import { updateUser } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, FormikHelpers, Field } from "formik";
import css from "./UpdateUser.module.css";



interface FormValues {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

type UpdateUserProps ={
  user?: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  onClose?: () => void;
}

const validation = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be longer")
    .max(70, "Username must be shotter")
    .required("Required"),
  firstName: Yup.string()
    .min(3, "FirstName must be longer")
    .max(70, "firstName must be shotter")
    .required("Required"),
  lastName: Yup.string()
    .min(3, "lastName must be longer")
    .max(70, "lastName must be shotter")
    .required("Required"),
  role: Yup.string()
    .min(3, "role must be longer")
    .max(70, "role must be shotter")
    .required("Required"),
});

export default function UpdateUsera({ user, onClose }: UpdateUserProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      updateUser(
        user.id,
        values.username,
        values.firstName,
        values.lastName,
        values.role,
      ),
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["users"] }),
        toast.success("Update user!"));
      if (onClose) onClose();
    },
    onError: () => {
      toast.error("Error");
    },
  });

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={{
        username: user?.username || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        role: user?.role || "",
      }}
      validationSchema={validation}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className={css.form}>
        <h2 className={css.title}>Edit User</h2>
        <div className={css.fieldGroup}>
          <label htmlFor="username">UserName</label>
          <Field name="username" id="username" className={css.input} />
          <ErrorMessage name="username" component="p" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="firstName">FirstName</label>
          <Field name="firstName" id="firstName" className={css.input} />
          <ErrorMessage name="firstName" component="p" className={css.error} />
        </div>
        <div className={css.fieldGroup}>
          <label htmlFor="lastName">LastName</label>
          <Field name="lastName" id="lastName" className={css.input} />
          <ErrorMessage name="lastName" component="p" className={css.error} />
        </div>
        <div className={css.fieldGroup}>
          <label htmlFor="role">Role</label>
          <Field name="role" id="role" className={css.input} />
          <ErrorMessage name="role" component="p" className={css.error} />
        </div>
        <button type="submit" disabled={mutation.isPending} className={css.btn}>
          {mutation.isPending ? "Updating..." : "Update"}
        </button>
      </Form>
    </Formik>
  );
}
