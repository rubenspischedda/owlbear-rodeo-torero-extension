import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AbilityBigBox from '../components/CharacterSheet/AbilityBigBox';
import { Stats } from '../contexts/CharactersContext';
import useAbilities from '../hooks/useAbilities';
import { createNewCharacter } from '../hooks/useCharacter';
import { useCharactersContext } from '../hooks/useCharactersContext';
import useSkills from '../hooks/useSkills';
import { Character } from '../models/character';
import { getBonusFromValue, getCharacterArmorClass } from '../helpers/utils';
import { Race } from '../models/race';
import { LifeClass } from '../models/lifeClass';
import RaceSelect from '../components/CharacterSheet/RaceSelect';
import ClassSelect from '../components/CharacterSheet/ClassSelect';
import AlignmentSelect from '../components/CharacterSheet/AlignmentSelect';
import { Alignment } from '../models/alignment';
import SizeSelect from '../components/CharacterSheet/SizeSelect';
import { Size } from '../models/size';
import BackgroundSelect from '../components/CharacterSheet/BackgroundSelect';
import { Background } from '../models/background';
import OBR from '@owlbear-rodeo/sdk';
import { useEquipmentContext } from '../hooks/useEquipmentContext';
import EquipmentBox, { EquipmentCategory } from '../components/CharacterSheet/EquipmentBox';
import { SubRace } from '../models/subRace';
import SubRaceSelect from '../components/CharacterSheet/SubRaceSelect';
import { Equipment } from '../models/equipment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CharacterSheet() {

    const { id } = useParams();

    const [loadedCharacter, setLoadedCharacter] = useState<Character | undefined>(undefined);

    const abilities = useAbilities();
    const skills = useSkills();

    const { characters, setCharacters } = useCharactersContext();
    const { equipment, setEquipment } = useEquipmentContext();

    useEffect(() => {
        if (id === undefined && loadedCharacter === undefined) {
            const newCharacter = createNewCharacter(abilities, skills);
            setLoadedCharacter(newCharacter);
        } else if (id !== undefined && loadedCharacter === undefined) {
            setLoadedCharacter(characters[id]);
        }
    }, [id, characters, setCharacters, abilities, skills, loadedCharacter])

    useEffect(() => {
        if (loadedCharacter === undefined) return;
        setCharacters((characters) => {
            return { ...characters, [loadedCharacter.id]: loadedCharacter };
        });
    }, [loadedCharacter, setCharacters]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const changeAbilityValue = (abilityCode: string, newValue: number) => {
        if (loadedCharacter === undefined) return;
        const newStats: Stats = {
            ...loadedCharacter.stats,
            abilities: {
                ...loadedCharacter.stats.abilities,
                [abilityCode]: {
                    ...loadedCharacter.stats.abilities[abilityCode],
                    value: newValue
                }
            }
        }
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), stats: newStats }));
    };

    const setCharacterName = (newName: string) => {
        if (loadedCharacter === undefined) return;
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), name: newName }));
    }

    const setCharacterLevel = (value: number) => {
        if (loadedCharacter === undefined) return;
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), level: value }));
    }

    const setCharacterRace = (race: Race | undefined) => {
        if (loadedCharacter === undefined || race === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), race }))
    }

    const setCharacterClass = (lifeClass: LifeClass | undefined) => {
        if (loadedCharacter === undefined || lifeClass === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), class: lifeClass }))
    }

    const setCharacterAlignment = (alignment: Alignment | undefined) => {
        if (loadedCharacter === undefined || alignment === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), alignment }))
    }

    const setCharacterSize = (size: Size | undefined) => {
        if (loadedCharacter === undefined || size === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), size }))
    }

    const setCharacterBackground = (background: Background | undefined) => {
        if (loadedCharacter === undefined || background === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), background }))
    }

    const setCharacterSubRace = (subRace: SubRace | undefined) => {
        if (loadedCharacter === undefined || subRace === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), subRace }))
    }

    const toggleAbilityProficiency = (abilityCode: string) => {
        return () => {
            if (loadedCharacter === undefined) return;
            const newStats: Stats = {
                ...loadedCharacter.stats,
                abilities: {
                    ...loadedCharacter.stats.abilities,
                    [abilityCode]: {
                        ...loadedCharacter.stats.abilities[abilityCode],
                        proficiency: !loadedCharacter.stats.abilities[abilityCode].proficiency
                    }
                }
            }
            setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), stats: newStats }));
        }
    }

    const addEquipment = (characterId: string, itemCode: string, quantity: number) => {
        setEquipment((currentEquipment) => {
            const characterEquipment = currentEquipment[characterId] ?? [];
            const existingItem = characterEquipment.find(f => f.item.code === itemCode);
            if (existingItem !== undefined) {
                existingItem.quantity = (existingItem?.quantity ?? 0) + quantity;
            }
            const newEquipment = existingItem !== undefined ? [...characterEquipment.filter(f => f.item.code !== itemCode), { ...existingItem }] : [...characterEquipment];
            return {
                ...currentEquipment,
                [characterId]: [
                    ...newEquipment
                ]
            }
        })
    }

    const deleteEquipment = (characterId: string, itemCode: string) => {
        setEquipment((currentEquipment) => {
            return {
                ...currentEquipment,
                [characterId]: [
                    ...currentEquipment[characterId].filter(f => f.item.code !== itemCode),
                ]
            }
        })
    }

    const toggleEquipment = (equipment: Equipment) => {
        setEquipment((currentEquipment) => {
            let characterEquipment = currentEquipment?.[loadedCharacter?.id ?? ''] ?? [];
            if (equipment.item.weapon) {
                if (!characterEquipment) return currentEquipment;
                characterEquipment = characterEquipment.map((item) => {
                    if (item.item.code === equipment.item.code) {
                        return {
                            ...item,
                            equipped: item.item.code === equipment.item.code ? !item.equipped : item.equipped
                        }
                    }
                    return item;
                });
            } else if (equipment.item.armor && !equipment.item.shield) {
                if (!characterEquipment) return currentEquipment;
                characterEquipment = characterEquipment.map((item) => {
                    if (item.item.code === equipment.item.code) {
                        return {
                            ...item,
                            equipped: !item.equipped
                        }
                    } else if (item.item.armor) {
                        return {
                            ...item,
                            equipped: false
                        }
                    }
                    return item;
                });
            } else if (equipment.item.shield) {
                if (!characterEquipment) return currentEquipment;
                characterEquipment = characterEquipment.map((item) => {
                    if (item.item.code === equipment.item.code) {
                        return {
                            ...item,
                            equipped: !item.equipped
                        }
                    } else if (item.item.shield) {
                        return {
                            ...item,
                            equipped: false
                        }
                    }
                    return item;
                });
            }

            return {
                ...currentEquipment,
                [loadedCharacter?.id ?? '']: characterEquipment
            }
        });
    }

    const toggleSkillProficiency = (skillCode: string) => {
        return () => {
            if (loadedCharacter === undefined) return;
            const newStats: Stats = {
                ...loadedCharacter.stats,
                skills: {
                    ...loadedCharacter.stats.skills,
                    [skillCode]: {
                        ...loadedCharacter.stats.skills[skillCode],
                        proficiency: !loadedCharacter.stats.skills[skillCode].proficiency
                    }
                }
            }
            setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), stats: newStats }));
        }
    }

    const setSavingThrowsAgainstDeath = (value: number, type: 'success' | 'fail') => {
        if (loadedCharacter === undefined) return;
        const savingThrowsAgainstDeath = loadedCharacter.savingThrowsAgainstDeath ?? { success: 0, fail: 0 };
        savingThrowsAgainstDeath[type] = value;
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), savingThrowsAgainstDeath }));
    }

    return (
        <div className='text-left text-white py-4'>
            <div className='px-4 font-thin text-lg'>Scheda del personaggio</div>
            <div className='flex items-center text-white px-4 mt-4'>
                <div className='w-[30%]'>
                    <div className='border rounded-l'><input className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' type='text' value={loadedCharacter?.name ?? ''} onChange={(event) => setCharacterName(event.target.value)} /></div>
                    <div className='text-2xs uppercase px-2'>Nome personaggio</div>
                </div>
                <div className='w-[70%] border rounded grid grid-cols-[4fr_4fr_5fr] grid-rows-2 gap-x-1 gap-y-2 py-2 px-2'>
                    <div>
                        <ClassSelect characterClass={loadedCharacter?.class} onClassChange={(lifeClass: LifeClass | undefined) => setCharacterClass(lifeClass)} />
                        <div className='text-2xs uppercase px-2'>Classe</div>
                    </div>
                    <div>
                        <input className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' type='text' value={loadedCharacter?.level ?? '1'} onChange={(event) => setCharacterLevel(parseInt(event.target.value))} />
                        <div className='text-2xs uppercase px-2'>Livello</div>
                    </div>
                    <div>
                        <BackgroundSelect background={loadedCharacter?.background} onBackgroundChange={(background: Background | undefined) => setCharacterBackground(background)} />
                        <div className='text-2xs uppercase px-2'>Background</div>
                    </div>
                    <div>
                        <RaceSelect race={loadedCharacter?.race} onRaceChange={(race: Race | undefined) => setCharacterRace(race)} />
                        <div className='text-2xs uppercase px-2'>Razza</div>
                    </div>
                    <div>
                        <SizeSelect size={loadedCharacter?.size} onSizeChange={(size: Size | undefined) => setCharacterSize(size)} />
                        <div className='text-2xs uppercase px-2'>Taglia</div>
                    </div>
                    <div>
                        <AlignmentSelect alignment={loadedCharacter?.alignment} onAlignmentChange={(alignment: Alignment | undefined) => setCharacterAlignment(alignment)} />
                        <div className='text-2xs uppercase px-2'>Allineamento</div>
                    </div>
                    <div>
                        <SubRaceSelect race={loadedCharacter?.race} subRace={loadedCharacter?.subRace} onSubRaceChange={(race: SubRace | undefined) => setCharacterSubRace(race)} />
                        <div className='text-2xs uppercase px-2'>Sottorazza</div>
                    </div>
                </div>
            </div>

            <div className='flex gap-x-2 mx-2 mt-8'>
                <div className='w-1/3'>
                    <div className='flex gap-x-2'>
                        <div className='w-1/4 bg-slate-700 px-1 py-1 flex flex-col gap-y-2'>
                            {
                                abilities.map((ability) => {
                                    return (
                                        <div key={'big_' + ability.code}>
                                            <AbilityBigBox ability={ability} value={loadedCharacter?.stats?.abilities?.[ability.code]?.value ?? 10} onValueChange={(newValue) => changeAbilityValue(ability.code, newValue)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='w-3/4'>
                            <div className='relative h-12'>
                                <div className='border rounded-full h-6 aspect-square flex items-center justify-center absolute left-0 top-[calc(50%-14px)]'>{Math.ceil((loadedCharacter?.level ?? 1) / 4) + 1}</div>
                                <div className='border rounded text-2xs absolute right-0 ml-8 px-2 py-1'>Bonus di competenza</div>
                            </div>
                            <div className='border rounded px-1 py-1'>
                                {abilities.map((ability) => {
                                    const modifierValue = getBonusFromValue({
                                        base: loadedCharacter?.stats?.abilities?.[ability.code]?.value ?? 10,
                                        proficiency: {
                                            active: loadedCharacter?.stats?.abilities?.[ability.code]?.proficiency ?? false,
                                            value: Math.ceil((loadedCharacter?.level ?? 1) / 4) + 1
                                        }
                                    });

                                    return (
                                        <div key={'ability_' + ability.code} className='flex items-center space-x-1 py-0.5'>
                                            <div onClick={toggleAbilityProficiency(ability.code)} className='rounded-full border h-2 aspect-square cursor-pointer overflow-hidden'>
                                                {loadedCharacter?.stats?.abilities?.[ability.code]?.proficiency && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                            </div>
                                            <div key={ability.code} className='text-3xs'>{modifierValue.sign} {modifierValue.absoluteValue} {ability.name}</div>
                                        </div>
                                    );
                                })}
                                <div className='uppercase text-center text-2xs'>Tiri salvezza</div>
                            </div>
                            <div className='border rounded px-1 py-1'>
                                {skills.sort((a, b) => {
                                    if (a.name > b.name) {
                                        return 1;
                                    } else if (a.name < b.name) {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                }).map((skill) => {
                                    const modifierValue = getBonusFromValue({
                                        base: loadedCharacter?.stats?.abilities?.[skill.abilityCode]?.value ?? 10,
                                        proficiency: {
                                            active: loadedCharacter?.stats?.skills?.[skill.code]?.proficiency ?? false,
                                            value: Math.ceil((loadedCharacter?.level ?? 1) / 4) + 1
                                        }
                                    });
                                    return (
                                        <div key={'skill_' + skill.code} className='flex items-center space-x-1 py-0.5'>
                                            <div onClick={toggleSkillProficiency(skill.code)} className='rounded-full border h-2 aspect-square cursor-pointer overflow-hidden'>
                                                {loadedCharacter?.stats?.skills?.[skill.code]?.proficiency && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                            </div>
                                            <div key={skill.code} className='text-3xs'>{modifierValue.sign} {modifierValue.absoluteValue} {skill.name} ({abilities.find(f => f.code === skill.abilityCode)?.name?.substring(0, 3)})</div>
                                        </div>
                                    );
                                })}
                                <div className='uppercase text-center text-2xs'>Abilità</div>
                            </div>
                        </div>
                    </div>

                    <div>Saggezza (Percezione) Passiva</div>
                </div>
                <div className="w-2/3">
                    <div className='w-1/2'>
                        <div className='rounded-md bg-slate-700 flex flex-col gap-y-2 px-2 py-2'>
                            <div className='flex text-center'>
                                <div className='w-1/3 rounded border flex flex-col justify-between gap-y-2'>
                                    <div></div>
                                    <div>{getCharacterArmorClass(loadedCharacter, equipment[loadedCharacter?.id ?? ''])}</div>
                                    <div className='text-3xs uppercase'>Classe Armatura</div>
                                </div>
                                <div className='w-1/3 rounded border flex flex-col justify-between'>
                                    <div></div>
                                    <div>{getBonusFromValue({ base: loadedCharacter?.stats?.abilities?.['DEXTERITY']?.value ?? 10 })?.sign} {getBonusFromValue({ base: loadedCharacter?.stats?.abilities?.['DEXTERITY']?.value ?? 10 })?.value}</div>
                                    <div className='text-3xs uppercase'>Iniziativa</div>
                                </div>
                                <div className='w-1/3 rounded border flex flex-col justify-between gap-y-2'>
                                    <div className='h-2'></div>
                                    <input className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' type='text' />
                                    <div className='text-3xs uppercase'>Velocità</div>
                                </div>
                            </div>
                            <div className='rounded-t-md border px-2 py-2 space-y-2'>
                                <div className='flex space-x-2 items-center'><div className='text-3xs whitespace-nowrap'>Punti Ferita Massimi: </div><input className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' /></div>
                                <input className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' />
                                <div className='text-3xs uppercase text-center'>Punti ferita attuali</div>
                            </div>
                            <div className='rounded-b-md border px-2 py-2 space-y-2'>
                                <input className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' />
                                <div className='text-3xs uppercase text-center'>Punti ferita temporanei</div>
                            </div>
                            <div className='flex'>
                                <div className='w-1/2 rounded-md border px-2 py-2 space-y-2'>
                                    <div className='flex space-x-2 items-center'><div className='text-3xs whitespace-nowrap'>Totale</div><input className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' /></div>
                                    <div className='text-3xs uppercase text-center'>Dadi vita</div>
                                </div>
                                <div className='w-1/2 rounded-md border px-2 py-2 space-y-2'>
                                    <div className='text-3xs flex items-center space-x-1'>
                                        <div onClick={() => setSavingThrowsAgainstDeath(0, 'success')} className='select-none cursor-pointer'>Successi</div>
                                        <div className='flex items-center gap-x-2 relative'>
                                            <div className='w-full h-[1px] absolute top-[calc(50%-0.1px)] left-0 bg-slate-50 z-0'></div>
                                            <div onClick={() => setSavingThrowsAgainstDeath(1, 'success')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                {(loadedCharacter?.savingThrowsAgainstDeath?.success ?? 0) >= 1 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                            </div>
                                            <div onClick={() => setSavingThrowsAgainstDeath(2, 'success')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                {(loadedCharacter?.savingThrowsAgainstDeath?.success ?? 0) >= 2 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                            </div>
                                            <div onClick={() => setSavingThrowsAgainstDeath(3, 'success')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                {(loadedCharacter?.savingThrowsAgainstDeath?.success ?? 0) >= 3 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-3xs flex items-center space-x-1'>
                                        <div onClick={() => setSavingThrowsAgainstDeath(0, 'fail')} className='select-none cursor-pointer'>Fallimenti</div>
                                        <div className='flex items-center gap-x-2 relative'>
                                            <div className='w-full h-[1px] absolute top-[calc(50%-0.1px)] left-0 bg-slate-50 z-0'></div>
                                            <div onClick={() => setSavingThrowsAgainstDeath(1, 'fail')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                {(loadedCharacter?.savingThrowsAgainstDeath?.fail ?? 0) >= 1 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                            </div>
                                            <div onClick={() => setSavingThrowsAgainstDeath(2, 'fail')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                {(loadedCharacter?.savingThrowsAgainstDeath?.fail ?? 0) >= 2 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                            </div>
                                            <div onClick={() => setSavingThrowsAgainstDeath(3, 'fail')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                {(loadedCharacter?.savingThrowsAgainstDeath?.fail ?? 0) >= 3 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-3xs uppercase text-center'>TS contro morte</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3'>
                    </div>
                    <div className='w-full'>
                        <div className='rounded-md border flex flex-col'>
                            <div className="flex items-center justify-end text-sm px-1 py-0.5"><div>Peso trasportato: {equipment?.[loadedCharacter?.id ?? '']?.map(m => m.item.weight ?? 0).reduce((prev, curr) => prev + curr, 0)}/{(loadedCharacter?.stats.abilities['STR']?.value ?? 0) * 15} lb.</div></div>
                            <div>Armi</div>
                            <div className='flex-grow'>
                                <EquipmentBox category={EquipmentCategory.WEAPON} character={loadedCharacter} equipment={equipment} onEquipmentAdd={addEquipment} onEquipmentDelete={deleteEquipment} onEquipmentToggle={toggleEquipment} />
                                <div onClick={() => OBR.modal.open({
                                    id: 'qw',
                                    url: `/characters/${loadedCharacter?.id}/weapons`,
                                    height: 600,
                                    width: 800,
                                })} className='flex items-center justify-end'>
                                    <div className='mt-2 rounded px-1 py-0.5 text-2xs cursor-pointer bg-slate-600 hover:bg-slate-700 w-max mx-2'>Apri lista armi</div>
                                </div>
                            </div>

                            <div>Armature</div>
                            <div className='flex-grow'>
                                <EquipmentBox category={EquipmentCategory.ARMOR} character={loadedCharacter} equipment={equipment} onEquipmentAdd={addEquipment} onEquipmentDelete={deleteEquipment} onEquipmentToggle={toggleEquipment} />
                                <div onClick={() => OBR.modal.open({
                                    id: 'qw',
                                    url: `/characters/${loadedCharacter?.id}/armors`,
                                    height: 600,
                                    width: 800,
                                })} className='flex items-center justify-end'>
                                    <div className='mt-2 rounded px-1 py-0.5 text-2xs cursor-pointer bg-slate-600 hover:bg-slate-700 w-max mx-2'>Apri lista armature</div>
                                </div>
                            </div>


                            <div>Oggetti</div>
                            <div className='flex-grow'>
                                <EquipmentBox category={EquipmentCategory.ITEM} character={loadedCharacter} equipment={equipment} onEquipmentAdd={addEquipment} onEquipmentDelete={deleteEquipment} />
                                <div onClick={() => OBR.modal.open({
                                    id: 'qw',
                                    url: `/characters/${loadedCharacter?.id}/items`,
                                    height: 600,
                                    width: 800,
                                })} className='flex items-center justify-end'>
                                    <div className='mt-2 rounded px-1 py-0.5 text-2xs cursor-pointer bg-slate-600 hover:bg-slate-700 w-max mx-2'>Apri lista oggetti</div>
                                </div>
                            </div>
                            <div className='uppercase text-2xs text-center mt-2'>Equipaggiamento</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
