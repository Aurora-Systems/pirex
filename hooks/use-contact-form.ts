import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { service_id, template_id, public_key } from "@/lib/emailjs";

// Helper function to handle EmailJS errors
const getEmailJSErrorMessage = (error: any): string => {
  if (typeof error === "string") return error;
  if (error?.text) return error.text;
  if (error?.message) return error.message;
  return "Failed to send email. Please try again.";
};

const contactFormSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  contact_number: z
    .string()
    .min(10, "Please enter a valid phone number")
    .optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      contact_number: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with public key
      emailjs.init(public_key);

      // Log the attempt (for debugging)
      console.log("Sending email via EmailJS...", {
        service_id,
        template_id,
        from_name: data.full_name,
        from_email: data.email,
      });

      // Send email using EmailJS
      const result = await emailjs.send(
        service_id,
        template_id,
        {
          from_name: data.full_name,
          from_email: data.email,
          contact_number: data.contact_number || "Not provided",
          subject: data.subject,
          message: data.message,
          to_email: "sales@pirex.co.zw",
        },
        public_key,
      );

      // Log success
      console.log("Email sent successfully:", result);

      setIsSubmitted(true);
      toast.success(
        "Thank you! Your message has been sent successfully. We'll get back to you soon.",
      );
      form.reset();
    } catch (error) {
      // Enhanced error logging
      console.error("EmailJS Error Details:", {
        error,
        errorType: typeof error,
        errorMessage: getEmailJSErrorMessage(error),
        formData: {
          from_name: data.full_name,
          from_email: data.email,
          subject: data.subject,
        },
        config: {
          service_id,
          template_id,
          public_key: public_key.substring(0, 5) + "...", // Only log first 5 chars for security
        },
      });

      // User-friendly error message
      const errorMessage = getEmailJSErrorMessage(error);
      toast.error(
        `Failed to send message: ${errorMessage}. Please try again or contact us directly.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    form.reset();
  };

  return {
    form,
    isSubmitting,
    isSubmitted,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
    contactFormSchema,
  };
}
