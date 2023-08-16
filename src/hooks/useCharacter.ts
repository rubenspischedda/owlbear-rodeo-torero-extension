import { useCallback, useEffect, useState } from 'react';
import { StatsWithValue } from '../contexts/CharactersContext';
import { uuidv4 } from '../helpers/utils';
import { Character } from '../models/character';
import useAbilities from './useAbilities';
import { useCharactersContext } from './useCharactersContext';
import useSkills from './useSkills';
import { Ability } from '../models/ability';
import { Skill } from '../models/skill';
import { DieType } from '../models/dieType';

export function useCharacter(id: string | undefined): Character | undefined {
  const [currentId, setCurrentId] = useState<string | undefined>(id);

  useEffect(() => {
    setCurrentId(id);
  }, [id]);

  const abilities = useAbilities();
  const skills = useSkills();

  const charactersContext = useCharactersContext();

  const createNewCharacter = useCallback((): Character => {
    const defaultAbilities: StatsWithValue = {};
    const defaultSkills: StatsWithValue = {};

    abilities.forEach((ability) => {
      defaultAbilities[ability.code] = { proficiency: false, value: 10 };
    });

    skills.forEach((skill) => {
      defaultSkills[skill.code] = { proficiency: false, value: 0 };
    });

    return {
      id: uuidv4(),
      name: '',
      class: undefined,
      race: undefined,
      level: 1,
      background: undefined,
      size: undefined,
      alignment: undefined,
      inspiration: false,
      savingThrowsAgainstDeath: {
        success: 0,
        fail: 0,
      },
      currentHp: 10,
      maxHp: 10,
      hitDice: { quantity: 1, dieType: DieType.d4 },
      languages: [],
      speed: 30,
      temporaryHp: 0,
      stats: {
        abilities: defaultAbilities,
        skills: defaultSkills,
      },
      equipment: [],
    };
  }, [abilities, skills]);

  const [currentCharacter, setCurrentCharacter] = useState<
    Character | undefined
  >();

  useEffect(() => {
    if (currentId === undefined) {
      const newCharacter = createNewCharacter();
      setCurrentId(newCharacter.id);
      setCurrentCharacter(newCharacter);
      console.log('creating new character');
    } else {
      const chara =
        charactersContext.characters[currentId] ?? createNewCharacter();
      setCurrentCharacter(chara);
      setCurrentId(chara.id);
      console.log('assigning character');
    }
  }, [currentId, charactersContext, createNewCharacter]);

  useEffect(() => {
    if (currentCharacter === undefined) return;
    console.log('setting character', currentCharacter);
    charactersContext.setCharacters((characters: Record<string, Character>) => {
      console.log('setting character from useCharacter', currentCharacter);
      return {
        ...characters,
        [currentCharacter.id]: currentCharacter,
      };
    });
  }, [currentCharacter, charactersContext]);

  return currentCharacter;
}

export function createNewCharacter(
  abilities: Ability[],
  skills: Skill[]
): Character {
  const defaultAbilities: StatsWithValue = {};
  const defaultSkills: StatsWithValue = {};

  abilities.forEach((ability) => {
    defaultAbilities[ability.code] = { proficiency: false, value: 10 };
  });

  skills.forEach((skill) => {
    defaultSkills[skill.code] = { proficiency: false, value: 0 };
  });

  return {
    id: uuidv4(),
    name: '',
    class: undefined,
    race: undefined,
    level: 1,
    background: undefined,
    size: undefined,
    alignment: undefined,
    stats: {
      abilities: defaultAbilities,
      skills: defaultSkills,
    },
    inspiration: false,
    savingThrowsAgainstDeath: {
      success: 0,
      fail: 0,
    },
    currentHp: 10,
    maxHp: 10,
    hitDice: { quantity: 1, dieType: DieType.d4 },
    languages: [],
    speed: 30,
    temporaryHp: 0,
    equipment: [],
  };
}
