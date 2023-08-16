import { useEffect, useState } from 'react';
import useItems from './useItems';

export default function useFilteredItems(
  query?: string | undefined,
  armorFilter?: boolean | undefined,
  weaponFilter?: boolean | undefined,
  itemsFilter?: boolean | undefined
) {
  const items = useItems();

  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    let fItems = items;
    if (query !== undefined && query !== '') {
      fItems = fItems.filter((item) => {
        const itemTranslatedName = item?.name?.toLowerCase() ?? '';
        const itemOriginalName = item?.originalName?.toLowerCase() ?? '';
        const itemText = itemTranslatedName + itemOriginalName;
        const filter = query?.toLowerCase() ?? '';
        return itemText.includes(filter);
      });
    }

    if (armorFilter !== undefined) {
      fItems = fItems.filter((item) => {
        return item?.armor === armorFilter || item?.shield === armorFilter;
      });
    }

    if (weaponFilter !== undefined) {
      fItems = fItems.filter((item) => {
        return item?.weapon === weaponFilter;
      });
    }

    if (itemsFilter !== undefined) {
      fItems = fItems.filter((item) => {
        return !(item?.armor === true || item?.weapon === true || item?.shield === true);
      });
    }

    setFilteredItems(fItems);
  }, [query, armorFilter, items, weaponFilter, itemsFilter]);

  return filteredItems;
}
