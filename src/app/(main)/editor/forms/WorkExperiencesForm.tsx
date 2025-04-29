import { EditorFormProps } from "@/lib/types";
import {
  workExperienceSchemaType,
  workExperienceSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const WorkExperiencesForm = ({
  resumeData,
  setResumeData,
}: EditorFormProps) => {
  const form = useForm<workExperienceSchemaType>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  return (
    <div className="max-auto space-y--6 max-w-xl">
      <div className="space-y-1.5 text-center">
        <h2 className="mt-1 font-serif text-2xl">Work Experience</h2>
        <p className="text-muted-foreground text-xs">
          Add as many Experiences as you want in your resume...
        </p>
        <div className="mt-4 w-full border-b" />
      </div>
      <Form {...form}>
        <form className="space-y-2">
          {fields.map((field) => (
            <WorkExperienceItem key={field.id} />
          ))}
        </form>
      </Form>
    </div>
  );
};

export default WorkExperiencesForm;

const WorkExperienceItem = () => {
  return <div>WorkExperience</div>;
};
