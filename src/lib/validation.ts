import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type generalInfoSchemaType = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "File must be an image",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB",
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobtitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type personalInfoSchemaType = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type workExperienceSchemaType = z.infer<typeof workExperienceSchema>;

export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

export const educationSchema = z.object({
  education: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});

export type educationSchemaType = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type skillsSchemaType = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type summarySchemaType = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  // Spread existing schema shapes
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  // Add properties directly from the Resume model that are not in sub-schemas
  colorHex: z.string().default("#000000"), // <--- ADD THIS
  borderStyle: z.string().default("squircle"), // <--- ADD THIS
});

// Now resumeSchemaType will correctly include colorHex and borderStyle
// Also, the Omit<..., "photo"> is generally used if you're replacing the photo type
// which you are doing.
export type resumeSchemaType = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: null | string | File;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;

export const generateSummarySchema = z.object({
  jobtitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;
