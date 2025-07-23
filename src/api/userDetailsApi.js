import api from "../lib/axios";
export const getUserDetails = () =>
  api.get("/user-details").then((r) => r.data);
export const saveUserDetails = (payload) =>
  api.put("/user-details", payload).then((r) => r.data);
export const patchUserDetails = (payload) =>
  api.patch("/user-details", payload).then((r) => r.data);
