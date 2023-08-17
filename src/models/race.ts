import { Source } from "./source";

export interface Race {
    code: string;
    originalName: string;
    name: string;
    source?: Source;
    otherSources: Source[];
    abilities: Record<string, number>;
} 
