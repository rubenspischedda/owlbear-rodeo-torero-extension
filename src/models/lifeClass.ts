import { Source } from "./source";

export interface LifeClass {
    code: string;
    originalName: string;
    name: string;
    source?: Source;
    reasons: string[];
} 
