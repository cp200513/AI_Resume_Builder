import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, educationSchemaType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
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

const EducationForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<educationSchemaType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: resumeData.education || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({
        ...resumeData,
        education: values.education?.filter((edu) => edu !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <div className="mx-auto flex flex-col">
      <div className="m-3 space-y-1.5 text-center">
        <h2 className="mt-1 font-serif text-3xl">Education</h2>
        <p className="text-muted-foreground text-xs">
          Fill in your Education Details ...
        </p>
        <div className="mx-auto w-3/4 border-b"></div>
      </div>
      <Form {...form}>
        <form className="space-y-2 overflow-y-scroll">
          {fields.map((field, index) => (
            <EducationItem
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
                  degree: "",
                  college: "",
                  startDate: "",
                  endDate: "",
                });
              }}
            >
              Add More Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

interface EducationItemProps {
  form: UseFormReturn<educationSchemaType>;
  index: number;
  remove: (index: number) => void;
}

const EducationItem = ({ form, index, remove }: EducationItemProps) => {
  return (
    <div className="m-3 rounded-2xl border-2">
      <div className="m-2 flex justify-between gap-2 rounded-xl border-2 p-3">
        <span>Education {index + 1}</span>
        <GripHorizontal className="text-muted-foreground size-5 cursor-grab" />
      </div>
      <div className="m-2 flex flex-col justify-between space-y-3 rounded-xl border-2 p-3">
        <FormField
          control={form.control}
          name={`education.${index}.degree`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  placeholder="Eg : Computer Science and Engineering"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`education.${index}.college`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>College</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Eg : Indian Institute of Technology"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between gap-3">
          <FormField
            control={form.control}
            name={`education.${index}.startDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`education.${index}.endDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mx-auto">
          <Button
            className="mx-auto"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
