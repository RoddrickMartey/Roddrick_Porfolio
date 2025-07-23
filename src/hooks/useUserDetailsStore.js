// src/hooks/useUserDetailsStore.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetails, selectUserDetails } from "@/store/detailsSlice";
import { useUserDetails } from "@/hooks/useUserDetails";

export function useUserDetailsStore() {
  const dispatch = useDispatch();
  const cached = useSelector(selectUserDetails);
  const { data, isLoading, isError, error } = useUserDetails();

  // hydrate redux when fresh data arrives
  useEffect(() => {
    if (data) {
      const d = data?.profile ?? data;
      dispatch(setDetails(d));
    }
  }, [data, dispatch]);

  // Return the freshest data
  const resolvedData = cached || (data?.profile ?? data) || null;

  return { data: resolvedData, isLoading, isError, error };
}
