import { Player } from "@owlbear-rodeo/sdk";
import { Token } from "../helpers/itemsHelpers";
import HealthBar from "./HealthBar";

export default function Character({ token, onImageClick, player }: { token: Token, onImageClick: (token: Token) => void, player?: Player }) {
    return (
        <div className='flex items-center space-x-2 w-full justify-between'>
            <div className='flex items-center space-x-2 w-[25%]'>
                <img onClick={() => onImageClick(token)} className='h-6 w-6 cursor-pointer' src={token.image} />
                <div className='w-max text-start'>
                    <div className='leading-tight text-sm'>{token.label || token.name}</div>
                    <div className="leading tight text-xs text-gray-400 text-left whitespace-nowrap">{player?.name}</div>
                </div>
            </div>
            <div className='w-[25%] flex items-center space-x-2'>
                <div className='flex-1'>
                    <HealthBar maxHealth={12} currentHealth={12} />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </div>

        </div>
    )
}
