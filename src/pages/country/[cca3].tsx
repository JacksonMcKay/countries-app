import { Country, getCountryByCca3 } from '@/apis/countries';
import { CountryTags } from '@/components/CountryTags';
import { ExternalLink } from '@/components/ExternalLink';
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../components/CountryTile.module.scss';

export default function CountryDetails() {
  const router = useRouter();
  const [countryData, setCountryData] = useState<
    | {
        country: Country | null;
        status: 'error' | 'loading';
        callRetry: boolean;
      }
    | {
        country: Country;
        status: 'success';
        callRetry: boolean;
      }
  >({ country: null, status: 'loading', callRetry: false });

  // TODO use redux instead. This isn't how useEffect should be used
  useEffect(() => {
    async function getCountry() {
      if (!router.query.cca3) {
        return;
      }
      const fetchResult = await getCountryByCca3(router.query.cca3 as string);
      if (fetchResult.status === 'success') {
        setCountryData({ ...countryData, country: fetchResult.country, status: 'success' });
      } else {
        setCountryData({ ...countryData, status: 'error' });
      }
    }
    getCountry();
  }, [countryData.callRetry, router]);
  return (
    <>
      <Head>
        <title>Country information - Countries app</title>
        <meta name='description' content='Detailed country information' />
      </Head>

      {countryData.status === 'success' && (
        <>
          <Head>
            <title>{countryData.country.name.common} - Countries app</title>
            <meta
              name='description'
              content={`${countryData.country.flag} ${
                countryData.country.name.common
              }: ${countryData.country.continents.join(', ')} ${
                countryData.country.subregion ? `- ${countryData.country.subregion}` : ''
              }`}
            />
          </Head>
          <Container>
            <Heading as='h2' size='lg'>
              {countryData.country.name.common}
            </Heading>
            <div className='flex items-end mb-4 justify-between gap-1'>
              <Image
                src={countryData.country.flags.svg}
                alt={countryData.country.flags.alt}
                className={`rounded-lg max-w-2xs max-h-[13rem] ${styles.flag}`}
                objectFit='contain'
                align='left top'
                fallback={
                  <div className='max-w-2xs min-h-[10.66rem] mb-4'>
                    <Skeleton width='100%' height='100%' rounded='lg'></Skeleton>
                  </div>
                }
              />
              <CountryTags {...countryData.country} column />
            </div>
            <TableContainer>
              <Table variant='striped' colorScheme='messenger'>
                <Tbody>
                  <Tr>
                    <Td>Continent</Td>
                    <Td>{countryData.country.continents.join(', ')}</Td>
                  </Tr>
                  <Tr>
                    <Td>Subregion</Td>
                    <Td>{countryData.country.subregion || 'N/A'}</Td>
                  </Tr>
                  <Tr>
                    <Td>Capital</Td>
                    <Td>{countryData.country.capital.join(', ')}</Td>
                  </Tr>
                  <Tr>
                    <Td>Languages</Td>
                    <Td>{Object.values(countryData.country.languages).join(', ')}</Td>
                  </Tr>
                  <Tr>
                    <Td>Currency</Td>
                    <Td>
                      {Object.entries(countryData.country.currencies)
                        .map(([currencyCode, { name, symbol }]) => `${symbol} - ${name} (${currencyCode})`)
                        .join(', ')}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Population</Td>
                    <Td>{Intl.NumberFormat().format(countryData.country.population)}</Td>
                  </Tr>
                  {getDemonyms(countryData.country.demonyms)}
                  <Tr>
                    <Td>Maps</Td>
                    <Td>
                      <ExternalLink href={countryData.country.maps.googleMaps}>Google Maps</ExternalLink>,{' '}
                      <ExternalLink href={countryData.country.maps.openStreetMaps}>Open Street Maps</ExternalLink>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>TLD</Td>
                    <Td>{countryData.country.tld.join(', ')}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        </>
      )}

      {countryData.status === 'loading' && (
        <div className='mt-4 flex justify-center w-full'>
          <Spinner size='xl' />
        </div>
      )}

      {countryData.status === 'error' && (
        <div className='mt-4 flex justify-center w-full'>
          <Alert status='error' className='max-w-xl'>
            <AlertIcon />
            <div className='flex items-center justify-between w-full'>
              An error occurred fetching the country information
              <Button
                colorScheme='red'
                className='mt-2'
                onClick={() => setCountryData({ ...countryData, status: 'loading', callRetry: !countryData.callRetry })}
              >
                Retry
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
}

function getDemonyms(demonyms: Country['demonyms']) {
  if (!demonyms['eng']) {
    return null;
  }

  if (demonyms.eng.m === demonyms.eng.f) {
    return (
      <Tr>
        <Td>Demonym</Td>
        <Td>{demonyms.eng.m}</Td>
      </Tr>
    );
  } else {
    return (
      <Tr>
        <Td>Demonyms</Td>
        <Td>
          female - {demonyms.eng.f}, male - {demonyms.eng.m}
        </Td>
      </Tr>
    );
  }
}
