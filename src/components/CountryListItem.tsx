import { Country } from '@/apis/countries';
import { Card, Heading, Text } from '@chakra-ui/react';

export function CountryListItem(country: Country) {
  return (
    <Card className='p-3' direction='row' alignItems='center'>
      <Text className='ml-1 mr-3' fontSize='4xl' aria-hidden='true'>
        {country.flag}
      </Text>
      <div>
        <Heading as='h2' size='md'>
          {country.name.common}
        </Heading>
        <div>
          {country.continents.join(', ')} ({country.subregion})
        </div>
      </div>
    </Card>
  );
}
