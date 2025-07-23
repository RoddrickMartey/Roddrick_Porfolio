import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserDetails } from "@/hooks/useUserDetails";
import { uploadImage } from "@/lib/cloudinaryUpload";
import React, { useState, useEffect } from "react";
import BioFieldArray from "@/components/BioFieldArray";
import StringArrayField from "@/components/StringArrayField";
import { UserDetailsFooterControls } from "@/components/UserDetailsFooterControls";
import UserDetailsInfo from "@/components/UserDetailsInfo";

function AdminUpdateUserDetails() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginal] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    headline: "",
    bio: [""],
    homeImage: null,
    aboutImage: null,
    email: "",
    phone: "",
    location: "",
    techStack: [],
    skills: [],
    socials: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
      youtube: "",
      instagram: "",
    },
    availableForWork: false,
  });

  const { data, isLoading, isError, error } = useUserDetails();

  const isDisabled = loading || !editMode;

  /* ---------------- Hydrate formData when data loads ---------------- */
  useEffect(() => {
    if (!data) return;
    // Some APIs wrap: { profile: {...} } — handle that gracefully
    const d = data?.profile ?? data;

    setFormData({
      fullName: d.fullName ?? "",
      headline: d.headline ?? "",
      bio: Array.isArray(d.bio) && d.bio.length ? d.bio : [""],

      homeImage: d.homeImage ?? null,
      aboutImage: d.aboutImage ?? null,

      email: d.email ?? "",
      phone: d.phone ?? "",
      location: d.location ?? "",

      techStack: Array.isArray(d.techStack) ? d.techStack : [],
      skills: Array.isArray(d.skills) ? d.skills : [],

      socials: {
        github: d?.socials?.github ?? "",
        linkedin: d?.socials?.linkedin ?? "",
        twitter: d?.socials?.twitter ?? "",
        website: d?.socials?.website ?? "",
        youtube: d?.socials?.youtube ?? "",
        instagram: d?.socials?.instagram ?? "",
      },

      availableForWork:
        typeof d.availableForWork === "boolean" ? d.availableForWork : false,
    });

    setOriginal({
      fullName: d.fullName ?? "",
      headline: d.headline ?? "",
      bio: Array.isArray(d.bio) && d.bio.length ? d.bio : [""],

      homeImage: d.homeImage ?? null,
      aboutImage: d.aboutImage ?? null,

      email: d.email ?? "",
      phone: d.phone ?? "",
      location: d.location ?? "",

      techStack: Array.isArray(d.techStack) ? d.techStack : [],
      skills: Array.isArray(d.skills) ? d.skills : [],

      socials: {
        github: d?.socials?.github ?? "",
        linkedin: d?.socials?.linkedin ?? "",
        twitter: d?.socials?.twitter ?? "",
        website: d?.socials?.website ?? "",
        youtube: d?.socials?.youtube ?? "",
        instagram: d?.socials?.instagram ?? "",
      },

      availableForWork:
        typeof d.availableForWork === "boolean" ? d.availableForWork : false,
    });
  }, [data]);

  /* ------------------------------------------------------------------ */

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const msg =
      error?.response?.data?.message || "Failed to load user details.";
    return <Error message={msg} />;
  }

  const onImageChange = async (e, target = "") => {
    e.preventDefault();
    if (target === "" || !e.target.files || e.target.files.length === 0) {
      return;
    }

    try {
      const file = e.target.files[0];
      const url = await uploadImage(file); // get the uploaded image URL

      setFormData((prev) => ({
        ...prev,
        [target]: url, // dynamically set homeImage or aboutImage
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <section className="flex flex-col w-full h-full overflow-y-auto">
      <div className="flex flex-col justify-around gap-6 md:flex-row md:gap-4">
        {/* Home Image */}
        <div className="flex flex-col items-center w-full gap-2 md:w-auto">
          <img
            src={formData.homeImage}
            alt="Home"
            className="w-full max-w-[300px] h-[300px] object-cover border-2 border-border rounded-md"
          />
          <Label>Home Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onImageChange(e, "homeImage")}
            disabled={isDisabled}
          />
        </div>

        {/* About Image */}
        <div className="flex flex-col items-center w-full gap-2 md:w-auto">
          <img
            src={formData.aboutImage}
            alt="About"
            className="w-full max-w-[300px] h-[300px] object-cover border-2 border-border rounded-md"
          />
          <Label>About Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => onImageChange(e, "aboutImage")}
            disabled={isDisabled}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 p-2">
        <UserDetailsInfo
          formData={formData}
          isDisabled={isDisabled}
          setFormData={setFormData}
        />
        <div className="space-y-8">
          {/* Bio */}
          <BioFieldArray
            value={formData.bio}
            disabled={isDisabled}
            onChange={(bio) => setFormData((p) => ({ ...p, bio }))}
          />
          <StringArrayField
            label="Tech Stack"
            items={formData.techStack}
            disabled={isDisabled}
            onChange={(techStack) => setFormData((p) => ({ ...p, techStack }))}
            placeholder="Add a technology (e.g., React)"
          />
          <StringArrayField
            label="Skills"
            items={formData.skills}
            disabled={isDisabled}
            onChange={(skills) => setFormData((p) => ({ ...p, skills }))}
            placeholder="Add a skill (e.g., Web Development)"
          />
        </div>
      </div>
      <UserDetailsFooterControls
        editMode={editMode}
        loading={loading}
        formData={formData}
        setEditMode={setEditMode}
        setLoading={setLoading}
        original={originalData}
        setFormData={setFormData}
      />
    </section>
  );
}

export default AdminUpdateUserDetails;
