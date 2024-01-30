import { CountrySummary } from '@/apis/countries';
import { Tag } from '@chakra-ui/react';

export function CountryTags(props: CountrySummary & { column?: boolean, alignItemsEnd?: boolean }) {
  const tags = [];
  if (props.unMember) tags.push({ name: 'UN member', colorScheme: 'blue' });
  if (props.landlocked) tags.push({ name: 'Landlocked', colorScheme: 'teal' });
  if (!props.independent) tags.push({ name: 'Not independent', colorScheme: 'cyan' });

  return tags.length > 0 ? (
    <div className={`flex gap-1 pt-2 h-full ${props.alignItemsEnd ? 'items-end' : undefined} ${props.column ? 'flex-col' : undefined}`}>
      {tags.map((tag) => (
        <Tag colorScheme={tag.colorScheme} key={tag.name} justifyContent={'center'}>
          {tag.name}
        </Tag>
      ))}
    </div>
  ) : null;
}
