import * as it from "../texts/it.json";
import * as skills from "../data/skills.json";
import { Skill } from "../models/skill";

export default function useSkills(): Skill[] {
    const skillsTranslations = it.skills;

    return skills.data.map(a => {
        return {
            code: a.code,
            abilityCode: a.ability_code,
            originalName: a.name,
            name: skillsTranslations[a.code as keyof typeof skillsTranslations]
        }
    });
}
