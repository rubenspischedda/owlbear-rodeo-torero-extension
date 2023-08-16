import { ItemType } from '../models/item';
import * as itemTypes from '../data/item-types.json';
import * as it from '../texts/it.json';
import { useEffect, useMemo, useState } from 'react';

export default function useItemTypes(): ItemType[] {
  const itemTypesTranslations = it.itemTypes;

  const [currentItemTypes, setCurrentItemTypes] = useState<ItemType[]>([]);

  const hardcodedItemTypes = useMemo(() => [
    {
      abbreviation: 'S',
      name: 'Shield',
    },
    {
      abbreviation: 'LA',
      name: 'Light Armor',
    },
    {
      abbreviation: 'MA',
      name: 'Medium Armor',
    },
    {
      abbreviation: 'HA',
      name: 'Heavy Armor',
    },
  ], []);

  useEffect(() => {
    const types = [...itemTypes.data, ...hardcodedItemTypes].map((itemType) => {
      return {
        code: itemType.abbreviation ?? '',
        name: itemTypesTranslations[
          itemType.abbreviation as keyof typeof itemTypesTranslations
        ],
        originalName: itemType.name ?? '',
      };
    });
    setCurrentItemTypes(types);
  }, [hardcodedItemTypes, itemTypesTranslations]);

  return currentItemTypes;
}
