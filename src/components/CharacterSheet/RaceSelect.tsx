import { groupBy } from "../../helpers/utils";
import useRaces from "../../hooks/useRaces";
import useSources from "../../hooks/useSources";
import { Race } from "../../models/race";

export default function RaceSelect({ race, onRaceChange }: { race?: Race, onRaceChange?: (race: Race | undefined) => void }) {
    const sources = useSources();
    const races = useRaces();
    return (
        <select className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' value={race?.code} onChange={(e) => onRaceChange?.(races.find(r => r.code === e.target.value))}>
            {Object.entries(groupBy(races, (r: Race) => r.source?.code ?? 'undefined')).sort(([source,]) => {
                if (source === 'PHB' || source === 'DMG') return -1;
                if (source === undefined || source === 'undefined' || source === '') return 1;
                return 0;
            }).map(([source, races], index) => {
                return (
                    <optgroup key={`racegroup_${source}_${index}`} label={sources.find(f => f.code === source)?.name ?? sources.find(f => f.code === source)?.originalName ?? 'Other'}>
                        {races.map((race, index) => {
                            return (
                                <option key={`race_${race.code}_${race.source?.id}_${index}`} value={race.code}>{race.name}</option>
                            );
                        })}
                    </optgroup>
                )
            })}
        </select>
    )
}
