import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { Ability } from "../../models/ability";
import { Character } from "../../models/character";

export default function AbilityBigBox({ character, ability, onValueChange }: { character: Character | undefined, ability: Ability, onValueChange: (value: number) => void }) {

    const [innerValue, setInnerValue] = useState(character?.stats?.abilities?.[ability.code]?.value ?? 10);
    const [valueWithBonus, setValueWithBonus] = useState(10);
    const [bonusAbility, setBonusAbility] = useState<{ value: number, reason: 'race'|'subrace'}[]>([]);

    useEffect(() => {
        const v = innerValue + (character?.race?.abilities?.[ability.code?.toLowerCase() ?? ''] ?? 0) + (character?.subRace?.abilities?.[ability.code?.toLowerCase() ?? ''] ?? 0);
        setValueWithBonus(v);
    }, [character, ability.code, innerValue]);

    useEffect(() => {
        if (character?.stats?.abilities?.[ability.code]?.value ?? 10 !== innerValue) {
            setInnerValue(character?.stats?.abilities?.[ability.code]?.value ?? 10);
        }
    }, [ability.code, character, innerValue, setInnerValue]);

    useEffect(() => {
        const bonus: { value: number, reason: 'race'|'subrace'}[] = [];

        const bonusFromRace = (character?.race?.abilities?.[ability.code?.toLowerCase() ?? ''] ?? 0);
        const bonusFromSubRace = (character?.subRace?.abilities?.[ability.code?.toLowerCase() ?? ''] ?? 0);

        if (bonusFromRace > 0) {
            bonus.push({ value: bonusFromRace, reason: 'race' });
        }

        if (bonusFromSubRace > 0) {
            bonus.push({ value: bonusFromSubRace, reason: 'subrace'});
        }
        setBonusAbility(bonus);
    }, [ability.code, character?.race, character?.subRace])

    return (
        <div className='relative'>
            <div className='border rounded flex flex-col justify-between'>
                <div className="h-4 w-full text-4xs text-center uppercase">{ability.name}</div>
                <div className='flex flex-col items-center justify-center'>
                    <div>{Math.floor((valueWithBonus - 10) / 2) >= 0 ? '+' : '-'} {Math.abs(Math.floor((valueWithBonus - 10) / 2))}</div>
                    {valueWithBonus !== innerValue && <div data-tooltip-id={`bonus_tooltip_${ability.code}`} className={`text-3xs cursor-pointer ${valueWithBonus > innerValue ? 'text-green-500' : 'text-red-500'}`}>({valueWithBonus})</div>}
                </div>
                <div className='h-4 w-full'></div>
            </div>
            <div className='border w-min px-2 rounded-full text-2xs mx-auto bottom-6 -mt-2 bg-gray-800'>
                <input value={innerValue} onChange={(event) => onValueChange(parseInt(event.target.value))} className='w-4 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent text-center border-none focus:border-none ring-transparent focus:ring-transparent' />
            </div>
            <Tooltip id={`bonus_tooltip_${ability.code}`} className='z-50' render={() => {
                return (
                    <div>
                        <div className='text-xs mb-2'>Ricevi i seguenti bonus:</div>
                        {bonusAbility.map((bonus) => {
                            return (
                                <div key={`ability_bonus_${bonus.reason}`} className='text-2xs'><span className={`uppercase font-medium ${bonus.value < 0 ? 'text-red-500' : 'text-green-500'}`}>{bonus.value < 0 ? '-' : '+'} {Math.abs(bonus.value)} {ability.name}</span> per la tua {bonus.reason === 'race' ? `razza` : `sottorazza`} {bonus.reason === 'race' ? character?.race?.name : `${character?.race?.name} ${character?.subRace?.name}`}</div>
                            );
                        })}
                    </div>
                )
            }} />
        </div>
    );
}
