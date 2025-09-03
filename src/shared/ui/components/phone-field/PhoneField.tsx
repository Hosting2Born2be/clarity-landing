"use client";

import { useEffect, useRef } from "react";

import {
  defaultCountries,
  PhoneInput,
  type PhoneInputProps,
} from "react-international-phone";

import { excludedCountries } from "@/shared/lib/countries";
import { cn } from "@/shared/lib/cn";

import st from "./PhoneField.module.scss";

import "react-international-phone/style.css";

export const PhoneField = ({
  country,
  hint,
  size = "sm",
  label,
  ...args
}: PhoneInputProps & {
  country?: string;
  hint?: string;
  size?: "sm" | "md";
  label?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <label className={st.layout}>
        <PhoneInput
          defaultCountry={
            defaultCountries.some(
              ([, iso2]) =>
                iso2 === country && !excludedCountries.includes(iso2)
            )
              ? country
              : "us"
          }
          className={cn(st.container, st[`${size}Container`])}
          inputClassName={cn(st.phoneField, hint && st.dangerIntent)}
          countries={defaultCountries.filter(
            ([, iso2]) => !excludedCountries.includes(iso2)
          )}
          countrySelectorStyleProps={{
            buttonClassName: cn(st.dropdown, hint && st.dropdownDangerIntent),
            dropdownStyleProps: {
              className: st.dropdownList,
              listItemClassName: st.option,
            },
            dropdownArrowClassName: st.arrow,
          }}
          {...args}
        />
        {hint && <p className={st.hint}>{hint}</p>}
      </label>
    </div>
  );
};
