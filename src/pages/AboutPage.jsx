import ImageShowcase from "@/components/ImageShowcase";
import { Label } from "@/components/ui/label";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import React from "react";

function AboutPage() {
  const { data } = useUserDetailsStore();

  return (
    <section className="flex flex-col min-h-screen gap-10 p-6 pt-28 md:p-20">
      {/* Page Title */}
      <Label className="w-full font-serif text-3xl text-center text-primary">
        About Me
      </Label>

      {/* Top Section with Image and First Bio */}
      <div className="flex flex-col items-center justify-center w-full gap-10 md:flex-row md:items-start">
        <ImageShowcase
          src={data.aboutImage}
          caption="That's me"
          className="w-full max-w-[250px] rounded-md shadow-lg sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]"
        />
        <p className="max-w-2xl text-lg font-light leading-relaxed tracking-wide text-center text-foreground md:text-justify">
          {data.bio[0]}
        </p>
      </div>

      {/* Remaining Bio Paragraphs */}
      <div className="max-w-3xl mx-auto space-y-6 text-center md:text-left">
        {data.bio.slice(1).map((bio, index) => (
          <p
            key={index}
            className="text-lg font-light leading-relaxed tracking-wide text-muted-foreground"
          >
            {bio}
          </p>
        ))}
      </div>

      {/* Skills Section */}
      <div className="mt-10">
        <Label className="block mb-4 font-serif text-xl text-primary">
          Skills
        </Label>
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3 md:text-left">
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className="p-2 transition rounded-md bg-muted hover:bg-muted/80"
            >
              <p className="font-medium text-foreground">{skill}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="mt-10">
        <Label className="block mb-4 font-serif text-xl text-primary">
          Tech Stack
        </Label>
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 md:text-left">
          {data.techStack.map((tech, index) => (
            <div
              key={index}
              className="p-2 transition rounded-md bg-muted hover:bg-muted/80"
            >
              <p className="font-medium text-foreground">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
