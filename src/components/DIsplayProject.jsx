import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

function DisplayProject({ project }) {
  const PLACEHOLDER_IMG =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='400' viewBox='0 0 640 400'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

  const gallery =
    project?.gallery?.length > 0 ? project.gallery : [PLACEHOLDER_IMG];
  const tech = Array.isArray(project?.tech) ? project.tech : [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Click for Details</Button>
      </DialogTrigger>
      <DialogContent className=" lg:w-6xl sm:w-full overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {project.summary}
          </DialogDescription>
        </DialogHeader>

        {/* Gallery Carousel */}
        {gallery.length > 1 && (
          <div className="flex items-center justify-center mt-4">
            <Carousel className="w-10/12 ">
              <CarouselContent>
                {gallery.map((g, idx) => (
                  <CarouselItem key={idx}>
                    <img
                      src={g}
                      alt={`Gallery image ${idx + 1}`}
                      className="w-full h-auto border rounded-md"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}

        {/* Description */}
        {project.description?.length > 0 && (
          <div className="mt-4 space-y-2">
            {project.description.map((line, idx) => (
              <p key={idx} className="text-sm text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {tech.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {tech.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center gap-2 px-3 py-2 border rounded-md"
                  style={{
                    backgroundColor: t.color ? `${t.color}20` : "transparent", // light tint
                  }}
                >
                  {t.icon && (
                    <img
                      src={t.icon}
                      alt={t.name}
                      className="w-5 h-5"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <span className="text-sm">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extra Details */}
        <div className="mt-6 space-y-1 text-sm text-muted-foreground">
          {project.createdAt && (
            <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
          )}
          {project.updatedAt && (
            <p>
              Last Updated: {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
        <DialogFooter>
          {/* Links */}
          {(project.repoUrl || project.liveUrl) && (
            <div className="flex gap-3 mt-4">
              {project.repoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repo
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="default" size="sm" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live
                  </a>
                </Button>
              )}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DisplayProject;
