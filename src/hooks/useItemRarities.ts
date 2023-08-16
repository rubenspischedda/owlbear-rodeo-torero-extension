import { ItemRarity } from '../models/itemRarity';
import * as it from '../texts/it.json';
import * as itemRarities from '../data/item-rarities.json';
import { useEffect, useState } from 'react';

export default function useItemRarities(): ItemRarity[] {
    const itemRaritiesTranslations = it.itemRarities;

    const [currentItemRarities, setCurrentItemRarities] = useState<ItemRarity[]>([]);

    useEffect(() => {
        const rarities = itemRarities.data.map((itemRarity) => {
            return {
                code: itemRarity.code,
                name: itemRaritiesTranslations[itemRarity.code as keyof typeof itemRaritiesTranslations],
                originalName: itemRarity.name,
                value: itemRarity.value ?? undefined
            }
        });
        setCurrentItemRarities(rarities);
    }, [itemRaritiesTranslations]);

    return currentItemRarities;
}
