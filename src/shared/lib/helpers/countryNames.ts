import countryList from 'react-select-country-list';

const allCountries = countryList().getData();

export const getCountryNameByCode = (code: string): string => {
  const country = allCountries.find(c => c.value === code);
  return country ? country.label : code;
};
