import { cn } from "@/lib/utils";
import { resumeSchemaType } from "@/lib/validation";
import React from "react";

interface ResumePreviewsProps {
  resumeData: resumeSchemaType;
  className?: string;
}

const ResumePreviews = ({ resumeData, className }: ResumePreviewsProps) => {
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
    >
      <h1 className="p-6 text-3xl font-bold">
        This text should change with the size of the contained div
      </h1>
    </div>
  );
};

export default ResumePreviews;
