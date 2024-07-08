document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("language");
    const loginTitle = document.getElementById("loginTitle");
    const usernameLabel = document.getElementById("usernameLabel");
    const passwordLabel = document.getElementById("passwordLabel");
    const loginButton = document.getElementById("loginButton");
  
    let selectedLanguage = 'tr';
    const translationsCache = {};
  
    loadTranslations(selectedLanguage);
  
    async function loadTranslations(lang) {
      if (translationsCache[lang]) {
        updateTranslations(translationsCache[lang]);
        return;
      }
  
        const response = await fetch(`language_packs/${lang}.csv`);
        const text = await response.text();
        const translations = {};
        const rows = text.split('\n');
        rows.forEach(row => {
          const [key, value] = row.split(',');
          translations[key] = value;
        });
  
        translationsCache[lang] = translations;
        updateTranslations(translations);
    }
  
    function updateTranslations(translations) {
      loginTitle.textContent = translations['loginTitle'];
      usernameLabel.textContent = translations['usernameLabel'];
      passwordLabel.textContent = translations['passwordLabel'];
      loginButton.textContent = translations['loginButton'];
    }
  
    languageSelect.addEventListener("change", () => {
      selectedLanguage = languageSelect.value;
      loadTranslations(selectedLanguage);
    });
  });
  