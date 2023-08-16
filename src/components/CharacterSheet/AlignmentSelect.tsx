import { useAlignments } from "../../hooks/useAlignments";
import { Alignment } from "../../models/alignment";

export default function AlignmentSelect({ alignment, onAlignmentChange }: { alignment?: Alignment, onAlignmentChange: (alignment: Alignment | undefined) => void }) {
    const alignments = useAlignments();

    return (
        <select className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' value={alignment?.code} onChange={(e) => onAlignmentChange(alignments.find(f => f.code === e.target.value))}>
            {alignments.map(alignment => {
                return (
                    <option key={'alignment_' + alignment.code} value={alignment.code}>{alignment.name ?? alignment.originalName}</option>
                )
            })}
        </select>
    )
}
