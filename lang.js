const translations = {
    ru: {
        // Главная
        titlePart1: "TCK",
        titlePart2: "Team",
        menuSostav: "Составы",
        menuMatches: "Матчи",
        menuSocial: "Соцсети",
        
        // Страница состава
        sostavTitle: "Состав команды",
        cap: "(Капитан)",
        backBtn: "← Назад на главную",

        // Страница соцсетей
        followTitle: "ПОДПИСЫВАЙТЕСЬ",
        platformLabel: "Платформа",
        instaLabel: "Инстаграм",
        ytLabel: "Ютуб",
        dsLabel: "Дискорд",
        ttLabel: "ТикТок"
    },
    en: {
        // Main
        titlePart1: "TCK",
        titlePart2: "Team",
        menuSostav: "Rosters",
        menuMatches: "Matches",
        menuSocial: "Social",

        // Sostav Page
        sostavTitle: "Team Roster",
        cap: "(Captain)",
        backBtn: "← Back to Main",

        // Social Page
        followTitle: "FOLLOW US",
        platformLabel: "Platform",
        instaLabel: "Instagram",
        ytLabel: "YouTube",
        dsLabel: "Discord",
        ttLabel: "TikTok"
    }
};

/**
 * Функция для обновления текстов на странице
 */
function updateLanguage() {
    // Определяем язык: берем из хранилища браузера или ставим английский по умолчанию
    const lang = localStorage.getItem('preferredLang') || 'en';
    
    // Ищем все элементы, у которых есть атрибут data-lang
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-lang'); // Получаем ключ, например "sostavTitle"
        
        // Если такой ключ есть в нашем объекте перевода — меняем текст
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

/**
 * Функция для смены языка пользователем (например, через кнопку)
 * @param {string} newLang - 'ru' или 'en'
 */
function setLanguage(newLang) {
    localStorage.setItem('preferredLang', newLang);
    updateLanguage();
}

// Запускаем перевод, когда страница полностью загрузилась
document.addEventListener('DOMContentLoaded', updateLanguage);
