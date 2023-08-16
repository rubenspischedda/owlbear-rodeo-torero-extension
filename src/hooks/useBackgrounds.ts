import * as backgrounds from '../data/backgrounds.json';
import * as it from '../texts/it.json';

export default function useBackgrounds() {
    const backgroundsTranslations = it.backgrounds;

    return backgrounds.data.map((background) => {
        return {
            code: background.code,
            name: backgroundsTranslations[background.code as keyof typeof backgroundsTranslations],
            originalName: background.name,
        }
    });
}
