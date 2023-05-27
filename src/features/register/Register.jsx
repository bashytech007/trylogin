import React from "react";
import { Form, ErrorMessage, Field, useFormik, Formik,touched } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateVal } from "./slice";
import { useDebouncedCallback } from "use-debounce";
import { debounce } from "lodash";
import "rsuite/dist/rsuite.min.css";

import { Button, Input } from "rsuite";

import * as Yup from "yup";

const doWeHaveTheUser = (resolve, inputValue) => {
  fetch("http://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      const user = data.find(({ username }) => username === inputValue);
      resolve(user ? false : true);
    });
};

const doWeHaveTheUserDebounced = debounce(doWeHaveTheUser, 250);

const validate = (values) => {
  //values.name values.email values.channel
  //errors.name errors.email errors.channel
  //erros.name ='This field is required
  let errors = {};

  if (!values.firstname) {
    errors.name = "Required";
  }
  if (!values.lastname) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};
const onSubmit = (values) => {
  console.log("Form data", values);
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("password must match password confirm"),

  passwordConfirm: Yup
    .string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),

  username: Yup
    .string()
    .test("username", "We have this username", (inputValue) => {
      return new Promise((resolve) =>
        doWeHaveTheUserDebounced(resolve, inputValue)
      );
    }),
});

const selectEmail = (state) => state.register.email;
const selectPassword = (state) => state.register.password;

const Register = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  // console.log("Form values", formik.values);
  console.log({ email, password });

  const updateStore = useDebouncedCallback((key, val) => {
    dispatch(updateVal({ key, val }));
  }, 2500);

  return (
    <div className="w-full h-screen grid grid-cols-2 lg:grid-cols-2 ">
      <div className=" bg-gradient-to-b from-pink-300 via-purple-500 to-blue-600 w-full h-full px-8 py-4 flex flex-col items-center justify-center gap-3 text-white">
        <h1 className="text-3xl">
          Discover a community of developers and creatives
        </h1>
        <p className="text-xl">
          Be a part of a community of developers,share thier spaces network and
          meet mentores and mentees
        </p>
      </div>
      {/* <h2 className="text-black">Where is formik</h2> */}

      <Formik
        // validateOnChange={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onsubmit}
      >
        {({
          handleChange,
          isValid,

          handleSubmit,
          validate,
          errors,
          touched,
          values,
          handleBlur,
        }) => (
          <Form
            onSubmit={formik.handleSubmit}
            className="w-full mx-auto px-14 py-32 -mt-24"
          >
            <h1 className="text-2xl -mt-8">Create new account</h1>
            <p className="font-bold">A place to connect and work from home</p>
            <div className="mb-8">
              <p className="text-2xl ">Email Address</p>
            </div>
            <label htmlFor="email" className="">
              Email
            </label>
            <div>
              <Input
                type="email"
                name="email"
                id="email"
                className="mt-8 block border border-t-0  w-[19rem] focus:outline-none  border-x-0   border-b-2"
                placeholder="email"
                // onChange={(val, event) => {
                //   formik.handleChange(event)
                //   updateVal("email", val)
                // }}

                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="errors">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="flex items-center gap-4 justify-between mt-8 mb-4">
              <div className="block w-full">
                <div className="items-center gap-2">
                  <label htmlFor="firstname" className="">
                    First name
                  </label>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="firstname"
                    className="block border border-t-0  w-[16rem] focus:outline-none  border-x-0   border-b-2 "
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <div className="errors">{formik.errors.firstname}</div>
                  ) : null}
                </div>
              </div>

              <div className="block w-full">
                <div className="items-center gap-2">
                  <label htmlFor="lastname">last name</label>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="lastname"
                    className="border w-[16rem] border-t-0 focus:outline-none border-x-0 border-b-2"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="error">{formik.errors.lastname}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mb-8 w-full">
              <label className="">Password</label>
              <Input
                type="password"
                name="password"
                className="border w-[32rem] border-t-0 focus:outline-none border-x-0 border-b-2"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="mb-8 w-full">
              <label className="">Password</label>

              <Input
                type="password"
                name="passwordConfirm"
                className="border w-[32rem] border-t-0 focus:outline-none border-x-0 border-b-2"
                placeholder="password confirm"
                value={formik.values.passwordConfirm}
                onChange={formik.values.handleChange}
                onBlur={formik.values.handleBlur}
              />
              {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm ? (
                <div className="errors">{formik.errors.passwordConfirm}</div>
              ) : null}
            </div>

            <ul type="list-disc" className="mb-4">
              <li>
                Password must contain an uppercase letter numeric or special
                character
              </li>
              <li>Password must be at least 8 character long</li>
            </ul>
            <Button
              type="submit"
              disabled={!isValid}
              className="w-full px-2 py-2 bg-gray-400  hover:bg-blue-500"
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
