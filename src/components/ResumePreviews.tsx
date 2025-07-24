import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton"; // Ensure this path is correct
import { cn } from "@/lib/utils";
import { resumeSchemaType } from "@/lib/validation";
import React, { forwardRef, useEffect, useRef, useState } from "react"; // <--- Import forwardRef
import useDimensions from "./hooks/useDimensions"; // Ensure this path is correct
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formatDate } from "date-fns";

// The interface for props, which now implicitly includes 'ref' because of forwardRef
interface ResumePreviewsProps {
  resumeData: resumeSchemaType;
  className?: string;
}

// Wrap your component with forwardRef
const ResumePreviews = forwardRef<HTMLDivElement, ResumePreviewsProps>(
  ({ resumeData, className }, ref) => {
    // <--- Receive 'ref' as the second argument
    // Use an internal ref for useDimensions if you need to measure the outer container
    const containerRefForDimensions = useRef<HTMLDivElement>(null);

    // The useDimensions hook needs a stable ref to watch.
    // Attach it to the main responsive container.
    const { width } = useDimensions(containerRefForDimensions);

    return (
      <div
        // Apply the internal ref for useDimensions to the outermost div
        ref={containerRefForDimensions}
        className={cn("aspect-[210/297] w-full bg-white text-black", className)}
      >
        <div
          // This is the div that useReactToPrint will target.
          // Apply the `ref` received from forwardRef here.
          ref={ref} // <--- CRUCIAL FIX: Apply the print ref here!
          id="resumePreviewContent" // Keep ID if needed for other purposes
          className={cn("space-y-6 p-6", !width && "invisible")}
          style={{
            zoom: (1 / 794) * width, // This div gets the zoom styling
          }}
        >
          {/* All your resume content goes inside this div */}
          <PersonalInfoHeader resumeData={resumeData} />
          <SummarySection resumeData={resumeData} />
          <WorkExperienceSection resumeData={resumeData} />
          <EducationSection resumeData={resumeData} />
          <SkillsSection resumeData={resumeData} />
        </div>
      </div>
    );
  },
);

ResumePreviews.displayName = "ResumePreviews"; // Good practice for forwardRef components
export default ResumePreviews;

// --- Your existing sub-components (PersonalInfoHeader, SummarySection, etc.) ---
// Make sure to include them below the ResumePreviews component
interface ResumeSectionProps {
  resumeData: resumeSchemaType;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobtitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
          }}
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobtitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional profile
        </p>
        <div className="text-sm whitespace-pre-line">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="text-xs whitespace-pre-line">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { education, colorHex } = resumeData;

  const educationsNotEmpty = education?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: colorHex,
              }}
            >
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: colorHex,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: colorHex,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : // ? "9999px" // This is a typo. Should be "9999px" only once
                      "8px",
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
