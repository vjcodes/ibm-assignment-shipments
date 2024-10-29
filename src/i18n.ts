import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "./assets/locales/en/translation.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: translation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
