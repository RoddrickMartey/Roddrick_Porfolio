import { Outlet } from "react-router";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import Header from "@/components/Header";

export default function PublicLayout() {
  const { isError, isLoading, error } = useUserDetailsStore();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const msg =
      error?.response?.data?.message ||
      "Failed to load . Check internet conection or Reload";
    return <Error message={msg} />;
  }
  return (
    <>
      {/* Public Navbar */}
      <Header />
      <Outlet />
    </>
  );
}
