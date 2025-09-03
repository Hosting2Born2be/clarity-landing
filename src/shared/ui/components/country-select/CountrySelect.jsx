import Select from "react-select";
import { filteredCountries } from "@/shared/lib/helpers/excludedCountries";
import { components } from "react-select";

function CountrySelect({ field, ...props }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      color: "#989898",
      height: "46px",
      borderRadius: "24px",
      background: "#fff",
      border: "1px solid #dcdcdc",
      fontSize: "12px",
      fontWeight: "400",
      lineHeight: "1.2",
      textAlign: "left",
      padding: "0 20px",
      "&:hover": {
        borderColor: "#dcdcdc",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "46px",
      margin: "0",
      padding: "0",
      border: "none",
    }),
    input: (provided) => ({
      ...provided,
      height: "46px",
      margin: "0",
      padding: "0",
      border: "none",
      color: "#000",
      backdropFilter: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      "> span": {
        display: "none",
      },
      "> div": {
        padding: "0",
        width: "12px",
        height: "12px",
        background: "url('/images/chevron-down.svg') no-repeat",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
      "> div > svg": {
        display: "none",
      },
    }),
    indicatorContainer: (provided) => ({
      ...provided,
      padding: "0",
    }),
    menu: (provided) => ({
      ...provided,

      background: "#fff",
      display: "block",
      "> div": {
        "&::-webkit-scrollbar": {
          background: "transparent",
          width: "8px",
        },

        "&::-webkit-scrollbar-track": {
          background: "#fff",
        },

        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#F85C3A",
          borderRadius: "100px",
        },
      },
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? "#F85C3A" : "#fff",
      color: "#000",
      fontSize: "12px",
      "&:hover": {
        background: "#F85C3A",
        color: "#ffffff",
      },
    }),
  };

  return (
    <Select
      {...field}
      options={filteredCountries}
      value={filteredCountries.find((c) => c.value === field.value) || null} // <- додаємо
      onChange={(option) => field.onChange(option?.value ?? "")}
      styles={customStyles}
      {...props}
      components={{ MenuList }}
    />
  );
}

export default CountrySelect;

const MenuList = (props) => {
  return (
    <components.MenuList
      {...props}
      innerProps={{
        ...props.innerProps,
        onWheel: (e) => {
          e.stopPropagation();
          if (props.innerProps.onWheel) {
            props.innerProps.onWheel(e);
          }
        },
      }}
    />
  );
};
