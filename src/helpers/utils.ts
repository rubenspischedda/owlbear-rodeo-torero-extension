import { Character } from '../models/character';
import { Equipment } from '../models/equipment';

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getBonusFromValue({
  base,
  proficiency,
  other,
}: {
  base: number;
  proficiency?: { active: boolean; value: number };
  other?: number;
}): { value: number; absoluteValue: number; sign: '+' | '-' } {
  const value =
    Math.floor((base - 10) / 2) +
    (proficiency?.active ? proficiency.value : 0) +
    (other ?? 0);

  return {
    value,
    absoluteValue: Math.abs(value),
    sign: value >= 0 ? '+' : '-',
  };
}

export function getCharacterArmorClass(
  character?: Character,
  characterEquipment?: Equipment[],
  shieldIncluded: boolean = true
): number {
  if (character === undefined || characterEquipment === undefined) return 0;
  const armor = characterEquipment?.find?.(
    (f) => f.item.armor && !f.item.shield && f.equipped
  );
  const shield = shieldIncluded
    ? characterEquipment?.find((f) => f.item.shield && f.equipped)
    : undefined;

  return calculateArmorClass({ dex: character.stats.abilities?.['DEX']?.value ?? 0, armor, shield });
}

export function getArmorClassFromDexAndEquipment({ dex, equipment}: { dex: number, equipment: Equipment[] }): number {
  const armor = equipment?.find?.(
    (f) => f.item.armor && !f.item.shield && f.equipped
  );
  const shield = equipment?.find((f) => f.item.shield && f.equipped);

  return calculateArmorClass({ dex, armor, shield });
}

export function calculateArmorClass({ dex, armor, shield }: { dex: number; armor?: Equipment; shield?: Equipment }): number {
  const dexBonus = getBonusFromValue({ base: dex }).value;

  if (armor === undefined) {
    return dexBonus + 10 + (shield?.item.ac ?? 0);
  }

  let armorValue = 0;
  if (armor?.item?.type?.code === 'LA') {
    armorValue = (armor?.item?.ac ?? 0) + dexBonus;
  } else if (armor?.item?.type?.code === 'MA') {
    armorValue = (armor?.item?.ac ?? 0) + (dexBonus > 2 ? 2 : dexBonus);
  } else if (armor?.item?.type?.code === 'HA') {
    armorValue = armor?.item?.ac ?? 0;
  }

  return armorValue + (shield?.item?.ac ?? 0);
}

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
