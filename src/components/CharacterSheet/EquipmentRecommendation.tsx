import { getArmorClassFromDexAndEquipment } from "../../helpers/utils";
import { Equipment } from "../../models/equipment";
import { ChevronDoubleDown, ChevronDoubleUp } from "../icons/Icon";

enum Recommendation {
    Stronger = 'stronger',
    Weaker = 'weaker',
    Equal = 'equal',
    SameItem = 'same',
}

export default function EquipmentRecommendation({ dex, currentEquipment, selectedEquipment }: { dex: number, currentEquipment: Equipment[], selectedEquipment: Equipment }) {

    let recommendation: Recommendation = Recommendation.Equal;

    const equipmentPreview = currentEquipment.filter((equipment) => {
        if ((selectedEquipment.item.armor && equipment.item.armor) || (selectedEquipment.item.shield && equipment.item.shield)) {
            return false;
        } else {
            return true;
        }
    });

    equipmentPreview.push({ ...selectedEquipment, equipped: true });

    const currentAc = getArmorClassFromDexAndEquipment({ dex, equipment: currentEquipment });
    const previewAc = getArmorClassFromDexAndEquipment({ dex, equipment: equipmentPreview });

    if (currentEquipment.find((equipment) => equipment.item.code === selectedEquipment.item.code && equipment.equipped) !== undefined) {
        recommendation = Recommendation.SameItem;
    } else if (currentAc > previewAc) {
        recommendation = Recommendation.Weaker;
    } else if (currentAc < previewAc) {
        recommendation = Recommendation.Stronger;
    } else if (currentAc === previewAc) {
        recommendation = Recommendation.Equal;
    }

    return (
        // chevron character
        // ↓ 
        <>
            {recommendation !== Recommendation.SameItem &&
                <div className={`h-3 w-3 rounded flex items-center justify-center text-3xs ${recommendation === Recommendation.Weaker ? 'bg-red-700' : (recommendation === Recommendation.Stronger ? 'bg-green-700' : 'bg-gray-400')}`}>
                    {recommendation === Recommendation.Weaker ? <ChevronDoubleDown className='h-3 w-3' /> : (recommendation === Recommendation.Stronger ? <ChevronDoubleUp className='h-3 w-3' /> : '≈')}
                </div>
            }
        </>
    );
}
