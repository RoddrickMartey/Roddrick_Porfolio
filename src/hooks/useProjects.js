import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ProjectAPI from "@/api/projectApi";

const PROJECTS_KEY = (params = {}) => ["projects", params];
const PROJECT_KEY = (slug) => ["project", slug];

// Public / filtered
export function useProjects(params = {}, options = {}) {
  return useQuery({
    queryKey: PROJECTS_KEY(params),
    queryFn: () => ProjectAPI.listProjects(params),
    ...options,
  });
}

// Admin all
export function useAllProjects(options = {}) {
  return useQuery({
    queryKey: ["projects", "admin", "all"],
    queryFn: ProjectAPI.listAllProjects,
    ...options,
  });
}

// Single by slug
export function useProject(slug, options = {}) {
  return useQuery({
    queryKey: PROJECT_KEY(slug),
    queryFn: () => ProjectAPI.getProjectBySlug(slug),
    enabled: !!slug,
    ...options,
  });
}

/* ---------- Mutations ---------- */
export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ProjectAPI.createProject,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "admin", "all"] });
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => ProjectAPI.updateProject(id, data),
    // eslint-disable-next-line no-unused-vars
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "admin", "all"] });
      qc.invalidateQueries({ predicate: (q) => q.queryKey[0] === "project" }); // refresh any single project
    },
  });
}

export function usePatchProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => ProjectAPI.patchProject(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "admin", "all"] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => ProjectAPI.deleteProject(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "admin", "all"] });
    },
  });
}
