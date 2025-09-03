"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "@/shared/lib/helpers/animations";
import styles from "./FormSection.module.scss";
import Image from "next/image";
import { ContactForm } from "@/features/contact-form/ui/ContactForm";
export const FormSection = () => {
  return (
    <section className={styles.formSection} id="contact">
      <div className={styles.formSection__heading}>
        <h1>Let's connect!</h1>
        <p>
          Fill in your details and our team will reach out to explore how
          Clarity Global Inc can support your business.
        </p>
      </div>
      <div>
        <ContactForm />
      </div>
    </section>
  );
};
