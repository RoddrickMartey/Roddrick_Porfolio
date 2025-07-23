import api from "../lib/axios";
const BASE = "/project";

export const listProjects = (params = {}) =>
  api.get(BASE, { params }).then((r) => r.data);
export const listAllProjects = () =>
  api.get(`${BASE}/admin/all`).then((r) => r.data);
export const getProjectBySlug = (slug) =>
  api.get(`${BASE}/${slug}`).then((r) => r.data);
export const createProject = (payload) =>
  api.post(BASE, payload).then((r) => r.data);
export const updateProject = (id, payload) =>
  api.put(`${BASE}/${id}`, payload).then((r) => r.data);
export const patchProject = (id, payload) =>
  api.patch(`${BASE}/${id}`, payload).then((r) => r.data);
export const deleteProject = (id) =>
  api.delete(`${BASE}/${id}`).then((r) => r.data);
