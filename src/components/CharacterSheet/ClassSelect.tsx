import { groupBy } from "../../helpers/utils";
import useClasses from "../../hooks/useClasses";
import useSources from "../../hooks/useSources";
import { LifeClass } from "../../models/lifeClass";

export default function ClassSelect({ characterClass, onClassChange }: { characterClass?: LifeClass, onClassChange: (newClass: LifeClass|undefined) => void }) {
    const sources = useSources();
    const classes = useClasses();
    
    return (
        <select className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' value={characterClass?.code} onChange={(e) => onClassChange(classes.find(r => r.code === e.target.value))}>
            {Object.entries(groupBy(classes, (r: LifeClass) => r.source?.code ?? 'undefined')).sort(([source,]) => {
                if (source === 'PHB' || source === 'DMG') return -1;
                if (source === undefined || source === 'undefined' || source === '') return 1;
                return 0;
            }).map(([source, classes]) => {
                return (
                    <optgroup key={'classgroup_' + source} label={sources.find(f => f.code === source)?.name ?? sources.find(f => f.code === source)?.originalName ?? 'Other'}>
                        {classes.map(lifeClass => {
                            return (
                                <option key={'class_' + lifeClass.code + '_' + lifeClass.source?.id} value={lifeClass.code}>{lifeClass.name}</option>
                            );
                        })}
                    </optgroup>
                )
            })}
        </select>
    )
}
