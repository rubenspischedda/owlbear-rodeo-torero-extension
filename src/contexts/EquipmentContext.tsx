import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { Equipment } from '../models/equipment';

interface EquipmentState {
    equipment: Record<string, Equipment[]>;
    setEquipment: React.Dispatch<React.SetStateAction<Record<string, Equipment[]>>>;
    deleteCharacterEquipment: (id: string) => void;
}

const defaultEquipmentState: EquipmentState = {
    equipment: {},
    setEquipment: () => { },
    deleteCharacterEquipment: (id: string) => { console.log('deleteEquipment not implemented', id); return () => { } },
}

export const EquipmentContext = createContext(defaultEquipmentState);

export const EquipmentProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [equipment, setEquipment] = useState<Record<string, Equipment[]>>({})

    const deleteCharacterEquipment = (id: string) => {
        setEquipment((equipment) => {
            const newEquipment = { ...equipment };
            delete newEquipment[id];
            localStorage.setItem('equipment', JSON.stringify(newEquipment));
            return newEquipment;
        });
    };

    useEffect(() => {
        const storedEquipment = localStorage.getItem('equipment');
        if (storedEquipment !== null) {
            setEquipment(JSON.parse(storedEquipment));
        }
    }, []);

    useEffect(() => {
        if (JSON.stringify(equipment) === localStorage.getItem('equipment') || Object.values(equipment).length === 0) return;
        localStorage.setItem('equipment', JSON.stringify(equipment));
    }, [equipment]);

    setInterval(() => {
        const storedEquipment = localStorage.getItem('equipment');
        if (storedEquipment !== null && JSON.stringify(equipment) !== storedEquipment) {
            setEquipment(JSON.parse(storedEquipment));
        }
    }, 5000)

    return (<EquipmentContext.Provider value={{ equipment, setEquipment, deleteCharacterEquipment }}>{children}</EquipmentContext.Provider>)
};
