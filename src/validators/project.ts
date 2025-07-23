import { z } from "zod";

/**
 * 24-char hex ObjectId
 */
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId.");

/**
 * URL | "" | null
 * Use this for optional URL inputs. We leave empty string as-is;
 * your submit layer can coerce "" -> null if you like.
 */
const urlOrEmpty = z.union([
  z.string().trim().url("Invalid URL."),
  z.literal(""),
  z.null(),
]);

/**
 * Required non-empty trimmed string
 */
const requiredString = (label) =>
  z.string().trim().min(1, `${label} is required.`);

/**
 * Optional non-empty trimmed string
 */
const nonEmptyString = z.string().trim().min(1, "Cannot be empty.");

/**
 * HTML (string | "" | null) — we don't validate the HTML here.
 */
const htmlOrEmpty = z.union([z.string(), z.literal(""), z.null()]);

/**
 * Base project shape (NO slug)
 */
const projectBaseShape = {
  title: requiredString("Title").max(140, "Title too long (max 140)."),
  summary: requiredString("Summary").max(300, "Summary too long (max 300)."),

  description: z
    .array(z.string().trim().min(1, "Paragraph cannot be empty."))
    .default([]),

  contentHtml: htmlOrEmpty.optional(),

  tech: z.array(objectIdSchema).default([]),
  extraTech: z.array(nonEmptyString).default([]),
  tags: z.array(nonEmptyString).default([]),

  image: urlOrEmpty.optional(),
  gallery: z.array(z.string().trim().url("Invalid gallery URL.")).default([]),

  repoUrl: urlOrEmpty.optional(),
  liveUrl: urlOrEmpty.optional(),

  featured: z.boolean().default(false),

  status: z.enum(["draft", "published"]).default("published"),
};

/**
 * Final schema
 */
export const projectFormSchema = z.object(projectBaseShape).strict();

/**
 * Helper: validate & return {ok,data,errors[]}
 * errors: [{path,msg}]
 */
export function validateProjectForm(data) {
  const result = projectFormSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((e) => ({
      path: e.path.join(".") || "form",
      msg: e.message,
    }));
    return { ok: false, errors };
  }
  return { ok: true, data: result.data };
}
