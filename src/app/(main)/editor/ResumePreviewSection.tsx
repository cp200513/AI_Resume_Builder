import React, { RefObject } from "react"; // <--- Ensure RefObject is imported
import ResumePreviews from "@/components/ResumePreviews";
import { cn } from "@/lib/utils";
import { resumeSchemaType } from "@/lib/validation";
import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
  resumeData: resumeSchemaType;
  setResumeData: (data: resumeSchemaType) => void;
  className?: string;
  contentRef?: RefObject<HTMLDivElement | null>; // <--- ADD THIS LINE
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
  contentRef, // <--- Destructure the prop here as well
}: ResumePreviewSectionProps) {
  return (
    <div className={cn("group relative hidden w-full md:flex", className)}>
      <div className="absolute top-1 left-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:top-3 lg:left-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="bg-secondary flex w-full items-center justify-center overflow-auto p-3">
        {/* Pass the ref to the ResumePreviews component (which should be forwardRefed) */}
        <ResumePreviews
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
          ref={contentRef} // <--- Pass it down to ResumePreviews
        />
      </div>
    </div>
  );
}
