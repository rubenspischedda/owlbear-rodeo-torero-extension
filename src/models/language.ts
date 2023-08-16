import { Source } from "./source";

export interface Language {
    code: string;
    originalName: string;
    name: string;
    source?: Source;
    otherSources?: Source[];
}
