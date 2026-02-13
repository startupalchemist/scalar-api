import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSchema } from "@shared/schema";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const contactSchema = insertLeadSchema.extend({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Valid email required"),
  vehicle: z.string().min(2, "Vehicle info is required"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      vehicle: "",
      insurance: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Request received",
        description: "We'll be in touch within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => mutation.mutate(data);

  return (
    <div className="bg-[#0B0B0D] min-h-screen pt-24 lg:pt-32">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF192C] font-semibold mb-4">
              Contact
            </p>
            <h1
              className="text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] uppercase tracking-tight leading-[1.05]"
              data-testid="text-contact-headline"
            >
              Start Your Repair.
            </h1>
            <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-md">
              Submit your information. We'll coordinate with your insurance and schedule your drop-off.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8]/50 font-semibold mb-2">
                  Location
                </p>
                <p className="text-[#F5F5F7] text-sm">Dallas, Texas</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8]/50 font-semibold mb-2">
                  Hours
                </p>
                <p className="text-[#F5F5F7] text-sm">By Appointment Only</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8]/50 font-semibold mb-2">
                  Guarantee
                </p>
                <p className="text-[#F5F5F7] text-sm">
                  48-hour completion or $300 paid to you.
                </p>
              </div>
            </div>
          </div>

          <div>
            {mutation.isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center" data-testid="contact-success">
                <CheckCircle2 className="w-12 h-12 text-[#FF192C] mb-6" />
                <h3 className="text-xl font-bold text-[#F5F5F7] uppercase tracking-tight mb-3">
                  Request Received
                </h3>
                <p className="text-[#B3B3B8] text-sm max-w-xs">
                  We'll review your information and reach out within 24 hours to coordinate next steps.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#141416] border-white/10 text-[#F5F5F7] placeholder:text-[#B3B3B8]/30 focus:border-[#FF192C]/50"
                            placeholder="Your name"
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-[#141416] border-white/10 text-[#F5F5F7] placeholder:text-[#B3B3B8]/30 focus:border-[#FF192C]/50"
                              placeholder="(555) 555-5555"
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="bg-[#141416] border-white/10 text-[#F5F5F7] placeholder:text-[#B3B3B8]/30 focus:border-[#FF192C]/50"
                              placeholder="you@email.com"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold">
                          Vehicle
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#141416] border-white/10 text-[#F5F5F7] placeholder:text-[#B3B3B8]/30 focus:border-[#FF192C]/50"
                            placeholder="Year, Make, Model"
                            data-testid="input-vehicle"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="insurance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold">
                          Insurance Carrier (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            className="bg-[#141416] border-white/10 text-[#F5F5F7] placeholder:text-[#B3B3B8]/30 focus:border-[#FF192C]/50"
                            placeholder="State Farm, GEICO, etc."
                            data-testid="input-insurance"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold">
                          Additional Details (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value ?? ""}
                            className="bg-[#141416] border-white/10 text-[#F5F5F7] placeholder:text-[#B3B3B8]/30 focus:border-[#FF192C]/50 resize-none min-h-[100px]"
                            placeholder="Describe your damage, timeline preferences, or questions"
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-[#FF192C] text-white border-[#FF192C] text-sm uppercase tracking-[0.15em] font-semibold"
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>

        <div className="mt-16 p-6 rounded-md bg-[#141416] border border-white/5">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8] font-semibold mb-4">Service Areas</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Dallas", href: "/hail-repair-dallas" },
              { label: "Plano", href: "/hail-repair-plano" },
              { label: "Frisco", href: "/hail-repair-frisco" },
              { label: "Fort Worth", href: "/hail-repair-fort-worth" },
              { label: "Arlington", href: "/hail-repair-arlington" },
              { label: "Denton", href: "/hail-repair-denton" },
              { label: "McKinney", href: "/hail-repair-mckinney" },
              { label: "Irving", href: "/hail-repair-irving" },
              { label: "Garland", href: "/hail-repair-garland" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-xs text-[#FF192C] hover:text-[#FF192C]/80 transition-colors cursor-pointer" data-testid={`link-area-${link.label.toLowerCase()}`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
