"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { submitContactForm } from "../api/submitContactForm";
import { ContactFormSchema } from "../model/ContactForm.schema";
import { PhoneField } from "@/shared/ui/components/phone-field/PhoneField";
import CountrySelect from "@/shared/ui/components/country-select/CountrySelect";
import styles from "./ContactForm.module.scss";

export const ContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      fullName: "",
      telegramUser: "",
      phone: "",
      email: "",
      companyName: "",
      industry: "",
      website: "",
      country: "",
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setIsSuccess(true);
        setSuccessMessage(
          `Thank you! Your data has been saved to row #${result.rowNumber} in our database.`
        );
        reset();
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <>
      <div className={styles.contactForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                {...register("fullName")}
                className={errors.fullName ? styles.errorInput : ""}
              />
              {errors.fullName && (
                <p className={styles.error}>{errors.fullName.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telegramUser">Telegram user</label>
              <input
                type="text"
                placeholder="Enter your Telegram username"
                {...register("telegramUser")}
                className={errors.telegramUser ? styles.errorInput : ""}
              />
              {errors.telegramUser && (
                <p className={styles.error}>{errors.telegramUser.message}</p>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneField
                    {...field}
                    label="Phone"
                    hint={errors.phone?.message}
                    size="md"
                  />
                )}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
                className={errors.email ? styles.errorInput : ""}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                placeholder="Enter your company name"
                {...register("companyName")}
                className={errors.companyName ? styles.errorInput : ""}
              />
              {errors.companyName && (
                <p className={styles.error}>{errors.companyName.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="industry">Industry</label>
              <input
                type="text"
                placeholder="Enter your industry"
                {...register("industry")}
                className={errors.industry ? styles.errorInput : ""}
              />
              {errors.industry && (
                <p className={styles.error}>{errors.industry.message}</p>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="website">Website</label>
              <input
                type="url"
                placeholder="Enter your website url"
                {...register("website")}
                className={errors.website ? styles.errorInput : ""}
              />
              {errors.website && (
                <p className={styles.error}>{errors.website.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="country">Country</label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <CountrySelect
                    field={field}
                    placeholder="Select your country"
                  />
                )}
              />
              {errors.country && (
                <p className={styles.error}>{errors.country.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            {isLoading ? "Submitting..." : "Submit"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="12"
              viewBox="0 0 17 12"
              fill="none"
            >
              <path
                d="M0.0312498 5.96826L15.0312 5.96826M10.1562 11.2183L15.4062 5.96826L10.1562 0.718261"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </form>
      </div>

      {/**{errorMessage && (
        <div className={styles.error}>
          <p>{errorMessage}</p>
        </div>
      )} */}

      <div
        className={
          `${styles.successPopup} ${isSuccess ? styles.successPopupActive : ""}`
        }
      >
        <div className={styles.success}>
          <button onClick={handleReset} className={styles.close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.51252 8.9276L13.274 14.6891C13.4661 14.8746 13.7233 14.9773 13.9904 14.9749C14.2574 14.9726 14.5129 14.8655 14.7017 14.6767C14.8905 14.4878 14.9976 14.2324 15 13.9654C15.0023 13.6983 14.8996 13.441 14.7141 13.249L8.95263 7.48748L14.7141 1.72601C14.8996 1.53392 15.0023 1.27666 15 1.00962C14.9976 0.742579 14.8905 0.487135 14.7017 0.298303C14.5129 0.10947 14.2574 0.002359 13.9904 3.85008e-05C13.7233 -0.002282 13.4661 0.100374 13.274 0.285896L7.51252 6.04737L1.75104 0.285896C1.55809 0.10496 1.30232 0.00618954 1.03784 0.0104842C0.773359 0.0147789 0.520926 0.121802 0.333953 0.308907C0.14698 0.496013 0.0401356 0.748521 0.036028 1.013C0.0319205 1.27748 0.130872 1.53319 0.311944 1.72601L6.0724 7.48748L0.310926 13.249C0.213652 13.3429 0.136063 13.4553 0.0826862 13.5795C0.0293093 13.7038 0.00121358 13.8375 3.84544e-05 13.9727C-0.00113667 14.1079 0.0246321 14.242 0.0758416 14.3672C0.127051 14.4924 0.202676 14.6061 0.298302 14.7017C0.393929 14.7973 0.507643 14.8729 0.632809 14.9242C0.757975 14.9754 0.892086 15.0011 1.02732 15C1.16255 14.9988 1.29619 14.9707 1.42045 14.9173C1.54471 14.8639 1.65709 14.7863 1.75104 14.6891L7.51252 8.9276Z"
                fill="#2D2D2D"
              />
            </svg>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
          >
            <path
              d="M58.2799 32L63.5779 25.2C63.7678 24.9561 63.8987 24.6714 63.96 24.3683C64.0214 24.0653 64.0117 23.7521 63.9317 23.4535C63.8517 23.1548 63.7034 22.8788 63.4987 22.6471C63.294 22.4154 63.0384 22.2343 62.7519 22.118L54.7519 18.868L55.9279 10.324C55.97 10.0181 55.9407 9.70667 55.8423 9.41401C55.7439 9.12135 55.5791 8.85544 55.3608 8.63712C55.1424 8.41879 54.8765 8.25398 54.5839 8.15559C54.2912 8.05721 53.9798 8.02791 53.6739 8.07001L45.1279 9.24601L41.8879 1.24801C41.7719 0.960525 41.5906 0.703948 41.3584 0.498534C41.1262 0.29312 40.8495 0.144492 40.55 0.0643853C40.2505 -0.0157213 39.9365 -0.0251133 39.6328 0.0369508C39.3291 0.0990148 39.0439 0.230836 38.7999 0.422005L31.9999 5.72001L25.1999 0.422005C24.9559 0.232042 24.6712 0.101227 24.3682 0.0398379C24.0652 -0.0215516 23.752 -0.0118443 23.4534 0.0681973C23.1547 0.148239 22.8787 0.296435 22.647 0.501144C22.4152 0.705854 22.2341 0.961501 22.1179 1.24801L18.8599 9.23801L10.3159 8.06201C10.01 8.01991 9.69854 8.0492 9.40588 8.14759C9.11322 8.24598 8.84732 8.41079 8.62899 8.62912C8.41067 8.84744 8.24586 9.11335 8.14747 9.40601C8.04908 9.69867 8.01979 10.0101 8.06188 10.316L9.23788 18.862L1.24788 22.112C0.960402 22.228 0.703826 22.4093 0.498412 22.6415C0.292998 22.8736 0.14437 23.1504 0.0642632 23.4499C-0.0158433 23.7494 -0.0252353 24.0634 0.0368287 24.3671C0.0988928 24.6708 0.230714 24.956 0.421883 25.2L5.71988 32L0.421883 38.8C0.23192 39.044 0.101105 39.3286 0.0397158 39.6317C-0.0216737 39.9347 -0.0119663 40.2479 0.0680753 40.5465C0.148117 40.8452 0.296313 41.1212 0.501022 41.3529C0.705732 41.5846 0.961379 41.7657 1.24788 41.882L9.23788 45.14L8.06188 53.684C8.01979 53.9899 8.04908 54.3013 8.14747 54.594C8.24586 54.8867 8.41067 55.1526 8.62899 55.3709C8.84732 55.5892 9.11322 55.754 9.40588 55.8524C9.69854 55.9508 10.01 55.9801 10.3159 55.938L18.8619 54.762L22.1119 62.762C22.2282 63.0482 22.4093 63.3035 22.6408 63.508C22.8724 63.7125 23.1482 63.8605 23.4466 63.9405C23.745 64.0206 24.0578 64.0304 24.3606 63.9692C24.6634 63.908 24.948 63.7776 25.1919 63.588L31.9999 58.28L38.7999 63.578C39.1514 63.8518 39.5843 64.0003 40.0299 64C40.2041 64.0002 40.3776 63.9773 40.5459 63.932C40.8447 63.852 41.1208 63.7038 41.3526 63.4991C41.5844 63.2943 41.7656 63.0386 41.8819 62.752L45.1319 54.752L53.6759 55.928C53.9818 55.9701 54.2932 55.9408 54.5859 55.8424C54.8785 55.744 55.1444 55.5792 55.3628 55.3609C55.5811 55.1426 55.7459 54.8767 55.8443 54.584C55.9427 54.2913 55.972 53.9799 55.9299 53.674L54.7539 45.128L62.7539 41.878C63.0401 41.7617 63.2954 41.5806 63.4999 41.349C63.7043 41.1175 63.8524 40.8417 63.9324 40.5433C64.0124 40.2449 64.0223 39.9321 63.9611 39.6293C63.8999 39.3265 63.7694 39.0419 63.5799 38.798L58.2799 32ZM45.4139 25.414L29.4139 41.414C29.0388 41.7889 28.5302 41.9996 27.9999 41.9996C27.4696 41.9996 26.9609 41.7889 26.5859 41.414L18.5859 33.414C18.2216 33.0368 18.02 32.5316 18.0245 32.0072C18.0291 31.4828 18.2394 30.9812 18.6102 30.6104C18.9811 30.2396 19.4827 30.0292 20.0071 30.0247C20.5315 30.0201 21.0367 30.2217 21.4139 30.586L27.9999 37.172L42.5859 22.586C42.9631 22.2217 43.4683 22.0201 43.9927 22.0247C44.5171 22.0292 45.0187 22.2396 45.3895 22.6104C45.7603 22.9812 45.9707 23.4828 45.9752 24.0072C45.9798 24.5316 45.7782 25.0368 45.4139 25.414Z"
              fill="#00A254"
            />
          </svg>
          <h2>You're all set!</h2>
          <p>Your form has been submitted successfully.</p>
          <button onClick={handleReset} className={styles.backToHomepage}>
            Back to Homepage
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="12"
              viewBox="0 0 17 12"
              fill="none"
            >
              <path
                d="M0.531494 5.96851L15.5315 5.96851M10.6565 11.2185L15.9065 5.96851L10.6565 0.718506"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
