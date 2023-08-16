import { useEffect, useState } from "react";
import { Ability } from "../../models/ability";

export default function AbilityBigBox({ ability, value, onValueChange }: { ability: Ability, value: number, onValueChange: (value: number) => void }) {

    const [isEditing, setIsEditing] = useState(true);

    const [innerValue, setInnerValue] = useState(value);

    useEffect(() => {
        if (value !== innerValue) {
            setInnerValue(value);
        }
    }, [value, innerValue, setInnerValue]);

    return (
        <div className='relative'>
            <div className='border rounded flex flex-col justify-between'>
                <div className="h-4 w-full text-4xs text-center uppercase">{ability.name}</div>
                <div className='flex items-center justify-center'>{Math.floor((value - 10) / 2) >= 0 ? '+' : '-'} {Math.abs(Math.floor((value - 10) / 2))}</div>
                <div className='h-4 w-full'></div>
            </div>
            <div className='border w-min px-2 rounded-full text-2xs mx-auto bottom-6 -mt-2 bg-gray-800'>
                { isEditing && <input onBlur={() => setIsEditing(true)} value={innerValue} onChange={(event) => onValueChange(parseInt(event.target.value))} className='w-4 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent text-center border-none focus:border-none ring-transparent focus:ring-transparent'/>}
                { !isEditing && <div onClick={() => setIsEditing(true)} className='selectNone'>{value}</div> }
            </div>
        </div>
    );
}
