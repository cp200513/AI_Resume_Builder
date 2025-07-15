import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, summarySchemaType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButton";

const SummaryForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<summarySchemaType>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData?.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto flex flex-col">
      <div className="m-3 space-y-1.5 text-center">
        <h2 className="mt-1 font-serif text-3xl">Proffesional Summary</h2>
        <p className="text-muted-foreground mx-auto w-3/4 text-3xl text-xs">
          Write a brief summary of your professional background, skills, and
          career goals or let <span className="font-bold">AI</span> generate a
          summary for you.
        </p>
        <div className="mx-auto w-3/4 border-b"></div>
      </div>
      <div className="m-3 rounded-2xl border-2">
        <div className="flex-justify-between m-1 gap-2 rounded-xl border-2 p-2">
          <Form {...form}>
            <form className="m-3 space-y-3 overflow-y-scroll">
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">
                      Proffesional Summary
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your summary here..."
                        className="h-40"
                      />
                    </FormControl>
                    <FormMessage />
                    <GenerateSummaryButton
                      resumeData={resumeData}
                      onSummaryGenerated={(summary) =>
                        form.setValue("summary", summary)
                      }
                    />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
