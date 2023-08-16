import useBackgrounds from "../../hooks/useBackgrounds";
import { Background } from "../../models/background";

export default function BackgroundSelect({ background, onBackgroundChange }: { background: Background | undefined, onBackgroundChange: (size: Background | undefined) => void }) {
    const backgrounds = useBackgrounds();

    return (
        <select className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' value={background?.code} onChange={(e) => onBackgroundChange(backgrounds.find(f => f.code === e.target.value))}>
            {backgrounds.map(background => {
                return (
                    <option key={'size_' + background.code} value={background.code}>{background.name ?? background.originalName}</option>
                )
            })}
        </select>
    )
}
