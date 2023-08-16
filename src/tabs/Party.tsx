import OBR from "@owlbear-rodeo/sdk";
import { DeleteIcon, EditIcon } from "../components/icons/Icon";
import { useCharactersContext } from "../hooks/useCharactersContext";
import { Character } from "../models/character";
import { MODAL_WIDTH } from "../App";

export default function Party() {

    const { characters, deleteCharacter } = useCharactersContext();

    const openCharacterModal = (character: Character) => {
        OBR.modal.open({
            id: 'dkjfslaòksjfòhs',
            url: `/character-sheet/${character.id}`,
            height: MODAL_WIDTH,
            width: MODAL_WIDTH / Math.sqrt(2),
        })
    }
    
    return (
        <ul>
            {Object.values(characters).map((character) => {
                return <li key={'party_character_id_'+character.id} className="flex py-2 justify-between text-left">
                    <div>
                        <div className='text-xs font-medium'>{character.name} - Lv. {character.level}</div>
                        <div className='text-3xs text-gray-400'>{character.race?.name} {character.subRace?.name} {character.class?.name}, taglia <span className='lowercase'>{character.size?.name}</span>, {character.alignment?.name}</div>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <EditIcon onClick={() => openCharacterModal(character)} className="h-4 w-4 cursor-pointer text-white hover:text-blue-400"/>
                        <DeleteIcon onClick={() => deleteCharacter(character.id)} className="h-4 w-4 cursor-pointer text-white hover:text-red-400"/>
                    </div>
                </li>
            })}
        </ul>
    )
}
