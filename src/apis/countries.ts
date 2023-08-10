const baseUrl = 'https://restcountries.com/v3.1';
const mockBaseUrl = '/api';

export interface Countries {
  status: 'success';
  countries: CountrySummary[];
}

export interface CountrySummary {
  name: {
    common: string;
  };
  cca3: string;
  flag: string;
  flags: {
    svg: string;
    alt: string;
  };
  continents: string[];
  subregion: string;
  capital: string[];
  unMember: boolean;
  landlocked: boolean;
  independent: boolean;
}

export interface Country extends CountrySummary {
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  population: number;
  tld: string[];
  demonyms: {
    [key: string]: {
      m: string;
      f: string;
    };
  };
  maps: {
    [key in 'googleMaps' | 'openStreetMaps']: string;
  };
  languages: {
    [key: string]: string;
  };
}

const timeoutMillis = 3000;
// toggle boolean value to switch beteen mock and real in dev mode
const useRealApi = process.env.NODE_ENV === 'production' || false;

export async function getAllCountries(): Promise<Countries | { status: 'error' }> {
  try {
    const requestUrl = useRealApi
      ? `${baseUrl}/all?fields=name,cca3,flag,flags,continents,subregion,capital,unMember,landlocked,independent`
      : `${mockBaseUrl}/mock-countries`;

    const response = await fetch(requestUrl, { signal: AbortSignal.timeout(timeoutMillis) });
    if (response.status !== 200) {
      throw new Error('Non-200 response returned');
    }
    return {
      status: 'success',
      countries: await response.json(),
    };
  } catch (error) {
    return { status: 'error' };
  }
}

export async function getCountryByCca3(
  cca3: string,
): Promise<{ country: Country; status: 'success' } | { status: 'error' }> {
  try {
    const requestUrl = useRealApi
      ? `${baseUrl}/alpha/${cca3}?fields=name,cca3,flag,flags,continents,subregion,capital,unMember,landlocked,independent,currencies,population,tld,demonyms,maps,languages`
      : `${mockBaseUrl}/mock-countries?cca3=${cca3}`;

    const response = await fetch(requestUrl, { signal: AbortSignal.timeout(timeoutMillis) });

    if (response.status !== 200) {
      throw new Error('Non-200 response returned');
    }

    return {
      status: 'success',
      country: await response.json(),
    };
  } catch (error) {
    return { status: 'error' };
  }
}
