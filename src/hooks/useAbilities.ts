import { Ability } from "../models/ability";
import * as it from "../texts/it.json";
import * as abilities from "../data/abilities.json";

export default function useAbilities(): Ability[] {
    const abilitiesTranslations = it.abilities;

    return abilities.data.map(a => {
        return {
            code: a.code,
            originalName: a.code,
            name: abilitiesTranslations[a.code as keyof typeof abilitiesTranslations]
        }
    });
}
