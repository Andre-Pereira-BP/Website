import type { Ref } from 'react';
import { Link as RouterLink, LinkProps, To } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { Lang, localizePath } from './locale';

const localizeTo = (lang: Lang, to: To): To => {
  if (typeof to === 'string') return localizePath(lang, to);
  return to.pathname ? { ...to, pathname: localizePath(lang, to.pathname) } : to;
};

/**
 * Drop-in replacement for react-router's Link on public pages: absolute internal paths get the
 * current language prefix ('/about' → '/pt/about'), so links never lose the language.
 */
const Link = ({ to, ref, ...props }: LinkProps & { ref?: Ref<HTMLAnchorElement> }) => {
  const { lang } = useLanguage();
  return <RouterLink ref={ref} to={localizeTo(lang, to)} {...props} />;
};

export default Link;
