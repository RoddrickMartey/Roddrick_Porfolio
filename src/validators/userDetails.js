import { z } from "zod";

/* ---------- Reusable helpers ---------- */

// Allow valid URL OR empty string OR null
const urlOrEmpty = z.union([z.string().url(), z.literal(""), z.null()]);

// Allow valid email OR empty string OR null
const emailOrEmpty = z.union([z.string().email(), z.literal(""), z.null()]);

// Allow phone matching regex OR empty string OR null
const phoneOrEmpty = z.union([
  z.string().regex(/^[+()\-\s0-9]*$/, "Invalid phone format."),
  z.literal(""),
  z.null(),
]);

// Allow plain string (trimmed) or empty -> used inside arrays
const nonEmptyTrimmed = z.string().trim().min(1);

/* ---------- Socials ---------- */

export const socialsSchema = z
  .object({
    github: urlOrEmpty.optional(),
    linkedin: urlOrEmpty.optional(),
    twitter: urlOrEmpty.optional(),
    website: urlOrEmpty.optional(),
    youtube: urlOrEmpty.optional(),
    instagram: urlOrEmpty.optional(),
  })
  .optional();

/* ---------- Main User Details ---------- */

export const userDetailsSchema = z
  .object({
    fullName: z.string().max(100).optional(),
    headline: z.string().max(140).optional(),
    bio: z.array(z.string().min(1)).min(1).optional(),

    homeImage: urlOrEmpty.optional(),
    aboutImage: urlOrEmpty.optional(),

    email: emailOrEmpty.optional(),
    phone: phoneOrEmpty.optional(),
    location: z.string().max(140).or(z.literal("")).or(z.null()).optional(),

    techStack: z.array(nonEmptyTrimmed).optional(),
    skills: z.array(nonEmptyTrimmed).optional(),

    socials: socialsSchema,

    availableForWork: z.boolean().optional(),
  })
  .strict(); // disallow unknown keys (remove if you want passthrough)
