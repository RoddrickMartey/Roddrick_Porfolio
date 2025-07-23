import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logoutSuccess } from "@/store/authSlice";
import * as AuthAPI from "@/api/authApi";

export function useAuth() {
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const login = async (username, password) => {
    const res = await AuthAPI.login({ username, password });
    // server returns { message, username } – if you also return user id, capture it
    dispatch(loginSuccess({ username: res.username, id: res.id || null }));
    return res;
  };

  const signup = async (username, password, resetPasswordSecret) => {
    const res = await AuthAPI.signup({
      username,
      password,
      resetPasswordSecret,
    });
    // optionally auto-login afterward
    return res;
  };

  const logout = async () => {
    await AuthAPI.logout();
    dispatch(logoutSuccess());
  };

  return { user, isAuthenticated, login, logout, signup };
}
