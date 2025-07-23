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
import { File } from "lucide-react";
import React, { useEffect, useState } from "react";
import DescriptionFieldArray from "@/components/DescriptionFieldArray";
import TechSelectField from "@/components/TechSelectField";
import ExtraTechFieldArray from "@/components/ExtraTechFieldArray";
import ProjectImageGalleryField from "@/components/ProjectImageGalleryField";
import ProjectSaveFooter from "@/components/ProjectSaveFooter";

function AdminAddProject() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: [], // <-- This will be updated by DescriptionFieldArray
    contentHtml: "",
    tech: [],
    extraTech: [],
    tags: [],
    image: "",
    gallery: [],
    repoUrl: "",
    liveUrl: "",
    featured: false,
    sortOrder: 0,
    status: "published",
  });

  const [loading, setLoading] = useState(false);

  const [techs, setTechs] = useState([]);

  useEffect(() => {
    const fetchTechs = async () => {
      const res = await api.get("/project/tech");
      setTechs(res.data);
    };

    fetchTechs();
  }, []);

  // Helper to update formData fields
  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="overflow-y-auto">
      <Label className="text-2xl mb-5 flex items-center gap-2">
        <File size={30} /> Add Project
      </Label>
      <div className="flex flex-col space-y-3 p-3">
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
      <ProjectSaveFooter
        loading={loading}
        setLoading={setLoading}
        formData={formData}
      />
    </section>
  );
}

export default AdminAddProject;
