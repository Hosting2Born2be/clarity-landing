import { z } from "zod";

export const ContactFormSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  telegramUser: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  companyName: z.string().nonempty("Company name is required"),
  industry: z.string().nonempty("Industry is required"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  country: z.string().nonempty("Country is required"),
});

export type ContactFormSchema = z.infer<typeof ContactFormSchema>;
