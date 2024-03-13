import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import translationEnglish from "@/translation/English/translation.json";
import translationSpanish from "@/translation/Spanish/translation.json";
import translationFrench from "@/translation/French/translation.json";
import translationGermany from "@/translation/Germany/translation.json";

export const listLanguage = [
    {
        id: "en",
        text: "English"
    },
    {
        id: "es",
        text: "Spanish"
    },
    {
        id: "fr",
        text: "French"
    },
    {
        id: "gr",
        text: "Germany"
    },
]

const resources = {
    en: {
        translation: translationEnglish,
    },
    es: {
        translation: translationSpanish,
    },
    fr: {
        translation: translationFrench,
    },
    gr: {
        translation: translationGermany,
    }
}


i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en" //default language
    });

export default i18next;