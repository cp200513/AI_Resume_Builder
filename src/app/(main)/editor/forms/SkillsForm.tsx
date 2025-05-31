import { EditorFormProps } from "@/lib/types";
import { skillsSchema, skillsSchemaType } from "@/lib/validation";
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
import { Textarea } from "@/components/ui/textarea";

const SkillsForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<skillsSchemaType>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData?.skills || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);
  return (
    <div className="mx-auto flex flex-col">
      <div className="m-3 space-y-1.5 text-center">
        <h2 className="mt-1 font-serif text-3xl">Skills Section</h2>
        <p className="text-muted-foreground text-xs">
          Show the World what you are good at{" "}
        </p>
        <div className="mx-auto w-3/4 border-b"></div>
      </div>
      <div className="m-3 rounded-2xl border-2">
        <div className="flex-justify-between m-1 gap-2 rounded-xl border-2 p-2">
          <Form {...form}>
            <form className="m-3 space-y-3 overflow-y-scroll">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-0.5">
                      Add your Skills Here
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="eg : React.Js, Node.Js, Graphic Design , etc .,"
                        onChange={(e) => {
                          const skills = e.target.value.split(",");
                          field.onChange(skills);
                        }}
                      ></Textarea>
                    </FormControl>
                    <FormDescription className="ml-0.5 text-sm">
                      Seperate the skills with a coma
                    </FormDescription>
                    <FormMessage />
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

export default SkillsForm;
