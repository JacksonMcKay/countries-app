import { Country } from '@/apis/countries';
import { Card, Heading, Image, Skeleton, Tag, Text } from '@chakra-ui/react';
import styles from './country-tile.module.scss';

export default function CountryTile(country: Country) {
  const tags = getTags(country);

  return (
    <Card className='p-4 h-full'>
      <div className='w-full flex justify-between items-center mb-1'>
        <Heading as='h2' size='lg'>
          {country.name.common}
        </Heading>
        <Text className='ml-1'>{country.continents.join(', ')}</Text>
      </div>

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
      <Text>Subregion: {country.subregion}</Text>
      <Text>Capital: {country.capital.join(', ')}</Text>
      <Text>
        Currency:{' '}
        {Object.entries(country.currencies)
          .map(([currencyCode, { name, symbol }]) => `${symbol} - ${name} (${currencyCode})`)
          .join(', ')}
      </Text>
      {tags}
    </Card>
  );
}

function getTags(country: Country) {
  const tags = [];
  if (country.unMember) tags.push({ name: 'UN member', colorScheme: 'blue' });
  if (country.landlocked) tags.push({ name: 'Landlocked', colorScheme: 'teal' });
  if (!country.independent) tags.push({ name: 'Not independent', colorScheme: 'cyan' });

  const tagsList =
    tags.length > 0 ? (
      <div className='flex gap-1 pt-2 h-full items-end'>
        {tags.map((tag) => (
          <Tag colorScheme={tag.colorScheme} key={tag.name}>
            {tag.name}
          </Tag>
        ))}
      </div>
    ) : null;
  return tagsList;
}
