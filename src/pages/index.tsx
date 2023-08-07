import { Country, getAllCountries } from '@/apis/countries';
import { CountryListItem } from '@/components/country-list-item';
import CountryTile from '@/components/country-tile';
import { TabButton } from '@/components/tab-button';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  IconButton,
  SkipNavContent,
  SkipNavLink,
  Spinner,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [countries, setCountries] = useState<{
    countriesList: Country[] | null;
    status: 'success' | 'error' | 'loading';
    callRetry: boolean;
    showAll: boolean;
  }>({ countriesList: null, status: 'loading', callRetry: false, showAll: false });
  const [listStyle, setListStyle] = useState<'compact' | 'full'>('compact');
  const { toggleColorMode } = useColorMode();

  // Note: Turns out this isn't an idiomatic way of using useEffect. Maybe refactor later
  useEffect(() => {
    async function getCountries() {
      const fetchResult = await getAllCountries();
      if (fetchResult.status === 'success') {
        setCountries({ ...countries, countriesList: fetchResult.countries, status: 'success' });
      } else {
        setCountries({ ...countries, status: 'error' });
      }
    }
    getCountries();
  }, [countries.callRetry]);

  const themeIcon = useColorModeValue(<SunIcon />, <MoonIcon />);

  return (
    <>
      <Head>
        <title>Countries app</title>
        <meta name='description' content='An app for finding information about a country' />
      </Head>
      <SkipNavLink>Skip to content</SkipNavLink>
      <header className='flex justify-center mx-[-1rem] mt-[-1rem] pt-4 pb-4 mb-6 shadow dark:shadow-gray-700'>
        <Heading as='h1' className='text-center'>
          Countries
        </Heading>
        <IconButton
          aria-label='Toggle theme'
          icon={themeIcon}
          onClick={toggleColorMode}
          style={{ position: 'absolute', right: '1rem' }}
        />
      </header>
      <main>
        <SkipNavContent />
        {countries.status === 'error' && (
          <div className='mt-4 flex justify-center w-full'>
            <Alert status='error' className='max-w-xl'>
              <AlertIcon />
              <div className='flex items-center justify-between w-full'>
                An error occurred fetching countries
                <Button
                  colorScheme='red'
                  className='mt-2'
                  onClick={() => setCountries({ ...countries, status: 'loading', callRetry: !countries.callRetry })}
                >
                  Retry
                </Button>
              </div>
            </Alert>
          </div>
        )}
        {/* Let screen reader users know which view mode they're in because we're hiding the selected button */}
        {countries.status !== 'error' && (
          <>
            <span className='sr-only' id='viewMode' tabIndex={-1}>
              {`Using ${listStyle === 'compact' ? 'compact' : 'pretty'} view mode`}
            </span>
            <div className='mt-4 mb-4 flex justify-center w-full'>
              <TabButton
                isSelected={listStyle === 'compact'}
                onClick={() => {
                  // Honestly, it would make more sense to use actual routing instead of doing this focus trick when the view changes. Sticking with this though
                  document.getElementById('viewMode')?.focus();
                  setListStyle('compact');
                }}
                label='Switch to compact view mode'
              >
                Compact
              </TabButton>
              <TabButton
                isSelected={listStyle === 'full'}
                onClick={() => {
                  document.getElementById('viewMode')?.focus();
                  setListStyle('full');
                }}
                label='Switch to pretty view mode'
              >
                Pretty
              </TabButton>
            </div>
          </>
        )}

        {countries.status === 'loading' && (
          <div className='mt-4 flex justify-center w-full'>
            <Spinner size='xl' />
          </div>
        )}

        {countries.status === 'success' && (
          <>
            {getCountriesList(countries.countriesList, listStyle, countries.showAll)}
            {!countries.showAll && (
              // Note: It would be nice to pull focus so screen readers aren't booted off the edge of the page. TODO when the countries are links
              <div className='mt-4 flex justify-center w-full'>
                <Button onClick={() => setCountries({ ...countries, showAll: true })}>Show all</Button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

const initialNumberOfItems = 12;

function getCountriesList(countriesList: Country[] | null, type: 'full' | 'compact', showAll: boolean) {
  if (!countriesList || countriesList.length === 0) {
    return <div>No countries</div>;
  }
  return type === 'full' ? (
    <div className='flex flex-wrap'>
      {countriesList.slice(0, showAll ? undefined : initialNumberOfItems).map((country) => (
        <div className='p-2 w-full sm:w-[50%] xl:w-[33.3%] 2xl:w-[25%]' key={country.cca3}>
          <CountryTile {...country}></CountryTile>
        </div>
      ))}
    </div>
  ) : (
    <div className='flex flex-wrap'>
      {countriesList.slice(0, showAll ? undefined : initialNumberOfItems).map((country) => (
        <div className='p-2 w-full sm:w-[50%] xl:w-[33.3%] 2xl:w-[25%]' key={country.cca3}>
          <CountryListItem {...country}></CountryListItem>
        </div>
      ))}
    </div>
  );
}
