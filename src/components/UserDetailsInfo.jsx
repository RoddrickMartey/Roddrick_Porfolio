import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function UserDetailsInfo({ formData, setFormData, isDisabled }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Full Name</Label>
          <Input
            type="text"
            value={formData.fullName}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Headline</Label>
          <Input
            type="text"
            value={formData.headline}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, headline: e.target.value }))
            }
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Email</Label>
          <Input
            type="email"
            value={formData.email}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Phone</Label>
          <Input
            type="text"
            value={formData.phone}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            maxLength={10}
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Location</Label>
          <Input
            type="text"
            value={formData.location}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* GitHub */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">GitHub</Label>
          <Input
            type="url"
            value={formData.socials.github}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                socials: { ...prev.socials, github: e.target.value },
              }))
            }
          />
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">LinkedIn</Label>
          <Input
            type="url"
            value={formData.socials.linkedin}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                socials: { ...prev.socials, linkedin: e.target.value },
              }))
            }
          />
        </div>

        {/* Twitter */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Twitter</Label>
          <Input
            type="url"
            value={formData.socials.twitter}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                socials: { ...prev.socials, twitter: e.target.value },
              }))
            }
          />
        </div>

        {/* Website */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Website</Label>
          <Input
            type="url"
            value={formData.socials.website}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                socials: { ...prev.socials, website: e.target.value },
              }))
            }
          />
        </div>

        {/* YouTube */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">YouTube</Label>
          <Input
            type="url"
            value={formData.socials.youtube}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                socials: { ...prev.socials, youtube: e.target.value },
              }))
            }
          />
        </div>

        {/* Instagram */}
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium">Instagram</Label>
          <Input
            type="url"
            value={formData.socials.instagram}
            disabled={isDisabled}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                socials: { ...prev.socials, instagram: e.target.value },
              }))
            }
          />
        </div>
      </div>
    </>
  );
}

export default UserDetailsInfo;
