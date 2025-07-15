import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { resumeSchemaType } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
      name: value.name,
      size: value.size,
      type: value.type,
      lastModified: value.lastModified,
    }
    : value;
}

export function mapToresumeSchemaType(
  data: ResumeServerData,
): resumeSchemaType {
  return {
    id: data.id,
    title: data.title ?? undefined,
    description: data.description ?? undefined,
    photo: data.photoUrl ?? undefined,
    firstName: data.firstName ?? undefined,
    lastName: data.lastName ?? undefined,
    jobtitle: data.jobTitle ?? undefined,
    city: data.city ?? undefined,
    country: data.country ?? undefined,
    phone: data.phone ?? undefined,
    email: data.email ?? undefined,

    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position ?? undefined,
      company: exp.company ?? undefined,
      startDate: exp.startDate
        ? new Date(exp.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: exp.endDate
        ? new Date(exp.endDate).toISOString().split("T")[0]
        : undefined,
      description: exp.description ?? undefined,
    })),

    // note: your prop was singular “education”
    education: data.educations.map((edu) => ({
      degree: edu.degree ?? undefined,
      school: edu.school ?? undefined,
      startDate: edu.startDate
        ? new Date(edu.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: edu.endDate
        ? new Date(edu.endDate).toISOString().split("T")[0]
        : undefined,
    })),

    skills: data.skills,
    borderStyle: data.borderStyle ?? undefined, // ← ensure z.string().optional() in your Zod schema
    colorHex: data.colorHex ?? undefined, // ← ensure z.string().optional() in your Zod schema
    summary: data.summary ?? undefined,
  };
}
