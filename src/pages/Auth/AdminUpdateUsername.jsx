import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { updateUsernameSchema } from "@/validators/auth"; // Zod schema
import { updateUsername } from "@/api/authApi";
import { toast } from "sonner";

function AdminUpdateUsername() {
  const [formData, setFormData] = useState({
    username: "",
    resetSecret: "",
    newUsername: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Validate with Zod
    const res = updateUsernameSchema.safeParse(formData);
    if (!res.success) {
      setErrors(res.error.issues);
      return;
    }

    try {
      setLoading(true);
      const res = await updateUsername(formData);
      toast("Updated Succefully");
      setFormData({
        username: "",
        resetSecret: "",
        newUsername: "",
      });
      console.log(res);
    } catch (err) {
      console.error(err);

      setErrors([
        {
          code: "custom",
          message: err?.response?.data?.message || "Failed to update username.",
          path: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md p-4 mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Update Username</h1>

      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errors.map((issue, i) => (
              <div key={i}>{formatIssue(issue)}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="username">Current Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resetSecret">Reset Secret</Label>
          <Input
            id="resetSecret"
            name="resetSecret"
            value={formData.resetSecret}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newUsername">New Username</Label>
          <Input
            id="newUsername"
            name="newUsername"
            value={formData.newUsername}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Username"}
        </Button>
      </form>
    </section>
  );
}

function formatIssue(issue) {
  const path = issue.path?.length ? issue.path.join(".") : "";
  return path ? `${path}: ${issue.message}` : issue.message;
}

export default AdminUpdateUsername;
