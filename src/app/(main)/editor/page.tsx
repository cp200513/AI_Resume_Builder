"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import BreadCrumbs from "./BreadCrumbs";
import { useState } from "react";

import Footer from "./Footer";
import { resumeSchemaType } from "../../../lib/validation";

const EditorPage = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const [resumeData, setResumeData] = useState<resumeSchemaType>({});

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    //we could use Router.push also but that makes things slower since it send request to server
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}?${newSearchParams.toString()}`,
    ); //this pushes the url immediatly
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-6 text-center">
        <h1 className="font-serif text-2xl">Design your Resume</h1>
        <p className="text-muted-foreground text-xs">
          Follow the Steps below to create your Resume | Don't worry your
          progress will be saved automatically
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div className="w-full pt-2 md:w-1/2">
            {/* <GeneralInfoForm /> */}
            {/* <PersonalInfoForm /> */}
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
          <div className="hidden w-1/2 md:flex">
            <pre>{JSON.stringify(resumeData, null, 2)}</pre>
          </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
};

export default EditorPage;
