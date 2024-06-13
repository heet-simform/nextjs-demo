import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserDetails } from "@/redux/users/userReducer";
import { useRouter, usePathname } from "next/navigation";

function AuthenticationWrapper<T extends object>(
  WrapperComponent: React.FC<T>
) {
  function WrappedComponent(props: T) {
    const router = useRouter();

    const pathname = usePathname();

    const userDataFromReduxStore = useAppSelector((state) => state.users.users);

    const dispatch = useAppDispatch();

    const parseUsersDetailsFromLocalStorage = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    // navigate to login page if user details is not available in the local storage.
    if (
      Object.keys(parseUsersDetailsFromLocalStorage).length === 0 ||
      !parseUsersDetailsFromLocalStorage.username
    ) {
      router.push("/");
    }
    // user details is available in the local storage but not in the redux store ,
    // if user has visited the login page then navigate to blog page,
    // otherwise redirect to the current pathname ,
    else if (!userDataFromReduxStore.username) {
      dispatch(updateUserDetails(parseUsersDetailsFromLocalStorage));
      router.push(pathname === "/" ? "/blog" : pathname);
    }

    return <WrapperComponent {...props} />;
  }

  return WrappedComponent;
}

export default AuthenticationWrapper;
