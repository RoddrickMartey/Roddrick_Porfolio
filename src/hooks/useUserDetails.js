import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as UserDetailsAPI from "@/api/userDetailsApi";

const USER_DETAILS_KEY = ["user-details"];

export function useUserDetails(options = {}) {
  return useQuery({
    queryKey: USER_DETAILS_KEY,
    queryFn: UserDetailsAPI.getUserDetails,
    ...options,
  });
}

export function useSaveUserDetails() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: UserDetailsAPI.saveUserDetails,
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data) => {
      // data.profile if controller returns { profile: ... }
      qc.invalidateQueries(USER_DETAILS_KEY);
    },
  });
}

export function usePatchUserDetails() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: UserDetailsAPI.patchUserDetails,
    onSuccess: () => {
      qc.invalidateQueries(USER_DETAILS_KEY);
    },
  });
}
