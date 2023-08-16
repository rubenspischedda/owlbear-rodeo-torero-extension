import { Race } from '../models/race';
import * as it from '../texts/it.json';
import * as races from '../data/races.json';
import useSources from './useSources';
import { useEffect, useState } from 'react';

export default function useRaces(): Race[] {
  const racesTranslations = it.races;
  const sources = useSources();

  const [currentRaces, setCurrentRaces] = useState<Race[]>([]);

  useEffect(() => {
    const r = races.data
      .filter((r) => r.reprintedAs === undefined)
      .map((a) => {
        return {
          code: a.code,
          originalName: a.name,
          name:
            racesTranslations[a.code as keyof typeof racesTranslations] ??
            a.name,
          source: sources.find((s) => a.source === s.code),
          otherSources: [
            ...sources.filter((s) =>
              a.otherSources?.map((os) => os.source === s.code)
            ),
            ...sources.filter((s) =>
              a.additionalSources?.map((os) => os.source === s.code)
            ),
          ],
        };
      });

    setCurrentRaces(r);
  }, [racesTranslations, sources]);

  return currentRaces;
}
