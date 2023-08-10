import { CountrySummary } from '@/apis/countries';
import { Card, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export function CountryListItem(country: CountrySummary) {
  return (
    <LinkBox h='full'>
      <Card className='p-3 h-full' direction='row' alignItems='center'>
        <Text className='ml-1 mr-3' fontSize='4xl' aria-hidden='true'>
          {country.flag}
        </Text>
        <div>
          <Heading as='h2' size='md'>
            <LinkOverlay as={NextLink} href={`/country/${country.cca3}`}>
              {country.name.common}
            </LinkOverlay>
          </Heading>
          <div>
            {country.continents.join(', ')} ({country.subregion})
          </div>
        </div>
      </Card>
    </LinkBox>
  );
}
