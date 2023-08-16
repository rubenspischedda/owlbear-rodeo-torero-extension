import { ItemRarity } from "./itemRarity";
import { Source } from "./source";

export interface Item {
    code:            string;
    name:            string;
    originalName:    string;
    source:          Source|undefined;
    page:            number;
    type:            ItemType|undefined;
    rarity:          ItemRarity|undefined;
    weight?:         number;
    weaponCategory?: WeaponCategory;
    age?:            Age;
    property?:       string[];
    range?:          string;
    reload?:         number;
    dmg1?:           string;
    dmgType?:        DmgType;
    firearm?:        boolean;
    weapon?:         boolean;
    ammoType?:       string;
    srd?:            boolean;
    basicRules?:     boolean;
    value?:          number;
    packContents?:   PackContent[];
    dmg2?:           string;
    axe?:            boolean;
    ac?:             number;
    armor?:          boolean;
    shield?:         boolean;
    strength?:       string;
    stealth?:        boolean;
    club?:           boolean;
    scfType?:        string;
    dagger?:         boolean;
    otherSources?:   Source[];
    sword?:          boolean;
    hasFluff?:       boolean;
    crossbow?:       boolean;
    spear?:          boolean;
    hammer?:         boolean;
    bow?:            boolean;
    mace?:           boolean;
    net?:            boolean;
    staff?:          boolean;
    reqAttune?:             boolean | string;
    reqAttuneTags?:         ItemReqAttuneTag[];
    wondrous?:              boolean;
    bonusSpellAttack?:      string;
    bonusSpellSaveDc?:      string;
    focus?:                 string[] | boolean;
    entries?:               Array<string> | { type: 'entries', name: string, entries: Array<string> }[];
    baseItem?:              string;
    bonusWeapon?:           string;
    grantsProficiency?:     boolean;
    tier?:                  Tier;
    recharge?:              Recharge;
    rechargeAmount?:        number | string;
    charges?:               number;
    tattoo?:                boolean;
    resist?:                string[];
    detail1?:               string;
    hasRefs?:               boolean;
    crew?:                  number;
    vehAc?:                 number;
    vehHp?:                 number;
    vehSpeed?:              number;
    capPassenger?:          number;
    capCargo?:              number;
    conditionImmune?:       string[];
    attachedSpells?:        string[];
    hasFluffImages?:        boolean;
    additionalSources?:     Source[];
    modifySpeed?:           ItemModifySpeed;
    ability?:               ItemAbility;
    seeAlsoVehicle?:        string[];
    vulnerable?:            string[];
    curse?:                 boolean;
    bonusAc?:               string;
    poison?:                boolean;
    poisonTypes?:           PoisonType[];
    immune?:                string[];
    sentient?:              boolean;
    containerCapacity?:     ContainerCapacity;
    atomicPackContents?:    boolean;
    bonusWeaponAttack?:     string;
    bonusSavingThrow?:      string;
    bonusWeaponCritDamage?: string;
    critThreshold?:         number;
    vehDmgThresh?:          number;
    bonusWeaponDamage?:     string;
    carryingCapacity?:      number;
    speed?:                 number;
    seeAlsoDeck?:           string[];
    reqAttuneAlt?:          string;
    bonusProficiencyBonus?: string;
    typeAlt?:               string;
    dexterityMax?:          null;
    crewMin?:               number;
    crewMax?:               number;
    travelCost?:            number;
    shippingCost?:          number;
    spellScrollLevel?:      number;
    bonusAbilityCheck?:     string;
    weightNote?:            string;
}

export interface PackContent {
    item?: Item;
    quantity?: number;
    special?:  string;
}

export interface DmgType {
    code: string;
    name: string;
    originalName: string;
}

export interface Age {
    code: string;
    name: string;
    originalName: string;
}

export interface WeaponCategory {
    code: string;
    name: string;
    originalName: string;
}

export interface ItemType {
    code: string;
    name: string;
    originalName: string;
}

export interface ItemModifySpeed {
    equal?:    PurpleEqual;
    multiply?: Multiply;
    static?:   ModifySpeedStatic;
    bonus?:    Bonus;
}

export interface Bonus {
    "*": number;
}

export interface PurpleEqual {
    fly?:    string;
    climb?:  string;
    burrow?: string;
    swim?:   string;
}

export interface Multiply {
    walk?: number;
    burrow?: number;
    swim?: number;
    fly?: number;
}

export interface ModifySpeedStatic {
    walk?:   number;
    burrow?: number;
    swim?:   number;
    fly?:    number;
}

export interface ItemReqAttuneTag {
    class?:               string;
    spellcasting?:        boolean;
    background?:          string;
    skillProficiency?:    string;
    alignment?:           string[];
    creatureType?:        string;
    race?:                string;
    psionics?:            boolean;
    languageProficiency?: string;
    size?:                DmgType;
    int?:                 number;
}

export enum Tier {
    Major = "major",
    Minor = "minor",
}

export enum Recharge {
    Dawn = "dawn",
    Dusk = "dusk",
    Midnight = "midnight",
    Special = "special",
}

export interface ItemAbility {
    static?: PurpleStatic;
    con?:    number;
    wis?:    number;
    choose?: Choose[];
    from?:   string[];
    count?:  number;
    amount?: number;
    str?:    number;
    dex?:    number;
    int?:    number;
    cha?:    number;
}

export interface Choose {
    from:    string[];
    count:   number;
    amount?: number;
}

export interface PurpleStatic {
    con?: number;
    str?: number;
    int?: number;
    cha?: number;
}

export enum PoisonType {
    Contact = "contact",
    Ingested = "ingested",
    Inhaled = "inhaled",
    Injury = "injury",
}

export interface ContainerCapacity {
    weight?:     number[];
    weightless?: boolean;
    item?:       { [key: string]: number }[];
}
