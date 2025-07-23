import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { updatePasswordSchema } from "@/validators/auth"; // Zod schema
import { updatePassword } from "@/api/authApi";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; // EyeClosed -> EyeOff is common

function AdminUpdatePassword() {
  const [formData, setFormData] = useState({
    username: "",
    resetSecret: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false); // false => password hidden

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const result = updatePasswordSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.issues);
      return;
    }

    try {
      setLoading(true);
      await updatePassword(result.data); // validated payload
      toast.success("Updated successfully.");
      // Clear sensitive fields; keep username if you prefer
      setFormData({
        username: "",
        resetSecret: "",
        newPassword: "",
      });
    } catch (err) {
      console.error(err);
      setErrors([
        {
          code: "custom",
          message: err?.response?.data?.message || "Failed to update password.",
          path: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPw = () => setShowPw((v) => !v);

  return (
    <section className="max-w-md p-4 mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Update Password</h1>

      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errors.map((issue, idx) => (
              <div key={idx} className="text-sm">
                {issue.path.length
                  ? `${issue.path.join(".")}: ${issue.message}`
                  : issue.message}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username">Current Username</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            disabled={loading}
            autoComplete="username"
          />
        </div>

        {/* Reset Secret */}
        <div className="space-y-2">
          <Label htmlFor="resetSecret">Reset Secret</Label>
          <Input
            id="resetSecret"
            value={formData.resetSecret}
            onChange={(e) => handleChange("resetSecret", e.target.value)}
            disabled={loading}
            autoComplete="one-time-code"
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPw ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              disabled={loading}
              autoComplete="new-password"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              tabIndex={-1}
              onClick={toggleShowPw}
              disabled={loading}
              className="absolute inset-y-0 right-0 h-full px-2"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </section>
  );
}

export default AdminUpdatePassword;
