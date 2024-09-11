import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserDetails } from "@/redux/users/userReducer";
import { useRouter, usePathname } from "next/navigation";
import { getBlogData } from "@/redux/blogs/blogReducer";

function AuthenticationWrapper<T extends object>(
  WrapperComponent: React.FC<T>
) {
  function WrappedComponent(props: T) {
    const router = useRouter();

    const pathname = usePathname();

    const userDataFromReduxStore = useAppSelector((state) => state.users);
    const blogDataFromReduxStore = useAppSelector((state) => state.blogs.blogs);

    const dispatch = useAppDispatch();

    useEffect(() => {
      const parseUsersDetailsFromLocalStorage = JSON.parse(
        localStorage?.getItem?.("currentUser") || "{}"
      );

      const parseBlogDetailsFromLocalStorage = JSON.parse(
        localStorage?.getItem?.("blogs") || "null"
      );

      // navigate to login page if user details is not available in the local storage.
      if (
        Object.keys(parseUsersDetailsFromLocalStorage).length === 0 ||
        !parseUsersDetailsFromLocalStorage.username
      ) {
        router.push("/");
        return;
      }
      // user details is available in the local storage but not in the redux store ,
      // if user has visited the login page then navigate to blog page,
      // otherwise redirect to the current pathname ,
      if (!userDataFromReduxStore?.username) {
        dispatch(updateUserDetails(parseUsersDetailsFromLocalStorage));
      }
      // blog details is available in the local storage but not in the redux store.
      if (
        Array.isArray(blogDataFromReduxStore) &&
        blogDataFromReduxStore.length === 0 &&
        parseBlogDetailsFromLocalStorage &&
        parseBlogDetailsFromLocalStorage?.length > 0
      ) {
        dispatch(getBlogData(parseBlogDetailsFromLocalStorage));
      }
      router.push(pathname === "/" ? "/blog" : pathname);
    }, [userDataFromReduxStore, pathname, router, blogDataFromReduxStore]);

    return <WrapperComponent {...props} />;
  }

  return WrappedComponent;
}

export default AuthenticationWrapper;
