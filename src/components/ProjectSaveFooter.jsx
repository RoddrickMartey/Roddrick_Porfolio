import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import api from "@/lib/axios";
import { validateProjectForm } from "@/validators/project";
import { useNavigate } from "react-router";

export default function ProjectSaveFooter({
  formData,
  loading,
  setLoading,
  endpoint = "/project",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // --------------------------
  // Transform -> clean payload
  // --------------------------
  const buildPayload = useCallback((data) => {
    const cleanArr = (arr) =>
      Array.isArray(arr)
        ? arr.map((s) => (s ?? "")?.trim()).filter(Boolean)
        : [];
    const cleanUrl = (u) => {
      if (u == null) return null;
      const t = String(u).trim();
      return t === "" ? null : t;
    };

    return {
      title: data.title,
      summary: data.summary,
      description: cleanArr(data.description),
      contentHtml: data.contentHtml?.trim() || "",
      tech: Array.isArray(data.tech) ? data.tech : [],
      extraTech: cleanArr(data.extraTech),
      tags: cleanArr(data.tags),
      image: cleanUrl(data.image),
      gallery: cleanArr(data.gallery),
      repoUrl: cleanUrl(data.repoUrl),
      liveUrl: cleanUrl(data.liveUrl),
      featured: Boolean(data.featured),
      status: data.status === "draft" ? "draft" : "published",
    };
  }, []);

  // --------------------------
  // Validate + Submit
  // --------------------------
  const handleConfirmSave = useCallback(
    async (e) => {
      if (e?.preventDefault) e.preventDefault();

      setOpen(false);

      const payload = buildPayload(formData);

      // Validate using our helper
      const checked = validateProjectForm(payload);
      if (!checked.ok) {
        console.group("Project validation errors");
        console.error(checked.errors);
        console.groupEnd();

        const errs = checked.errors.map((er) => er.msg).join("\n");
        toast.error("Validation failed", {
          description: errs || "Check required fields.",
        });
        return;
      }

      console.group("Validated project payload");
      console.log(checked.data);
      console.groupEnd();

      try {
        setLoading(true);
        await api.post(endpoint, checked.data);

        toast.success("Project saved!", {
          description: checked.data.title,
        });
        navigate("/admin/projects");
      } catch (err) {
        console.error("Save project error:", err);
        let msg = "Failed to save project.";
        if (err?.response?.data?.error) msg = err.response.data.error;
        toast.error("Save failed", { description: msg });
      } finally {
        setLoading(false);
      }
    },
    [formData, buildPayload, setLoading, endpoint, navigate]
  );

  return (
    <div className="sticky bottom-0 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3 flex justify-end gap-2">
      <Dialog open={open} onOpenChange={(v) => !loading && setOpen(v)}>
        <DialogTrigger asChild>
          <Button type="button" disabled={loading}>
            {loading ? "Saving..." : "Save Project"}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save this project?</DialogTitle>
            <DialogDescription>
              We’ll validate the form and upload the project to the server. Slug
              is auto-generated. Continue?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 ">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleConfirmSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Yes, Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
