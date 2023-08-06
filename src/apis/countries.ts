const baseUrl = 'https://restcountries.com/v3.1';
const mockBaseUrl = '/api';

export interface Countries {
  status: 'success';
  countries: Country[];
}

export interface Country {
  name: {
    common: string;
  };
  cca3: string;
  flag: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
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

// toggle boolean value to switch beteen mock and real in dev mode
const useRealApi = process.env.NODE_ENV === 'production' || false;

export async function getAllCountries(): Promise<Countries | { status: 'error' }> {
  try {
    const requestUrl = useRealApi
      ? `${baseUrl}/all?fields=name,cca3,flag,currencies,flags,continents,subregion,capital,unMember,landlocked,independent`
      : `${mockBaseUrl}/mock-countries`;

    return {
      status: 'success',
      countries: await (await fetch(requestUrl, { signal: AbortSignal.timeout(3000) })).json(),
    };
  } catch (error) {
    return { status: 'error' };
  }
}
