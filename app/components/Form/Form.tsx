import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Text from "./FormFields/Text";
import Grid from "@material-ui/core/Grid";
import { useUsers } from "../../hooks/useUsers";

const validationSchema = yup.object({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone is required"),
  car: yup.string().required("Car is required"),
  close_person: yup.string().required("Close person phone is required"),
});

export default function Form({
  newUser,
  id = 0,
  addUser,
  updateUser,
}: {
  newUser: boolean;
  id?: number;
  addUser?: (values: any) => void;
  updateUser?: (values: any) => void;
}) {
  const { getUserById } = useUsers();

  const userData = getUserById(id);

  const formik = useFormik({
    initialValues:
      userData && !newUser
        ? userData
        : {
            id: 1,
            first_name: "",
            last_name: "",
            email: "",
            gender: "",
            address: "",
            phone: "",
            car: "",
            close_person: "",
          },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (newUser && addUser) {
        addUser(values);
      } else if (updateUser) {
        console.log("onSubmit values", values);
        updateUser(values);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Text
              id="first_name"
              type="text"
              label="First Name"
              testId="first_name"
              value={formik.values.first_name}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              errorMessage={formik.errors.first_name}
            />
            <Text
              id="last_name"
              type="text"
              label="Last Name"
              testId="last_name"
              value={formik.values.last_name}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              errorMessage={formik.errors.last_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Text
              id="email"
              type="email"
              label="Email"
              testId="email"
              value={formik.values.email}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={formik.errors.email}
            />
            <Text
              id="gender"
              type="text"
              label="Gender"
              testId="gender"
              value={formik.values.gender}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              errorMessage={formik.errors.gender}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Text
              id="address"
              type="text"
              label="Address"
              testId="address"
              value={formik.values.address}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              errorMessage={formik.errors.address}
            />
            <Text
              id="phone"
              type="text"
              label="Phone"
              testId="phone"
              value={formik.values.phone}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              errorMessage={formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Text
              id="car"
              type="text"
              label="Car"
              testId="car"
              value={formik.values.car}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.car && Boolean(formik.errors.car)}
              errorMessage={formik.errors.car}
            />
            <Text
              id="close_person"
              type="text"
              label="Close Person"
              testId="close_person"
              value={formik.values.close_person}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={
                formik.touched.close_person &&
                Boolean(formik.errors.close_person)
              }
              errorMessage={formik.errors.close_person}
            />
          </Grid>
        </Grid>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          style={{ marginTop: 40 }}
          data-testid="submit"
        >
          {newUser ? "Save User" : "Update User"}
        </Button>
      </form>
    </div>
  );
}
