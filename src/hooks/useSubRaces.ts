import * as it from '../texts/it.json';
import * as subRaces from '../data/sub-races.json';
import useSources from './useSources';
import { useEffect, useState } from 'react';
import { SubRace } from '../models/subRace';
import useRaces from './useRaces';

export default function useSubRaces(race?: string): SubRace[] {
  const subracesTranslations = it.subraces;
  const races = useRaces();
  const sources = useSources();

  const [currentSubRaces, setCurrentSubRaces] = useState<SubRace[]>([]);

  useEffect(() => {
    const r = subRaces.data
      .filter((r) => r.reprintedAs === undefined)
      .filter((f) => race ? f.raceCode === race : true)
      .map((a) => {
        const race = races.find(f => f.code === a.raceCode && f?.source?.code === a.raceSource);
        const abilitiesBonus: {
          [x: string]: any;
      } | undefined = a.ability?.flatMap(f => Object.entries(f).map(([k, v]) => ({[k]: v})))?.reduce((prev, cur) => ({ ...prev, ...cur }), {});

        return {
          code: a.code ?? '',
          originalName: a.name ?? '',
          abilities: abilitiesBonus ?? {},
          name:
            subracesTranslations[`${race?.code}_${a.code}` as keyof typeof subracesTranslations] ??
            a.name,
          source: sources.find((s) => a.source === s.code),
          otherSources: [
            ...sources.filter((s) =>
              a.otherSources?.map((os) => os.source === s.code)
            ),
          ],
          race,
        };
      });

    setCurrentSubRaces(r);
  }, [subracesTranslations, sources, race, races]);

  return currentSubRaces;
}
