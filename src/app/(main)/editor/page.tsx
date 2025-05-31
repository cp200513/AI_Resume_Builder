"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { resumeSchemaType } from "../../../lib/validation";

const EditorPage = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const [resumeData, setResumeData] = useState<resumeSchemaType>({});

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
          <div className="flex flex-col pt-2 md:w-1/2">
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
          <div className="hidden w-1/2 overflow-y-auto border-l p-4 md:flex">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(resumeData, null, 2)}
            </pre>
          </div>
        </div>
      </main>

      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
};

export default EditorPage;
