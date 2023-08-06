import { Country } from '@/apis/countries';

export default function CountryTile(country: Country) {
  return (
    <>
      {country.flag} {country.cca3} &mdash; {country.name.common}
    </>
  );
}
