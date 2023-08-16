import { useEffect, useState } from "react";
import useFilteredItems from "../hooks/useFilteredItems";
import { Item } from "../models/item";
import { Source } from "../models/source";
import React from "react";
import { useParams } from "react-router-dom";
import { useCharactersContext } from "../hooks/useCharactersContext";
import { Character } from "../models/character";
import { useEquipmentContext } from "../hooks/useEquipmentContext";
import TriStateButton from "../components/TriStateButton";

export default function Items() {

    const { id, type } = useParams();
    const { characters, setCharacters } = useCharactersContext();
    const { equipment, setEquipment } = useEquipmentContext();

    const [loadedCharacter, setLoadedCharacter] = useState<Character | undefined>(undefined);

    const [openItem, setOpenItem] = useState<string | undefined>(undefined);
    const [itemQuantityAdd, setItemQuantityAdd] = useState<Map<string, number>>(new Map<string, number>());

    useEffect(() => {
        if (id && characters) {
            const character = characters[id]
            if (character) {
                setLoadedCharacter(character);
            }
        }
    }, [characters, id, setLoadedCharacter]);

    useEffect(() => {
        if (loadedCharacter === undefined) return;
        setCharacters((characters) => {
            return { ...characters, [loadedCharacter.id]: loadedCharacter };
        });
    }, [loadedCharacter, setCharacters]);
    
    const [filterQuery, setFilterQuery] = useState<string>('');
    const [armorFilter, setArmorFilter] = useState<boolean | undefined>(undefined);
    const [weaponFilter, setWeaponFilter] = useState<boolean | undefined>(undefined);
    const [itemsFilter, setItemsFilter] = useState<boolean | undefined>(undefined);
    const items = useFilteredItems(filterQuery, armorFilter, weaponFilter, itemsFilter);

    const [groupedBySourceItems, setGroupedBySourceItems] = useState<Map<Source, Item[]>>(new Map<Source, Item[]>());

    useEffect(() => {
        if (type === 'weapons') {
            setWeaponFilter(true);
        } else if (type === 'armors') {
            setArmorFilter(true);
        } else if (type === 'items') {
            setItemsFilter(true);
        }
    }, [type])

    useEffect(() => {
        const groupedItems = new Map<Source, Item[]>();
        items.forEach(item => {
            if (item.source) {
                if (!groupedItems.has(item.source)) {
                    groupedItems.set(item.source, []);
                }
                groupedItems.get(item.source)?.push(item);
            }
        });
        setGroupedBySourceItems(groupedItems);
    }, [items]);

    const addEquipment = (item: Item, quantity: number) => {
        if (loadedCharacter === undefined) return;
        setEquipment((equipment) => {
            const characterEquipment = equipment[loadedCharacter.id] ?? [];
            const existingEquipment = characterEquipment.find(e => e.item.code === item.code);
            if (existingEquipment) {
                existingEquipment.quantity += quantity;
            } else {
                characterEquipment.push({
                    item: item,
                    quantity: quantity,
                    equipped: false
                });
            }
            return { ...equipment, [loadedCharacter.id]: characterEquipment };
        });
    }

    return (
        <div>
            <div className='text-white text-left'>Equipaggiamento di {loadedCharacter?.name}</div>
            <div className='sticky top-0 z-10 bg-gray-800 bg-opacity-25 backdrop-blur backdrop-filter flex items-center space-x-2'>
                <input type="text" placeholder='Cerca...' className='h-6 text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full'
                    value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} />
                <TriStateButton state={armorFilter} setState={(newState) => setArmorFilter(newState)}>Armatura</TriStateButton>
                <TriStateButton state={weaponFilter} setState={(newState) => setWeaponFilter(newState)}>Arma</TriStateButton>
                <TriStateButton state={itemsFilter} setState={(newState) => setItemsFilter(newState)}>Oggetti</TriStateButton>
            </div>
            <div className='relative'>
                <table className='text-2xs text-white text-left w-full'>
                    <thead>
                        <tr className='border border-slate-500'>
                            <th className='sticky top-6 z-10 bg-white bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500'>Nome</th>
                            <th className='sticky top-6 z-10 bg-white bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500'>Tipo</th>
                            <th className='sticky top-6 z-10 bg-white bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500'>Valore</th>
                            <th className='sticky top-6 z-10 bg-white bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500'>Rarità</th>
                            {
                                loadedCharacter && (
                                    <>
                                        <th className='sticky top-6 z-10 bg-white bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500'>Posseduti</th>
                                        <th className='sticky top-6 z-10 bg-white bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500'>Equipaggiato</th>
                                    </>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from(groupedBySourceItems.entries()).map(([source, items], groupIndex) => {
                                return (
                                    <React.Fragment key={groupIndex}>
                                        <tr key={`items_source_group_${source.id}_${groupIndex}`} className='border border-slate-500'>
                                            <td className='sticky top-10 z-10 bg-slate-400 bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500' colSpan={loadedCharacter ? 6 : 4}>{source.name ?? source.originalName}</td>
                                        </tr>
                                        {items.map((item, index) => {
                                            return (
                                                <React.Fragment key={`items_item_${item.code}_${item.name}_${source.code}_${groupIndex}-${index}`}>
                                                    <tr className='even:bg-slate-700 border border-slate-500 hover:bg-slate-600 cursor-pointer' onClick={() => setOpenItem((open) => open === item.code ? undefined : item.code)}>
                                                        <td className='border border-slate-500'>{item.name ?? item.originalName}</td>
                                                        <td className='border border-slate-500'>{item.type?.name ?? item.type?.originalName}</td>
                                                        <td className='border border-slate-500'>{item.value ?? '-'}</td>
                                                        <td className='border border-slate-500'>{item.rarity?.name ?? item.rarity?.originalName}</td>
                                                        {
                                                            loadedCharacter && equipment && (
                                                                <>
                                                                    <td className='border border-slate-500'>
                                                                        {equipment?.[loadedCharacter.id]?.find(e => e.item.code === item.code)?.quantity ?? 0}
                                                                    </td>
                                                                    <td className='border border-slate-500'>
                                                                        {equipment?.[loadedCharacter.id]?.find(e => e.item.code === item.code)?.equipped ? 'Si' : 'No'}
                                                                    </td>
                                                                </>
                                                            )
                                                        }
                                                    </tr>
                                                    {
                                                        openItem === item.code && (
                                                            <tr key={`items_item_${item.code}_${item.name}_${source.code}_${groupIndex}-${index}_details`} className='border border-slate-500'>
                                                                <td className='border border-slate-500 px-2 py-2' colSpan={loadedCharacter ? 6 : 4}>
                                                                    <div className='text-2xs uppercase font-medium text-slate-400'>Description</div>
                                                                    <div className='text-2xs text-white text-left pt-1'>
                                                                        {
                                                                            item.entries?.map((entry, entryIndex) => {
                                                                                return (
                                                                                    <div key={`items_item_${item.code}_${source.code}_${groupIndex}_entry_${entryIndex}`}>{entry as string}</div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className='w-full flex items-center justify-end'>
                                                                        <input className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent max-w-full' placeholder='Quantità' type='number' value={itemQuantityAdd.has(item.code) ? itemQuantityAdd.get(item.code) : 0} onChange={(e) => {
                                                                            const quantity = parseInt(e.target.value);
                                                                            setItemQuantityAdd((iqa) => {
                                                                                const newIqa = new Map<string, number>(iqa);
                                                                                if (!isNaN(quantity)) {
                                                                                    newIqa.set(item.code, quantity);
                                                                                } else {
                                                                                    newIqa.delete(item.code);
                                                                                }
                                                                                return newIqa;
                                                                            });
                                                                        }} /><button onClick={() => addEquipment(item, itemQuantityAdd.get(item.code) ?? 0)} className='ml-1 rounded-r bg-slate-600 hover:bg-slate-500 px-1 py-1'>Aggiungi all'equipaggiamento</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </React.Fragment>
                                            )
                                        })}
                                    </React.Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
