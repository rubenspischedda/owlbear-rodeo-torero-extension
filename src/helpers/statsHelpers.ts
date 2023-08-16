import { Stats } from "../contexts/CharactersContext";
import { Ability } from "../models/ability";
import { Skill } from "../models/skill";

export function generateStandardStats(abilities: Ability[], skills: Skill[]): Stats {
    return {
        abilities: generateStandardAbilities(abilities),
        skills: generateStandardSkills(skills)
    }
}

function generateStandardAbilities(abilities: Ability[]): Record<string, { proficiency?: boolean, value: number }> {
    return abilities.reduce((acc, curr) => {
        acc[curr.code] = { value: 10 };
        return acc;
    }, {} as Record<string, { proficiency?: boolean, value: number }>);
}

function generateStandardSkills(skills: Skill[]): Record<string, { proficiency?: boolean, value: number }> {
    return skills.reduce((acc, curr) => {
        acc[curr.code] = { value: 0 };
        return acc;
    }, {} as Record<string, { proficiency?: boolean, value: number }>);
}
