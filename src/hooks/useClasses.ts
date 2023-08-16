import { LifeClass } from '../models/lifeClass';
import * as it from '../texts/it.json';
import * as classes from '../data/classes.json';
import useSources from './useSources';

export default function useClasses(): LifeClass[] {
  const classesTranslations = it.classes;
  const sources = useSources();

  return classes.data.map((a) => {
    return {
      code: a.code,
      originalName: a.name,
      name:
        classesTranslations[a.code as keyof typeof classesTranslations] ?? a.name,
      source: sources.find((s) => a.source === s.code),
      reasons: a.reasons,
    };
  });
}
