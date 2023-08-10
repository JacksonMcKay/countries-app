import { CountrySummary } from '@/apis/countries';
import { Card, Heading, Image, LinkBox, LinkOverlay, Skeleton, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { CountryTags } from './CountryTags';
import styles from './CountryTile.module.scss';

export default function CountryTile(country: CountrySummary) {
  return (
    <LinkBox h='full'>
      <Card className='p-4 h-full'>
        <div className='w-full flex justify-between items-center mb-1'>
          <Heading as='h2' size='lg'>
            {country.name.common}
          </Heading>
          <Text className='ml-1'>{country.continents.join(', ')}</Text>
        </div>

        {/* Another overlay here as for some reason the image couldn't be clicked without it */}
        <LinkOverlay as={NextLink} href={`/country/${country.cca3}`} aria-label={`${country.name.common} flag`}>
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            className={`rounded-lg max-w-2xs max-h-[13rem] mb-4 ${styles.flag}`}
            objectFit='contain'
            align='left top'
            fallback={
              <div className='max-w-2xs min-h-[10.66rem] mb-4'>
                <Skeleton width='100%' height='100%' rounded='lg'></Skeleton>
              </div>
            }
          />
        </LinkOverlay>
        <Text>Subregion: {country.subregion}</Text>
        <Text>Capital: {country.capital.join(', ')}</Text>
        <CountryTags {...country} />
      </Card>
    </LinkBox>
  );
}
