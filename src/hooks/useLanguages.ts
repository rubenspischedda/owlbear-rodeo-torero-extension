import { Language } from "../models/language";
import useSources from "./useSources";
import * as it from "../texts/it.json";
import * as languages from "../data/languages.json";

export default function useLanguages(): Language[] {
    const languagesTranslations = it.languages;
    const sources = useSources();
  
    return languages.data.map((a) => {
      return {
        code: a.code,
        originalName: a.name,
        name:
          languagesTranslations[a.code as keyof typeof languagesTranslations] ?? a.name,
        source: sources.find((s) => a.source === s.code),
        otherSources: [
          ...sources.filter((s) =>
            a.otherSources?.map((os) => os.source === s.code)
          ),
          ...sources.filter((s) =>
            a.additionalSources?.map((os) => os.source === s.code)
          ),
        ],
      };
    });
  }
