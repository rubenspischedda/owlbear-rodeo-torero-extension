import * as it from '../texts/it.json';
import * as sizes from '../data/sizes.json';

export default function useSizes() {
    const sizesTranslations = it.sizes;

    return sizes.data.map((size) => {
        return {
            code: size.code,
            name: sizesTranslations[size.code as keyof typeof sizesTranslations],
            originalName: size.name,
            value: size.value,
        }
    });
}
