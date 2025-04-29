import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  personalInfoSchemaType,
  personalInfoSchema,
} from "../../../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
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

const PersonalInfoForm = () => {
  const form = useForm<personalInfoSchemaType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobtitle: "",
      city: "",
      country: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async () => {
      const isvalid = await form.trigger();
      if (!isvalid) return;
      //Update resume
    });
    return unsubscribe;
  }, [form]);

  return (
    <div className="max-x-xl mx-auto space-y-6">
      <div className="space-y-0.5 text-center">
        <h2 className="mt-2 font-serif text-2xl">Personal Info</h2>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Tell us about Yourself
        </p>
        <div className="mx-auto mt-4 w-3/4 border-b" />
      </div>
      <div className="p-4">
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { values, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Your Photo</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fleldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Eg : Chiranjeev" />
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
                    <FormLabel>Last Name </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Eg : Prasannaa" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="jobtitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title </FormLabel>
                  <FormControl>
                    <Input placeholder="Eg : SDE at Google" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} placeholder="+91 1234567890" />
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
                    <Input {...field} placeholder="Eg : Chiranjeev@gmail.com" />
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
