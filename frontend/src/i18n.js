import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './localization/en.json';
import translationRU from './localization/ru.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;