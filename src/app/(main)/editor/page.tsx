"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import { useState } from "react";

import Footer from "./Footer";
import { resumeSchemaType } from "../../../lib/validation";
import WorkExperiencesForm from "./forms/WorkExperiencesForm";

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
    <div className="flex min-h-[100vh] flex-col">
      {" "}
      {/* Changed min-h-screen to h-screen */}
      <header className="space-y-1.5 border-b px-3 py-6 text-center">
        <h1 className="font-serif text-2xl">Design your Resume</h1>
        <p className="text-muted-foreground text-xs">
          Follow the Steps below to create your Resume | Don't worry your
          progress will be saved automatically
        </p>
      </header>
      <main className="flex-grow overflow-y-auto pb-12">
        <div className="flex h-full w-full">
          <div className="w-full pt-2 md:w-1/2">
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            <div className="mt-2 w-full border-b" />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow border-r" />
          <div className="hidden w-1/2 flex-grow overflow-y-auto md:flex">
            <pre>{JSON.stringify(resumeData, null, 2)}</pre>
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
};

export default EditorPage;
