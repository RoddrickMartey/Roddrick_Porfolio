import { Route, Routes } from "react-router";
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/HomePage";
import AdminUpdateUsername from "./pages/Auth/AdminUpdateUsername";
import AdminUpdatePassword from "./pages/Auth/AdminUpdatePassword";
import AdminDisplayProjects from "./pages/Auth/AdminDisplayProjects";
import AdminAddProject from "./pages/Auth/AdminAddProject";
import AdminEditProject from "./pages/Auth/AdminEditProject";
import AdminUpdateUserDetails from "./pages/Auth/AdminUpdateUserDetails";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/admin/details" element={<AdminUpdateUserDetails />} />
        <Route path="/admin/edit/username" element={<AdminUpdateUsername />} />
        <Route path="/admin/edit/password" element={<AdminUpdatePassword />} />
        <Route path="/admin/projects" element={<AdminDisplayProjects />} />
        <Route path="/admin/add-project" element={<AdminAddProject />} />
        <Route
          path="/admin/edit-project/:slug"
          element={<AdminEditProject />}
        />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
