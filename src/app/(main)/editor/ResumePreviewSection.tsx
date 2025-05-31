import { resumeSchemaType } from "@/lib/validation";
import React from "react";

interface ResumePreviewSectionProps {
  resumeData: resumeSchemaType;
  setResumeData: (resumeData: resumeSchemaType) => void;
}

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return <div>ResumePreviewSection</div>;
};

export default ResumePreviewSection;
