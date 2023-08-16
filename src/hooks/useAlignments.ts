import { Alignment } from "../models/alignment";
import * as it from "../texts/it.json";
import * as alignments from "../data/alignments.json";

export function useAlignments(): Alignment[] {
    const alignmentsTranslations = it.alignments;

    return alignments.data.map((alignment) => {
        return {
            code: alignment.code,
            name: alignmentsTranslations[alignment.code as keyof typeof alignmentsTranslations],
            originalName: alignment.name,
        }
    });
}
