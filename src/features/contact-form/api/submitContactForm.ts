import type { ContactFormSchema } from "../model/ContactForm.schema";

export const submitContactForm = async (data: ContactFormSchema): Promise<{ success: boolean; message: string; rowNumber?: number }> => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Submission failed");
    }

    return {
      success: true,
      message: result.message,
      rowNumber: result.rowNumber
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Submission failed"
    };
  }
};
