import { Country, getAllCountries } from '@/apis/countries';
import CountryTile from '@/components/country-tile';
import { Alert, AlertIcon, Heading, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [status, setStatus] = useState<'success' | 'error' | 'loading'>('loading');

  useEffect(() => {
    async function getCountries() {
      const fetchResult = await getAllCountries();
      if (fetchResult.status === 'success') {
        setCountries(fetchResult.countries);
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
    getCountries();
  }, []);

  return (
    <main>
      <Head>
        <title>Countries app</title>
        <meta name='description' content='An app for finding information about a country' />
      </Head>
      <Heading as='h1'>Countries</Heading>
      {status === 'error' && (
        <Alert status='error'>
          <AlertIcon />
          An error occurred fetching countries
        </Alert>
      )}
      {status === 'loading' && <Spinner />}

      {status === 'success' && getCountriesList(countries)}
    </main>
  );
}

function getCountriesList(countries: Country[] | null) {
  if (!countries || countries.length === 0) {
    return <div>No countries</div>;
  }
  return (
    <div className='flex flex-wrap'>
      {countries.map((country) => (
        <div className='p-2 w-full sm:w-[50%] xl:w-[33.3%] 2xl:w-[25%]' key={country.cca3}>
          <CountryTile {...country}></CountryTile>
        </div>
      ))}
    </div>
  );
}
