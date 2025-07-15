"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { resumeSchemaType } from "../../../lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn, mapToresumeSchemaType } from "@/lib/utils";
import useUnloadWarning from "@/components/hooks/useUnloadWarning";
import useAutoSaveResume from "./useAutoSaveResume";
import { ResumeServerData } from "@/lib/types";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

const ResumeEditor = ({ resumeToEdit }: ResumeEditorProps) => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const [resumeData, setResumeData] = useState<resumeSchemaType>(
    resumeToEdit ? mapToresumeSchemaType(resumeToEdit) : {},
  );

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}?${newSearchParams.toString()}`,
    );
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col">
      <header className="space-y-1.5 border-b px-3 py-6 text-center">
        <h1 className="font-serif text-2xl">Design your Resume</h1>
        <p className="text-muted-foreground text-xs">
          Follow the Steps below to create your Resume | Don't worry your
          progress will be saved automatically
        </p>
      </header>

      <main className="flex flex-1 overflow-scroll">
        <div className="flex w-full flex-1">
          {/* Form Section */}
          <div
            className={cn(
              "flex flex-col pt-2 md:block",
              showSmResumePreview ? "hidden w-full" : "block w-full",
            )}
          >
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            <div className="mt-2 w-full border-b" />
            <div className="min-h-0 flex-1 overflow-y-auto">
              {FormComponent && (
                <FormComponent
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={cn(
              "w-1/2 md:block",
              showSmResumePreview ? "block w-full" : "hidden w-full",
            )}
          >
            <ResumePreviewSection
              resumeData={resumeData}
              setResumeData={setResumeData}
              className={cn(showSmResumePreview && "flex")}
            />
          </div>
        </div>
      </main>

      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
};

export default ResumeEditor;
