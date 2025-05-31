import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export const generalInfoSchemaType = z.infer<typeof generalInfoSchema>;

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

export const personalInfoSchemaType = z.infer<typeof personalInfoSchema>;

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

export const educationSchema = z.object({
  education: z
    .array(
      z.object({
        degree: optionalString,
        college: optionalString,
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
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
});

export type resumeSchemaType = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: null | string | File;
};
