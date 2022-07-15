const i18n = new I18n({
    fallback: 'en',
    languages: {
        de: {
            Startup: {
                Welcome: 'Bitte gib deine E-Mail Adresse deines Accounts ein',
                UserFound: 'Dein Account wurde gefunden',
            },
            TextBox: {
                CoinStats: 'Mögliche Coins heute: ',
                KlickStats: 'Heutige Klicks: ',
            },
            WS:{
                Connected: 'Mit dem Server verbunden',
                LostConError: 'Verbindung zum Server wurde unterbrochen',
                UnknownError: 'Unbekannter Fehler mir der Serververbindung...',
                Reached_Day_limit: 'Du hast heute die maximale Anzahl an Coins für heute erreicht',
            },
            Error: {
                400: 'Fehlerhafte Anfrage',
                401: 'Nicht autorisierter Zugriff',
                403: 'Zugriff verweigert',
                404: 'Nutzer nicht gefunden',
                410: 'Das Dokument wurde nicht gefunden',
                429: 'Zu viele Anfragen',
                500: 'Interner Server Fehler',
                503: 'Service nicht verfügbar',
                504: 'Gateway Timeout',
            }
        },
        en: {
            Startup: {
                Welcome: 'Please enter your E-Mail Address',
                UserFound: 'Your Account was found',
            },
            TextBox: {
                CoinStats: 'Possible Coins today: ',
                KlickStats: 'Today\'s Clicks: ',
            },
            WS:{
                Connected: 'Connected to Server',
                LostConError: 'Lost Connection to Server',
                UnknownError: 'Unknown Error with Server Connection...',
                Reached_Day_limit: 'You have reached the maximum amount of Coins for today',
            },
            Error: {
                400: 'Bad Request',
                401: 'Unauthorized Access',
                403: 'Access Denied',
                404: 'User not found',
                410: 'Document not found',
                429: 'Too many requests',
                500: 'Internal Server Error',
                503: 'Service Unavailable',
                504: 'Gateway Timeout',
            }
        },
        it: {
            Startup: {
                Welcome: 'Per favore inserisci la tua E-Mail',
                UserFound: 'Il tuo Account è stato trovato',
            },
            TextBox: {
                CoinStats: 'Coins possibili oggi: ',
                KlickStats: 'Clicchi oggi: ',
            },
            WS:{
                Connected: 'Connesso al Server',
                LostConError: 'Connessione al Server persa',
                UnknownError: 'Errore sconosciuto con il Server',
                Reached_Day_limit: 'Hai raggiunto il massimo numero di Coins per oggi',
            },
            Error: {
                400: 'Richiesta non valida',
                401: 'Accesso non autorizzato',
                403: 'Accesso negato',
                404: 'Account non trovato',
                410: 'Documento non trovato',
                429: 'Troppi richieste',
                500: 'Errore interno del server',
                503: 'Servizio non disponibile',
                504: 'Timeout del Gateway',
            }
        },
        ua: {
            Startup: {
                Welcome: 'Будь ласка, введіть вашу E-Mail адресу',
                UserFound: 'Ваш акаунт знайдено',
            },
            TextBox: {
                CoinStats: 'Можливі монети сьогодні: ',
                KlickStats: 'Кліки сьогодні: ',
            },
            WS:{
                Connected: 'Підключено до сервера',
                LostConError: 'Відключення від сервера',
                UnknownError: 'Невідома помилка з підключенням до сервера',
                Reached_Day_limit: 'Ви досягли максимальної кількості монет за сьогодні',
            },
            Error: {
                400: 'Невідповідна запит',
                401: 'Неавторизований доступ',
                403: 'Доступ заборонено',
                404: 'Користувач не знайдено',
                410: 'Документ не знайдено',
                429: 'Забагато запитів',
                500: 'Внутрішня помилка сервера',
                503: 'Сервіс недоступний',
                504: 'Перевитрачення часу на сервері',
            }
        },
        fr: {
            Startup: {
                Welcome: 'Veuillez entrer votre adresse E-Mail',
                UserFound: 'Votre compte a été trouvé',
            },
            TextBox: {
                CoinStats: 'Coins possibles aujourd\'hui: ',
                KlickStats: 'Clics aujourd\'hui: ',
            },
            WS:{
                Connected: 'Connecté au serveur',
                LostConError: 'Connexion au serveur perdue',
                UnknownError: 'Erreur inconnue avec le serveur',
                Reached_Day_limit: 'Vous avez atteint le nombre maximum de Coins pour aujourd\'hui',
            },
            Error: {
                400: 'Requête invalide',
                401: 'Accès non autorisé',
                403: 'Accès refusé',
                404: 'Compte non trouvé',
                410: 'Document non trouvé',
                429: 'Trop de requêtes',
                500: 'Erreur interne du serveur',
                503: 'Service non disponible',
                504: 'Dépassement du délai de connexion',
            }
        }
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