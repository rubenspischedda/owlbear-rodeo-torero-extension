import { Stats } from "../contexts/CharactersContext";
import { Alignment } from "./alignment";
import { Background } from "./background";
import { Die } from "./die";
import { Equipment } from "./equipment";
import { Language } from "./language";
import { LifeClass } from "./lifeClass";
import { Race } from "./race";
import { Size } from "./size";
import { SubRace } from "./subRace";

export interface Character {
    id: string;
    name: string;
    class: LifeClass|undefined;
    race: Race|undefined;
    subRace: SubRace|undefined;
    level: number;
    background: Background|undefined;
    size: Size|undefined;
    alignment: Alignment|undefined;
    stats: Stats;
    inspiration: boolean;
    speed: number;
    maxHp: number;
    currentHp: number;
    temporaryHp: number;
    hitDice: Die;
    languages: Language[];
    savingThrowsAgainstDeath: {
        success: number;
        fail: number;
    },
    equipment: Equipment[];
}
