import { EditorFormProps } from "@/lib/types";
import {
  workExperienceSchemaType,
  workExperienceSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";

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

  const { fields, append, remove } = useFieldArray({
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
        <div className="mx-auto w-3/4 border-b"></div>
      </div>
      <Form {...form}>
        <form className="space-y-2">
          {fields.map((field, index) => (
            <WorkExperienceItem
              key={field.id}
              form={form}
              index={index}
              remove={remove}
            />
          ))}
          <div className="mt-3.5 flex justify-center">
            <Button
              type="button"
              variant="default"
              onClick={() => {
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                });
              }}
            >
              Add More Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WorkExperiencesForm;

interface WorkExperienceItemsProps {
  form: UseFormReturn<workExperienceSchemaType>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem = ({
  form,
  index,
  remove,
}: WorkExperienceItemsProps) => {
  return (
    <div className="m-3 rounded-2xl border-2">
      <div className="m-2 flex justify-between gap-2 rounded-xl border-2 p-3">
        <span>Work Experience {index + 1}</span>
        <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
      </div>
      <div className="m-2 flex flex-col justify-between space-y-3 rounded-xl border-2 p-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  placeholder="Eg : Junior Software Engineer"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.company`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Eg : Google" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between gap-3">
          <FormField
            control={form.control}
            name={`workExperiences.${index}.startDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value?.slice(0, 10)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`workExperiences.${index}.endDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value?.slice(0, 10)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
