import OBR, { Player, Item } from "@owlbear-rodeo/sdk";
import { useState, useEffect } from "react";
import Home from "./Home";
import { Token, setupContextMenu } from "./helpers/itemsHelpers";
import * as p from '../package.json';

export default function Torero() {
    const [sceneReady, setSceneReady] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [tokens, setTokens] = useState<Token[]>([]);
    const [, setItems] = useState<Item[]>([]);

    useEffect(() => {
        OBR.scene.isReady().then(setSceneReady);
        return OBR.scene.onReadyChange(setSceneReady);
    }, []);

    useEffect(() => {
        if (!sceneReady) return;
        OBR.party.getPlayers().then((players) => {
            setPlayers(players);
        });
        OBR.party.onChange((players) => {
            setPlayers(players);
        });
        OBR.scene.items.onChange((items) => {
            setItems(items);
        });
        setupContextMenu((tokens) => {
            setTokens((previousTokens) => [...(previousTokens).filter(f => !tokens.map(m => m.id).includes(f.id)), ...tokens]);
        })
    }, [sceneReady]);

    const highlightToken = async (token: Token) => {
        const scale = 0.6;
        const items = await OBR.scene.items.getItems();
        const width = await OBR.viewport.getWidth();
        const height = await OBR.viewport.getHeight();
        const item = items.find((item) => item.id === token.id);

        const scaledItemPosition = {
            x: (((item?.position.x || 0)) * -scale),
            y: ((item?.position.y || 0)) * -scale
        }
        OBR.viewport.animateTo({
            position: {
                x: scaledItemPosition.x + (width / 2),
                y: scaledItemPosition.y + (height / 2)
            },
            scale
        });
    }

    return (
        <>
            <div className='text-white select-none'>
                <div className='flex items-center justify-between px-4 py-2 border-b border-b-gray-500'>
                    <div className='text-xl font-medium'>Torero</div>
                    <div className='text-sm text-gray-300'>v{p.version}</div>
                </div>
                {!sceneReady && <div>Not ready</div>}
                <div>{sceneReady && <Home isReady={sceneReady} players={players} tokens={tokens} onImageClick={(token) => highlightToken(token)} />}</div>
            </div>
        </>
    )

}
