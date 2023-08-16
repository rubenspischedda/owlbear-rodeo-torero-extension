import * as it from '../texts/it.json';
import * as baseItems from '../data/items-base.json';
import * as items from '../data/items.json';
import { Item } from '../models/item';
import useSources from './useSources';
import useItemTypes from './useItemTypes';
import useItemRarities from './useItemRarities';
import { useCallback, useEffect, useState } from 'react';


export default function useItems() {
    const { data: baseItemsData } = baseItems;
    const { data: itemsData } = items;

    const [mergedItems, setMergedItems] = useState<Item[]>([]);
    
    type ItemsType = typeof baseItemsData;
    type Unpacked<T> = T extends (infer U)[] ? U : T;
    type UnpackedItem = Unpacked<ItemsType>;
    const itemsTranslations = it.items;
    const sources = useSources();
    const itemTypes = useItemTypes();
    const itemRarities = useItemRarities();

    const itemsReducer = useCallback((item: UnpackedItem) => {

        const newItem: Item = {
            code: item.code,
            name: itemsTranslations[item.code as keyof typeof itemsTranslations],
            originalName: item.name,
            source: sources.find(source => source.code === item. source),
            page: item.page,
            type: itemTypes.find(type => type.code === item.type),
            rarity: itemRarities.find(rarity => rarity.code === item.rarity),
            armor: item.armor,
            sword: item.sword,
            weapon: item.weapon,
            value: item.value,
            shield: item.type === 'S',
            weight: item.weight,
            ac: item.ac,
            strength: item.strength,
            stealth: item.stealth,
            axe: item.axe,
            bow: item.bow,
            crossbow: item.crossbow,
            dagger: item.dagger,
            entries: item.entries?.flatMap(entry => {
                if (entry instanceof String || typeof entry === 'string') {
                    return entry;
                } else {
                    return entry.entries;
                }
            }) as string[],
        }

        return newItem;
    }, [sources, itemTypes, itemRarities, itemsTranslations])

    useEffect(() => {
        setMergedItems([...baseItemsData.map(itemsReducer), ...itemsData.map(itemsReducer)]);
    }, [sources, baseItemsData, itemsData, itemsReducer, setMergedItems]);
    
    return mergedItems;
}
