declare module 'react-select-country-list' {
  interface Country {
    value: string;
    label: string;
  }
  
  interface CountryList {
    getData(): Country[];
  }
  
  function countryList(): CountryList;
  export default countryList;
}
