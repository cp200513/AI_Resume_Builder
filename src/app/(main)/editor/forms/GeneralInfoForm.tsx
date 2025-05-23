import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  generalInfoSchemaType,
  generalInfoSchema,
} from "../../../../lib/validation";

import { Button } from "@/components/ui/button";
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
import { EditorFormProps } from "../../../../lib/types";
import { useEffect } from "react";

const GeneralInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<generalInfoSchemaType>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });

  // PersonalInfoForm.tsx and GeneralInfoForm.tsx

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div>
      <div className="mt-1 flex flex-col items-center justify-center gap-2">
        <h2 className="mt-1 space-y-0.5 from-neutral-600 font-serif text-3xl">
          General Info
        </h2>
        <div className="w-3/4 border" />
        <p className="text-muted-foreground text-sm">
          <span className="text-red-400">NOTE :</span> This won't be showing up
          on Resume...
        </p>
        <div className="w-3/4 border" />
      </div>

      <div className="border-b-blue-500 p-8">
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name : </FormLabel>
                  <FormControl>
                    <Input placeholder="My Resume" {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              {...form}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description : </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg : This is a Resume for the role of ...."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};
export default GeneralInfoForm;
