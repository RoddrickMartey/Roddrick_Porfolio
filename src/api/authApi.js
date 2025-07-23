import api from "../lib/axios";

export const signup = (payload) =>
  api.post("/auth/signup", payload).then((r) => r.data);
export const login = (payload) =>
  api.post("/auth/login", payload).then((r) => r.data);
export const logout = () => api.post("/auth/logout").then((r) => r.data);
export const updatePassword = (payload) =>
  api.put("/auth/password", payload).then((r) => r.data);
export const updateUsername = (payload) =>
  api.put("/auth/username", payload).then((r) => r.data);
