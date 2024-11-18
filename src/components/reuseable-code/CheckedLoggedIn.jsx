import Cookies from "js-cookie";

//Check if cookies exist for user
export const checkUserLoggedIn = () => {
  return Cookies.get("user_session") !== undefined;
};
//Check if cookies exist for admin
export const checkAdminLoggedIn = () => {
  return Cookies.get("admin_session") !== undefined;
};
