import OBR, { Player } from "@owlbear-rodeo/sdk";
import { Token } from "../helpers/itemsHelpers";
import Character from "../components/Character";
import { MODAL_WIDTH } from "../App";

export default function Overview({ tokens, players, onImageClick }: { tokens: Token[], players: Player[], onImageClick: (token: Token) => void }) {
    return (
        <div>
            <button onClick={() => {
                OBR.modal.open({
                    id: 'dkjfslaòksjfòhs',
                    url: '/character-sheet/new',
                    height: MODAL_WIDTH,
                    width: MODAL_WIDTH / Math.sqrt(2),
                })
            }}>Nuovo</button>
            
            <div className='mt-4 w-full align-left flex justify-start text-xs text-gray-200 uppercase'>
                Characters
            </div>
            <ul className="flex flex-col gap-y-4 justify-start mt-4">
                {tokens.filter(f => players.find((player) => player.id === f.userId) !== undefined).map((token: Token) => {
                    const player = players.find((player) => player.id === token.userId);
                    return (
                        <li key={token.id}>
                            <Character player={player} token={token} onImageClick={onImageClick} />
                        </li>
                    )
                })}
            </ul>
            <div className='mt-4 w-full align-left flex justify-start text-xs text-gray-200 uppercase'>
                Enemies
            </div>
            <ul className="flex flex-col gap-y-4 justify-start mt-4">
                {tokens.filter(f => players.find((player) => player.id === f.userId) === undefined).map((token: Token) => {
                    return (
                        <li key={token.id}>
                            <Character token={token} onImageClick={onImageClick} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
