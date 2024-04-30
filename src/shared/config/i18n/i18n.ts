import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // lng: 'en', //  язык по умолчанию, если его применять, то при перезагрузке тоже он будет, а не сохраненный в localStorage
        // - language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        fallbackLng: 'en', // язык, который будет использоваться, если перевод на язык пользователя недоступен. // Если явно установить для него значение false, вообще не будет запускаться загрузка FallbackLng.

        // eslint-disable-next-line no-undef
        debug: (GLOBAL_ISDEV),
        ns: ['translation', 'profile'],
        defaultNS: 'translation',

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // path where resources get loaded from
        },
    });

export default i18n;
