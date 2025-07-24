import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { personalInfoSchema } from "../../../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditorFormProps } from "../../../../lib/types";
import * as z from "zod";

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

const PersonalInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobtitle: resumeData.jobtitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
      // FIX FOR PHOTO:
      // If resumeData.photo is a File, use it directly.
      // If resumeData.photo is a string (URL), it should be undefined or null for the form's defaultValues,
      // as the file input doesn't "display" a URL. It should only accept a File object.
      // If it's null, it can be null.
      photo: resumeData.photo instanceof File ? resumeData.photo : undefined, // <--- MODIFIED HERE
      // Or if your schema allows null: photo: resumeData.photo instanceof File ? resumeData.photo : null,
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const photoInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-x-xl mx-auto space-y-6">
      <div className="space-y-0.5 text-center">
        <h2 className="mt-2 font-serif text-3xl">Personal Info</h2>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Tell us about Yourself
        </p>
        <div className="mx-auto mt-4 w-3/4 border-b" />
      </div>
      <div className="p-4">
        <Form {...form}>
          <form className="space-y-3">
            {/* Photo Upload */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => {
                const { value, ...inputProps } = field;
                return (
                  <FormItem>
                    <FormLabel>Your Photo</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          {...inputProps}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            field.onChange(file);
                          }}
                          ref={photoInputRef}
                        />
                      </FormControl>
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => {
                          field.onChange(null); // Explicitly set to null when removing
                          if (photoInputRef.current) {
                            photoInputRef.current.value = ""; // Clear file input value
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Job Title */}
            <FormField
              name="jobtitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg : SDE at Google" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Eg : Bangalore" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="country"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Eg : India" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} placeholder="+91 123457869" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Alice@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
