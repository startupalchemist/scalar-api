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
import { Loader2, CheckCircle2, MapPin, Clock, MessageSquare } from "lucide-react";

const contactSchema = insertLeadSchema.extend({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Valid email required"),
  vehicle: z.string().min(2, "Project type is required"),
});

type ContactForm = z.infer<typeof contactSchema>;

function getUtmParams(): { utmSource?: string; utmMedium?: string; utmCampaign?: string } {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
}

const inputClass = "bg-white/5 border-white/10 text-white placeholder:text-[#B3B3B8]/40 focus:border-[#5D3FD3]/50";
const labelClass = "text-xs uppercase tracking-[0.15em] text-[#B3B3B8] font-semibold";

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
      const utm = getUtmParams();
      const res = await apiRequest("POST", "/api/leads", { ...data, ...utm });
      return res.json();
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Assessment request received",
        description: "Our team will be in touch within 24 hours to schedule your free assessment.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
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
            <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FD3] font-semibold">
              Free Assessment
            </span>
            <h1
              className="mt-4 text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.05]"
              style={{ fontFamily: "Poppins, sans-serif" }}
              data-testid="text-contact-headline"
            >
              Request Your<br />
              Free Assessment
            </h1>
            <p className="mt-6 text-[#B3B3B8] text-lg leading-relaxed max-w-md">
              Tell us about your project. Our team will review your information and reach out to schedule a complimentary on-site assessment — no obligation, no pressure.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md bg-[#5D3FD3]/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#5D3FD3]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8]/50 font-semibold mb-1">
                    Service Area
                  </p>
                  <p className="text-[#F5F5F7] text-sm">Dallas-Fort Worth Metroplex</p>
                  <p className="text-[#B3B3B8]/50 text-xs mt-0.5">Residential & commercial properties across all of DFW</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md bg-[#5D3FD3]/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#5D3FD3]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8]/50 font-semibold mb-1">
                    Response Time
                  </p>
                  <p className="text-[#F5F5F7] text-sm">Within 24 Hours</p>
                  <p className="text-[#B3B3B8]/50 text-xs mt-0.5">We schedule assessments at your convenience</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-md bg-[#5D3FD3]/15 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#5D3FD3]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B3B3B8]/50 font-semibold mb-1">
                    Chat with Us
                  </p>
                  <p className="text-[#F5F5F7] text-sm">Instant Answers Available</p>
                  <p className="text-[#B3B3B8]/50 text-xs mt-0.5">Use our live chat for pricing questions or quick info</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {mutation.isSuccess ? (
              <div
                className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-10 rounded-xl"
                style={{
                  background: "rgba(93,63,211,0.08)",
                  border: "1px solid rgba(93,63,211,0.25)",
                }}
                data-testid="contact-success"
              >
                <CheckCircle2 className="w-14 h-14 text-[#5D3FD3] mb-6" />
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-3"
                  style={{ fontFamily: "Poppins, sans-serif" }}>
                  Assessment Requested
                </h3>
                <p className="text-[#B3B3B8] text-sm max-w-xs">
                  Our team will review your project details and reach out within 24 hours to schedule your free on-site assessment.
                </p>
              </div>
            ) : (
              <div
                className="p-8 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h2 className="text-sm uppercase tracking-[0.15em] text-white font-semibold mb-6">
                  Project Details
                </h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={labelClass}>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className={inputClass}
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
                            <FormLabel className={labelClass}>Phone</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className={inputClass}
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
                            <FormLabel className={labelClass}>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className={inputClass}
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
                          <FormLabel className={labelClass}>Service Type / Project Description</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className={inputClass}
                              placeholder="e.g. Custom turf install, Foundation repair, Kitchen remodel..."
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
                          <FormLabel className={labelClass}>Property Address (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              className={inputClass}
                              placeholder="City or full address for assessment scheduling"
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
                          <FormLabel className={labelClass}>Additional Details (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              value={field.value ?? ""}
                              className={`${inputClass} resize-none min-h-[100px]`}
                              placeholder="Tell us more about your project, timeline, or any specific questions"
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
                      className="w-full bg-[#5D3FD3] hover:bg-[#4a32a8] text-white border-0 text-sm uppercase tracking-[0.15em] font-semibold py-5"
                      data-testid="button-submit-contact"
                    >
                      {mutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Request Free Assessment"
                      )}
                    </Button>

                    <p className="text-center text-xs text-[#B3B3B8]/40 tracking-wide">
                      Free assessment. No obligation. We'll contact you within 24 hours.
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
