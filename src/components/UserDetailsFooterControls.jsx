import React, { useState } from "react";
import { userDetailsSchema } from "@/validators/userDetails";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useSaveUserDetails } from "@/hooks/useUserDetails";
import { toast } from "sonner";

export function UserDetailsFooterControls({
  editMode,
  loading,
  formData,
  setEditMode,
  setLoading,
  original,
  setFormData,
}) {
  const [errors, setErrors] = useState([]);
  const saveMutation = useSaveUserDetails();
  const hasErrors = errors.length > 0;

  const handleEditClick = () => {
    setErrors([]);
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setErrors([]);
    setEditMode(false);
    setLoading(false);
    setFormData(original); // revert changes
  };

  const handleSaveClick = async () => {
    setErrors([]);

    // Validate form
    const res = userDetailsSchema.safeParse(formData);
    if (!res.success) {
      setErrors(res.error.issues);
      return;
    }

    console.log("Validated user details:", res.data);

    setLoading(true);
    const date = new Date();
    try {
      // Call mutation
      await saveMutation.mutateAsync(res.data);
      toast("Saved Successfully", {
        description: `${date}`,
      });
      setEditMode(false); // Only switch out of edit mode if save worked
    } catch (err) {
      const apiError =
        err?.response?.data?.message || "Failed to save changes.";
      setErrors([
        {
          code: "custom",
          message: apiError,
          path: ["_global"],
        },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-3 px-4 py-3 my-10 border-t bg-background md:flex-row md:items-center md:justify-between">
      {hasErrors && (
        <Alert variant="destructive" className="w-full md:w-auto">
          <AlertTitle>Validation error</AlertTitle>
          <AlertDescription>
            {errors.slice(0, 3).map((issue, i) => (
              <div key={i} className="text-sm">
                {formatIssue(issue)}
              </div>
            ))}
            {errors.length > 3 && (
              <div className="mt-1 text-sm">+{errors.length - 3} more…</div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2 ml-auto">
        {!editMode ? (
          <Button onClick={handleEditClick} disabled={loading}>
            Edit
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={handleCancelClick}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveClick} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function formatIssue(issue) {
  const path = issue.path?.length ? issue.path.join(".") : "";
  return path ? `${path}: ${issue.message}` : issue.message;
}
