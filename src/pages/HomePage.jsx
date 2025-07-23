import ImageShowcase from "@/components/ImageShowcase";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function HomePage() {
  const { data } = useUserDetailsStore();
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center min-h-screen gap-10 p-6 text-center lg:flex-row md:flex-col md:p-20">
      {/* Image Showcase */}
      <ImageShowcase src={data.homeImage} caption="Hi there!!!" />

      {/* Info Block */}
      <div className="max-w-xl space-y-4">
        <h1 className="text-3xl font-bold md:text-4xl text-foreground">
          {data.fullName || "Your Full Name"}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          {data.headline || "Your professional headline or role"}
        </p>
        <p className="text-base md:text-lg text-foreground/80">
          Building delightful web & mobile experiences, blending my love for
          fruits, cakes, and nature with clean, efficient tech solutions.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={() => navigate("/contact")}>Contact Me</Button>
          <Button variant="outline" onClick={() => navigate("/projects")}>
            View Projects
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
