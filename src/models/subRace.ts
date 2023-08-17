import { Race } from "./race";
import { Source } from "./source";

export interface SubRace {
    code: string;
    originalName: string;
    name: string;
    source?: Source;
    otherSources: Source[];
    race?: Race;
    raceSource?: Source;
    abilities: Record<string, number>;
} 
