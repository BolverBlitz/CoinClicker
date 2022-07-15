const i18n = new I18n({
    fallback: 'de',
    languages: {
        de: {
            Startup: {
                Welcome: 'Bitte gib deine E-Mail Adresse deines Accounts ein',
                UserFound: 'Dein Account wurde gefunden',
            },
            Error: {
                400: 'Fehlerhafte Anfrage',
                401: 'Nicht autorisierter Zugriff',
                403: 'Zugriff verweigert',
                410: 'Das Dokument wurde nicht gefunden',
                429: 'Zu viele Anfragen',
                500: 'Interner Server Fehler',
                503: 'Service Unavailable',
                504: 'Gateway Timeout',
            }
        },
    }
});

/**
 * Will translate a key value to the language of the token
 * @param {string} Key Object Key to translate
 * @param {object} Variables
 * @returns {string} Transladed String
 */
function translate(Key, Variables) {
    if (Variables) {
        return i18n.translate(localStorage.getItem('Language'), Key, Variables);
    } else {
        return i18n.translate(localStorage.getItem('Language'), Key);
    }
}

//Get Browser Language and store it in localstorage
function setLanguageKey() {
    if (!localStorage.getItem('Language')) {
        let userLang = navigator.language.substring(0, 2).toLocaleLowerCase() || navigator.userLanguage.substring(0, 2).toLocaleLowerCase();
        localStorage.setItem('Language', userLang)
    }
}

function convertFlags(lang_string) {
    if (lang_string === "de") {
        return '<img width="18" height="14" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f1e9-1f1ea.png">'; // 🇩🇪
    } else if (lang_string === "en") {
        return '<img width="18" height="14" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f1ec-1f1e7.png">'; // 🇬🇧
    } else if (lang_string === "ua") {
        return '<img width="18" height="14" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f1fa-1f1e6.png">'; // 🇺🇦
    } else if (lang_string === "it") {
        return '<img width="18" height="14" src="https://twemoji.maxcdn.com/v/13.1.0/72x72/1f1ee-1f1f9.png">'; // 🇮🇹
    } else {
        return lang_string
    }
}

//Set client language
setLanguageKey()