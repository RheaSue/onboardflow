// 创建一个语言管理对象来加载不同的语言文件
const languageData = {
    en: "./src/locales/en.json",
    fr: "./src/locales/fr.json"
}


// 获取 URL 中的语言参数
function getLanguageFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("language") || "en";   // 默认语言为 'en'
}

// 加载语言文件的函数
function loadLanguage(language) {
    fetch(languageData[language])
        .then(response => response.json())
        .then(data => {
            // 更新页面的文本和图片
            // document.getElementById('title').textContent = data.title;
        })
        .catch(error => {
            console.error('Error loading language data:', error);
        });
}

// 获取当前语言
const currentLanguage = getLanguageFromURL();

// 加载对应的语言
loadLanguage(currentLanguage);
