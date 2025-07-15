import { Prisma } from "../generated/prisma/client";
import { resumeSchemaType } from "./validation";

export interface EditorFormProps {
  resumeData: resumeSchemaType;
  setResumeData: (data: resumeSchemaType) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;
