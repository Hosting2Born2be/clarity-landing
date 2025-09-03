import countryList from 'react-select-country-list';

const excludeCountries = [
  'AB', // Abkhazia
  'AF', // Afghanistan
  'PT', // Azores (part of Portugal)
  'BS', // Bahamas
  'BY', // Belarus
  'BJ', // Benin
  'CM', // Cameroon
  'CF', // Central African Republic
  'TD', // Chad
  'CD', // Congo, Democratic Republic of
  'CI', // Côte d'Ivoire
  'UA', // Crimea (part of Ukraine)
  'CU', // Cuba
  'UA', // Donetsk (part of Ukraine)
  'ER', // Eritrea
  'PS', // Gaza Strip
  'GH', // Ghana
  'GN', // Guinea
  'GW', // Guinea-Bissau
  'HT', // Haiti
  'IR', // Iran
  'IQ', // Iraq
  'IN', // Kashmir (part of India)
  'UA', // Kherson (part of Ukraine)
  'KP', // North Korea
  'XK', // Kosovo
  'KW', // Kuwait
  'LB', // Lebanon
  'LR', // Liberia
  'LY', // Libya
  'UA', // Luhansk (part of Ukraine)
  'ML', // Mali
  'MM', // Myanmar
  'AZ', // Nagorno Karabakh (part of Azerbaijan)
  'CY', // Northern Cyprus
  'NI', // Nicaragua
  'PK', // Pakistan
  'PS', // Palestine
  'PA', // Panama
  'QA', // Qatar
  'RU', // Russian Federation
  'SO', // Somalia
  'GE', // South Ossetia (part of Georgia)
  'SS', // South Sudan
  'SD', // Sudan
  'SY', // Syrian Arab Republic
  'TG', // Togo
  'TT', // Trinidad and Tobago
  'UG', // Uganda
  'VE', // Venezuela
  'YE', // Yemen
  'UA', // Zaporizhzhia (part of Ukraine)
  'ZW', // Zimbabwe
  'PS', // West Bank
];

const allCountries = countryList().getData();

export const filteredCountries = allCountries.filter(
  (country) => !excludeCountries.includes(country.value)
);
