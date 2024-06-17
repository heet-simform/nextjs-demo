"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/redux/hooks";
import { useAppSelector } from "@/redux/hooks";
import { updateUserDetails } from "@/redux/users/userReducer";
import AuthenticationWrapper from "@/HOC/AuthenticationWrapper";

type LoginFormVariables = {
  username: string;
};

function Login() {
  const router = useRouter();
  const initalFormvariables: LoginFormVariables = {
    username: "",
  };
  const dispatch = useAppDispatch();

  const submitFormhandler = (
    values: LoginFormVariables,
    { resetForm }: { resetForm: () => void }
  ) => {
    const userRecords = JSON.parse(localStorage.getItem("userRecords") || "[]");
    const userDetails = {
      id: uuidv4(),
      username: values.username,
    };
    const userList = [...userRecords, userDetails];
    const userListString = JSON.stringify(userList);
    localStorage.setItem("userRecords", userListString);
    localStorage.setItem("currentUser", JSON.stringify(userDetails));
    dispatch(updateUserDetails(userDetails));
    router.push("/blog");
    resetForm();
  };

  const validateHandler = (values: LoginFormVariables) => {
    let error: Partial<LoginFormVariables> = {};

    if (!values.username) {
      error.username = "user name is required.";
    }

    return error;
  };

  return (
    <div className="bg-gray-900">
      <div className="container">
        <Formik
          initialValues={initalFormvariables}
          onSubmit={submitFormhandler}
          validate={validateHandler}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ errors }) => (
            <Form>
              <div className="h-screen flex justify-center items-center">
                <div className="w-1/4">
                  <h1 className="text-center text-3xl text-white py-4">
                    Sign Up
                  </h1>
                  <div className="flex flex-col">
                    <label
                      htmlFor="username"
                      className="font-medium text-sm leading-6 text-white font-muli"
                    >
                      User Name <sup className="text-red-900 text-sm">*</sup>
                    </label>
                    <Field
                      placeholder="enter user name"
                      type="text"
                      name="username"
                      className="border-0 outline-0 border-gray-400 bg-gray-700 rounded-md p-1 mt-2 text-white focus:ring-2 focus:ring-indigo-500 placeholder:text-sm placeholder:pl-1"
                    />
                    {errors?.username && (
                      <p className="text-red-700 text-sm mt-2">
                        {errors.username}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="text-white w-full inline-block bg-blue-700 rounded-md mt-4 p-1 hover:bg-blue-500"
                  >
                    sign up
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AuthenticationWrapper(Login);
