/**
 * Text dictionaries that can be edited in the admin area ("Textos do site") are registered with an
 * id, which is the row id of their edits in the `site_content` table.
 */
const ids = new WeakMap<object, string>();

export function defineDict<T>(id: string, dict: { en: T; pt: T }) {
  ids.set(dict, id);
  return dict;
}

export const dictId = (dict: object) => ids.get(dict);
