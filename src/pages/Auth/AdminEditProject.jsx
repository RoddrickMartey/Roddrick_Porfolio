import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import api from "@/lib/axios";
import { File, AlertTriangle } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import DescriptionFieldArray from "@/components/DescriptionFieldArray";
import TechSelectField from "@/components/TechSelectField";
import ExtraTechFieldArray from "@/components/ExtraTechFieldArray";
import ProjectImageGalleryField from "@/components/ProjectImageGalleryField";
import ProjectSaveFooter from "@/components/ProjectSaveFooter";
import { useProject } from "@/hooks/useProjects";
import { useParams } from "react-router";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Button } from "@/components/ui/button";
import ProjectEditSaveFooter from "@/components/ProjectEditSaveFooter";

function AdminEditProject() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: [],
    contentHtml: "",
    tech: [],
    extraTech: [],
    image: "",
    gallery: [],
    repoUrl: "",
    liveUrl: "",
    featured: false,
    status: "published",
  });

  const hydratedIdRef = useRef(null);
  const { slug } = useParams();
  const [techs, setTechs] = useState([]);
  const { data, isError, error, isLoading, refetch } = useProject(slug);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);

  // Fetch techs
  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const res1 = await api.get("/project/tech");
        setTechs(res1.data);
      } catch (err) {
        console.error("Failed to fetch techs", err);
      }
    };
    fetchTechs();
  }, []);

  // Reset hydration reference when slug changes
  useEffect(() => {
    hydratedIdRef.current = null;
  }, [slug]);

  // Populate formData from API data (only once per project)
  useEffect(() => {
    if (!data) return;

    const currentId = data._id ?? slug;
    if (hydratedIdRef.current === currentId) return;

    const next = {
      title: data.title ?? "",
      summary: data.summary ?? "",
      description: Array.isArray(data.description) ? data.description : [],
      contentHtml: data.contentHtml ?? "",
      tech: Array.isArray(data.tech)
        ? data.tech.map((t) => (typeof t === "string" ? t : t._id))
        : [],
      extraTech: Array.isArray(data.extraTech) ? data.extraTech : [],
      image: data.image ?? "",
      gallery: Array.isArray(data.gallery) ? data.gallery : [],
      repoUrl: data.repoUrl ?? "",
      liveUrl: data.liveUrl ?? "",
      featured: Boolean(data.featured),
      status: data.status ?? "draft",
    };

    setFormData(next);
    setId(data._id);
    hydratedIdRef.current = currentId;
  }, [data, slug]);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Now handle loading and error states AFTER hooks
  if (isLoading) return <Loading />;

  if (isError) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to load projects.";
    return (
      <div className="p-4">
        <Error message={msg} />
        <div className="flex justify-center mt-4">
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

  return (
    <section className="overflow-y-auto">
      <Label className="flex items-center gap-2 mb-5 text-2xl">
        <File size={30} /> Add Project
      </Label>
      <div className="flex flex-col p-3 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-base">Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Label className="text-base">Summary</Label>
          <Input
            value={formData.summary}
            onChange={(e) => updateField("summary", e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Content HTML */}
        <div className="space-y-2">
          <Label className="text-base">Content Html</Label>
          <Input
            value={formData.contentHtml}
            onChange={(e) => updateField("contentHtml", e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Repo URL */}
        <div className="space-y-2">
          <Label className="text-base">Repo Url</Label>
          <Input
            value={formData.repoUrl}
            onChange={(e) => updateField("repoUrl", e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Live URL */}
        <div className="space-y-2">
          <Label className="text-base">Live Url</Label>
          <Input
            value={formData.liveUrl}
            onChange={(e) => updateField("liveUrl", e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, featured: checked }))
            }
            disabled={loading}
          />
          <Label htmlFor="featured" className="text-base">
            Featured
          </Label>
        </div>

        <div className="space-y-2">
          <Label className="text-base">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description Field Array */}
        <DescriptionFieldArray
          value={formData.description}
          onChange={(val) => updateField("description", val)}
          disabled={loading}
        />
        {techs.length > 0 && (
          <TechSelectField
            options={techs}
            value={formData.tech}
            onChange={(ids) => updateField("tech", ids)}
            disabled={loading}
          />
        )}
        <ExtraTechFieldArray
          value={formData.extraTech}
          onChange={(val) => updateField("extraTech", val)}
          disabled={loading}
        />

        <ProjectImageGalleryField
          image={formData.image}
          gallery={formData.gallery}
          onChange={(val) =>
            setFormData((prev) => ({
              ...prev,
              image: val.image,
              gallery: val.gallery,
            }))
          }
          disabled={loading}
        />
      </div>
      <ProjectEditSaveFooter
        id={id}
        formData={formData}
        loading={loading}
        setLoading={setLoading}
      />
    </section>
  );
}

export default AdminEditProject;
