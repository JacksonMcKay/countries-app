import { Country, getAllCountries } from '@/apis/countries';
import CountryTile from '@/components/country-tile';
import { Alert, AlertIcon, Button, Heading, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [countries, setCountries] = useState<{
    countries: Country[] | null;
    status: 'success' | 'error' | 'loading';
    callRetry: boolean;
  }>({ countries: null, status: 'loading', callRetry: false });

  useEffect(() => {
    async function getCountries() {
      const fetchResult = await getAllCountries();
      if (fetchResult.status === 'success') {
        setCountries({ countries: fetchResult.countries, status: 'success', callRetry: countries.callRetry });
      } else {
        setCountries({ status: 'error', countries: countries.countries, callRetry: countries.callRetry });
      }
    }
    getCountries();
  }, [countries.callRetry]);

  return (
    <main>
      <Head>
        <title>Countries app</title>
        <meta name='description' content='An app for finding information about a country' />
      </Head>
      <header className='mx-[-1rem] mt-[-1rem] pt-4 pb-4 mb-6 shadow'>
        <Heading as='h1' className='text-center'>
          Countries
        </Heading>
      </header>
      {countries.status === 'error' && (
        <div className='mt-4 flex justify-center w-full'>
          <Alert status='error' className='max-w-xl'>
            <AlertIcon />
            <div className='flex items-center justify-between w-full'>
              An error occurred fetching countries
              <Button
                colorScheme='red'
                className='mt-2'
                onClick={() =>
                  setCountries({ status: 'loading', callRetry: !countries.callRetry, countries: countries.countries })
                }
              >
                Retry
              </Button>
            </div>
          </Alert>
        </div>
      )}
      {countries.status === 'loading' && (
        <div className='mt-4 flex justify-center w-full'>
          <Spinner size='xl' />
        </div>
      )}

      {countries.status === 'success' && getCountriesList(countries.countries)}
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
