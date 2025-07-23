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
import { useNavigate } from "react-router";
import { validateProjectForm } from "@/validators/project";
import { useUpdateProject } from "@/hooks/useProjects";

/**
 * Props:
 * - id: string (required) project _id to update
 * - formData: object (required) full form state
 * - loading?: bool (optional external loading state)
 * - setLoading?: fn (optional external setLoading)
 * - onSuccessNavigate?: string | number (optional; default -1 -> go back)
 */
export default function ProjectEditSaveFooter({
  id,
  formData,
  loading: loadingProp,
  setLoading: setLoadingProp,
  onSuccessNavigate = -1,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // React Query mutation
  const updateMutation = useUpdateProject();
  const isMutating = updateMutation.isPending;

  // Internal fallback loading if parent doesn't supply one
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = loadingProp ?? internalLoading;
  const setLoading = setLoadingProp ?? setInternalLoading;

  // --------------------------
  // Transform -> clean payload
  // --------------------------
  const buildPayload = useCallback((data) => {
    const cleanArr = (arr) =>
      Array.isArray(arr)
        ? arr.map((s) => (s ?? "")?.toString().trim()).filter(Boolean)
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
      // tags intentionally omitted (user removed tags)
      image: cleanUrl(data.image),
      gallery: cleanArr(data.gallery),
      repoUrl: cleanUrl(data.repoUrl),
      liveUrl: cleanUrl(data.liveUrl),
      featured: Boolean(data.featured),
      status: data.status === "draft" ? "draft" : "published",
    };
  }, []);

  // --------------------------
  // Validate + Submit (UPDATE)
  // --------------------------
  const handleConfirmSave = useCallback(
    async (e) => {
      if (e?.preventDefault) e.preventDefault();
      setOpen(false);

      if (!id) {
        toast.error("Missing project ID.", {
          description: "Cannot update without an id.",
        });
        return;
      }

      const payload = buildPayload(formData);

      // Validate
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

      console.group("Validated project payload (update)");
      console.log(checked.data);
      console.groupEnd();

      try {
        setLoading(true);
        await updateMutation.mutateAsync({ id, data: checked.data });

        toast.success("Project updated!", {
          description: checked.data.title,
        });

        // Navigate back (or to supplied path)
        if (typeof onSuccessNavigate === "number") {
          navigate(onSuccessNavigate); // e.g., -1
        } else {
          navigate(onSuccessNavigate); // e.g., "/admin/projects"
        }
      } catch (err) {
        console.error("Update project error:", err);
        let msg = "Failed to update project.";
        // Prefer server msg if available
        if (err?.response?.data?.error) msg = err.response.data.error;
        if (err?.message) msg = err.message;
        toast.error("Update failed", { description: msg });
      } finally {
        setLoading(false);
      }
    },
    [
      id,
      formData,
      buildPayload,
      setLoading,
      updateMutation,
      navigate,
      onSuccessNavigate,
    ]
  );

  const disabled = loading || isMutating;

  return (
    <div className="sticky bottom-0 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3 flex justify-end gap-2">
      <Dialog open={open} onOpenChange={(v) => !disabled && setOpen(v)}>
        <DialogTrigger asChild>
          <Button type="button" disabled={disabled}>
            {disabled ? "Saving..." : "Save Changes"}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save changes to this project?</DialogTitle>
            <DialogDescription>
              We’ll validate and update the project on the server. Continue?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={disabled}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleConfirmSave}
              disabled={disabled}
            >
              {disabled ? "Saving..." : "Yes, Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
