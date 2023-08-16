import useSizes from "../../hooks/useSizes";
import { Size } from "../../models/size";

export default function SizeSelect({ size, onSizeChange }: { size: Size | undefined, onSizeChange: (size: Size | undefined) => void }) {
    const sizes = useSizes();

    return (
        <select className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' value={size?.code} onChange={(e) => onSizeChange(sizes.find(f => f.code === e.target.value))}>
            {sizes.map(size => {
                return (
                    <option key={'size_' + size.code} value={size.code}>{size.name ?? size.originalName}</option>
                )
            })}
        </select>
    )
}
