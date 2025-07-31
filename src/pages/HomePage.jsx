import ImageShowcase from "@/components/ImageShowcase";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function HomePage() {
  const { data } = useUserDetailsStore();
  const navigate = useNavigate();

  return (
<section className="flex flex-col-reverse items-center justify-center min-h-screen gap-10 p-6 text-center md:flex-col md:p-10 lg:flex-row lg:text-left">
  {/* Info Block */}
  <div className="max-w-xl space-y-4">
    <h1 className="text-3xl font-bold sm:text-4xl text-foreground">
      {data.fullName || "Your Full Name"}
    </h1>
    <p className="text-lg sm:text-xl text-muted-foreground">
      {data.headline || "Your professional headline or role"}
    </p>
    <p className="text-base sm:text-lg text-foreground/80">
      Building delightful web & mobile experiences, blending my love for
      fruits, cakes, and nature with clean, efficient tech solutions.
    </p>

    {/* Buttons */}
    <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
      <Button onClick={() => navigate("/contact")}>Contact Me</Button>
      <Button variant="outline" onClick={() => navigate("/projects")}>
        View Projects
      </Button>
    </div>
  </div>

  {/* Image Showcase */}
  <div className="w-full max-w-sm sm:max-w-md lg:max-w-md">
    <ImageShowcase src={data.homeImage} caption="Hi there!!!" />
  </div>
</section>

  );
}

export default HomePage;
