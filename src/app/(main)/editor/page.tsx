import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your Resume with ResumeIt",
};

export default async function EditorPage({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
      where: { id: resumeId, userId },
      include: resumeDataInclude,
    })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;

  // const searchParams = useSearchParams();
  // const currentStep = searchParams.get("step") || steps[0].key;
  //
  // const [resumeData, setResumeData] = useState<resumeSchemaType>({});
  //
  // const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  //
  // const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  //
  // useUnloadWarning(hasUnsavedChanges);
  //
  // function setStep(key: string) {
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   newSearchParams.set("step", key);
  //   window.history.pushState(
  //     null,
  //     "",
  //     `${window.location.pathname}?${newSearchParams.toString()}`,
  //   );
  // }
  //
  // const FormComponent = steps.find(
  //   (step) => step.key === currentStep,
  // )?.component;
  //
  // return (
  //   <div className="flex h-[calc(100vh-5rem)] flex-col">
  //     <header className="space-y-1.5 border-b px-3 py-6 text-center">
  //       <h1 className="font-serif text-2xl">Design your Resume</h1>
  //       <p className="text-muted-foreground text-xs">
  //         Follow the Steps below to create your Resume | Don't worry your
  //         progress will be saved automatically
  //       </p>
  //     </header>
  //
  //     <main className="flex flex-1 overflow-scroll">
  //       <div className="flex w-full flex-1">
  //         {/* Form Section */}
  //         <div
  //           className={cn(
  //             "flex flex-col pt-2 md:block",
  //             showSmResumePreview ? "hidden w-full" : "block w-full",
  //           )}
  //         >
  //           <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
  //           <div className="mt-2 w-full border-b" />
  //           <div className="min-h-0 flex-1 overflow-y-auto">
  //             {FormComponent && (
  //               <FormComponent
  //                 resumeData={resumeData}
  //                 setResumeData={setResumeData}
  //               />
  //             )}
  //           </div>
  //         </div>
  //
  //         {/* Preview Section */}
  //         <div
  //           className={cn(
  //             "w-1/2 md:block",
  //             showSmResumePreview ? "block w-full" : "hidden w-full",
  //           )}
  //         >
  //           <ResumePreviewSection
  //             resumeData={resumeData}
  //             setResumeData={setResumeData}
  //             className={cn(showSmResumePreview && "flex")}
  //           />
  //         </div>
  //       </div>
  //     </main>
  //
  //     <Footer
  //       currentStep={currentStep}
  //       setCurrentStep={setStep}
  //       showSmResumePreview={showSmResumePreview}
  //       setShowSmResumePreview={setShowSmResumePreview}
  //       isSaving={isSaving}
  //     />
  //   </div>
  // );
}

// export default EditorPage;
