import React from "react";
import { useAllProjects } from "@/hooks/useProjects";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Laptop, FolderOpen, AlertTriangle } from "lucide-react";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='400' viewBox='0 0 640 400'%3E%3Crect width='100%25' height='100%25' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

function ProjectCard({ project }) {
  const { title, summary, image } = project || {};
  const cover = image || PLACEHOLDER_IMG;

  return (
    <Card className="overflow-hidden transition hover:shadow-md">
      <img
        src={cover}
        alt={title || "Project cover"}
        className="w-full h-auto object-cover"
        onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
      />
      <CardHeader>
        <CardTitle>{title || "Untitled Project"}</CardTitle>
        <CardDescription>{summary || "No summary provided."}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button size="sm">Click for Details</Button>
      </CardContent>
    </Card>
  );
}

function AdminDisplayProjects({ onSelect }) {
  const { data, isError, isLoading, error, refetch } = useAllProjects();

  if (isLoading) return <Loading />;

  if (isError) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to load projects.";
    return (
      <div className="p-4">
        <Error message={msg} />
        <div className="mt-4 flex justify-center">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => refetch?.()}
            className="flex items-center gap-1"
          >
            <AlertTriangle className="w-4 h-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  let projects = [];
  let total = 0;

  if (Array.isArray(data)) {
    projects = data;
    total = data.length;
  } else if (data) {
    if (Array.isArray(data.projects)) {
      projects = data.projects;
      total = data.total ?? data.projects.length;
    } else if (Array.isArray(data.data)) {
      projects = data.data;
      total = data.total ?? data.data.length;
    }
  }

  return (
    <section className="p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Laptop className="w-5 h-5 text-primary" />
          Projects ({total})
        </h1>
      </header>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center border rounded-lg">
          <FolderOpen className="w-12 h-12 mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No projects available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p._id || p.slug}
              onClick={onSelect ? () => onSelect(p) : undefined}
              className={onSelect ? "cursor-pointer" : ""}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminDisplayProjects;
