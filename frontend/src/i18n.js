import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

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
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;