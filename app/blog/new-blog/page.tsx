"use client";

import { Formik, Form, Field } from "formik";
import AuthenticationWrapper from "@/HOC/AuthenticationWrapper";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { addBlogDetails } from "@/redux/blogs/blogReducer";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CreateBlog() {
  type blogInputFormVariables = {
    title: string;
    description: string;
    fileData: File | null;
  };

  const initialVariables: blogInputFormVariables = {
    title: "",
    description: "",
    fileData: null,
  };

  const userData = useAppSelector((state) => state.users);

  const dispatch = useDispatch();

  const router = useRouter();

  const submitForm = async (values: blogInputFormVariables) => {
    const blogDetails = {
      title: values.title,
      description: values.description,
      image: values.fileData ? URL.createObjectURL(values.fileData) : null,
      id: userData.id,
      blogId: v4(),
    };
    const BlogData = JSON.parse(localStorage.getItem("blogs") || "[]");
    const updateBlogData = [...BlogData, blogDetails];
    localStorage.setItem("blogs", JSON.stringify(updateBlogData));
    await dispatch(addBlogDetails(blogDetails));
    router.push("/blog");
  };
  return (
    <div className="bg-gray-900 h-screen">
      <div className="container ">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="w-1/3">
            <h1 className="text-3xl text-white">create a blog...</h1>

            <Formik initialValues={initialVariables} onSubmit={submitForm}>
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="mt-4 flex flex-col">
                    <label
                      htmlFor="title"
                      className="font-medium text-sm leading-6 text-white font-muli"
                    >
                      Title <sup className="text-red-900 text-sm">*</sup>
                    </label>
                    <Field
                      name="title"
                      as="input"
                      className="border-0 outline-0 border-gray-400 bg-gray-700 rounded-md p-1 mt-2 text-white focus:ring-2 focus:ring-indigo-500 placeholder:text-sm placeholder:pl-1"
                    />
                  </div>
                  <div className="mt-4 flex flex-col">
                    <label
                      htmlFor="description"
                      className="font-medium text-sm leading-6 text-white font-muli"
                    >
                      Description <sup className="text-red-900 text-sm">*</sup>
                    </label>
                    <Field
                      name="description"
                      as="textarea"
                      className="border-0 outline-0 border-gray-400 bg-gray-700 rounded-md p-1 mt-2 text-white focus:ring-2 focus:ring-indigo-500 placeholder:text-sm placeholder:pl-1"
                    />
                  </div>
                  {!values.fileData && (
                    <div className="mt-4 w-full flex justify-center rounded-lg border border-dashed border-white-900/25">
                      <div className="text-sm leading-6 text-gray-600 w-full">
                        <label
                          htmlFor="file-upload"
                          className="w-full relative inline-block cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 py-2"
                        >
                          <div className="flex">
                            <span className="material-icons text-white align-middle px-2">
                              cloud_upload
                            </span>
                            <div className="flex flex-col">
                              <p>Upload a file</p>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only inline-block w-full"
                                onChange={(e) => {
                                  setFieldValue(
                                    "fileData",
                                    e.target.files ? e.target.files[0] : null
                                  );
                                }}
                              />
                              <p className="text-xs leading-5 text-gray-600">
                                PNG, JPG
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {values.fileData && (
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                          }}
                          height={50}
                          width={50}
                          src={URL.createObjectURL(values.fileData)}
                          alt="blog-image"
                        />
                        <p className="text-clip text-white text-sm px-2">
                          {values.fileData?.name ?? ""}
                        </p>
                      </div>
                      <div>
                        <button onClick={() => setFieldValue("fileData", null)}>
                          <span className="material-icons text-red-500">
                            close
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="text-white text-center bg-gradient-to-r hover:bg-gradient-to-l from-purple-500 to-pink-500 inline-block  rounded-md  px-2 py-1 w-full mt-4"
                  >
                    publish blog
                  </button>
                  <span className="text-center text-white inline-block w-full py-4">
                    <span className="border border-white w-32 inline-block align-middle mr-2"></span>
                    or
                    <span className="border border-white w-32 inline-block align-middle ml-2"></span>
                  </span>
                  <Link
                    href="/blog"
                    className="text-white text-center bg-gradient-to-r hover:bg-gradient-to-l from-purple-500 to-pink-500 inline-block  rounded-md  px-2 py-1 w-full"
                  >
                    <span className="material-icons align-middle text-sm">
                      arrow_back
                    </span>{" "}
                    back to blogs
                  </Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationWrapper(CreateBlog);
