import React from "react";
import { Formik, Form,ErrorMessage,Field,useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateVal } from "./slice";
import { useDebouncedCallback } from "use-debounce";
import { debounce } from "lodash";
// import "rsuite/dist/rsuite.min.css";

import {
  Container,
  FlexboxGrid,
  Button,
  Input,
  Tooltip,
  Whisper,
} from "rsuite";

import * as yup from "yup";

const doWeHaveTheUser = (resolve, inputValue) => {
  fetch("http://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      const user = data.find(({ username }) => username === inputValue);
      resolve(user ? false : true);
    });
};

const doWeHaveTheUserDebounced = debounce(doWeHaveTheUser, 250);

// const validate = (values) => {
//   //values.name values.email values.channel
//   //errors.name errors.email errors.channel
//   //erros.name ='This field is required
//   let errors = {};

//   if (!values.firstname) {
//     errors.name = "Required";
//   }
//   if (!values.lastname) {
//     errors.name = "Required";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   }
//   if (!values.password) {
//     errors.password = "Required";
//   }
//   return errors;
// };
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};
const onSubmit=(values)=>{
  console.log("Form data",values)
}
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Required"),
  password: yup.string().required("password must match password confirm"),

  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),

  username: yup
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
            Be a part of a community of developers,share thier spaces network
            and meet mentores and mentees
          </p>
        </div>
        {/* <h2 className="text-black">Where is formik</h2> */}
       
          
          <Formik
            // validateOnChange={false}
            initialValues={initialValues}
            schema={schema}
            onSubmit={onSubmit}
          >
            {({
              handleChange,
              isValid,

              handleSubmit,
              handleBlur,
              values,
              
              
            }) => {
              <div>

              <Form
                onSubmit={handleSubmit}
                className="w-full mx-auto px-14 py-32"
              >
                <h1 className="text-2xl">Create new account</h1>
                <p className="font-bold">
                  A place to connect and work from home
                </p>
                <div className="mb-8">
                      <p className="text-2xl mb-6">Email Address</p>
                    </div>
                    <label htmlFor="email" className="">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-8"
                      placeholder="email"
                      onChange={(val, event) => {
                        handleChange(event);
                        updateVal("email", val);
                      }}
                      // onChange={formik.handleChange}

                      value={values.email}
                      onBlur={Formik.handleBlur}
                    />
                    <ErrorMessage />

                    <div className="flex items-center justify-between mt-8 mb-4">
                      <div className="flex flex-col items-center  justify-between w-full ">
                        <label htmlFor="firstname" className="">
                          First name
                        </label>
                        <Input
                          type="text"
                          id="firstname"
                          name="firstname"
                          placeholder="firstname"
                          className="block border border-t-0  w-[19rem] focus:outline-none  border-x-0   border-b-2 "
                          onChange={(val, event) => {
                            handleChange(event);
                            updateVal("firstname", val);
                          }}
                          value={values.firstname}
                        />
                        <ErrorMessage />
                      </div>

                      <div className="block w-full">
                        <div className="items-center gap-2">
                          <label htmlFor="lastname">last name</label>
                          <Input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="lastname"
                            className="border w-[19rem] border-t-0 focus:outline-none border-x-0 border-b-2"
                            onChange={(val, event) => {
                              handleChange(event);
                              updateVal("lastname", val);
                            }}
                            value={values.lastname}
                          />
                          <ErrorMessage />
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
                        onChange={(val, event) => {
                          handleChange(event);
                          updateVal("password", val);
                        }}
                        value={values.password}
                      />
                      <ErrorMessage />
                    </div>

                    <div className="mb-8 w-full">
                      <label className="">Password</label>

                      <Input
                        type="password"
                        name="passwordConfirm"
                        className="border w-[32rem] border-t-0 focus:outline-none border-x-0 border-b-2"
                        placeholder="password confirm"
                        onChange={(val, event) => {
                          handleChange(event);
                          updateVal("passwordConfirm", val);
                        }}
                        // onChange={formik.handleChange}

                        value={values.passwordConfirm}
                      />
                      <ErrorMessage />
                    </div>

                    <ul type="list-disc" className="mb-4">
                      <li>
                        Password must contain an uppercase letter numeric or
                        special character
                      </li>
                      <li>Password must be at least 8 character long</li>
                    </ul>
                    <Button
                      type="submit"
                      disabled={!isValid}
                      className="w-full px-4 py-4 hover:bg-blue-500"
                    >
                      Continue
                    </Button>
              </Form>
              
             
         </div>
            }}
          </Formik>
       
        
      </div>
    );
  };

export default Register;