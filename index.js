// 获取所需元素
const toggleButton = document.querySelector('.btn-with-toggle');
const popup = document.querySelector('.popup');
const popupItems = document.querySelectorAll('.popup-item');
const btnTypeText = document.querySelector('.btn-type-text');

// 点击按钮显示/隐藏弹窗
toggleButton.addEventListener('click', (event) => {
    event.stopPropagation(); // 防止冒泡

    // 获取按钮的位置
    const buttonRect = toggleButton.getBoundingClientRect();

    // 设置弹窗的位置
    popup.style.top = `${buttonRect.top + window.scrollY}px`; // 对齐顶部
    popup.style.right = `${window.innerWidth - buttonRect.right}px`; // 右对齐

    // 显示或隐藏弹窗
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});

// 点击列表项更新文本并关闭弹窗
popupItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        // 移除其他选中项的背景色
        popupItems.forEach((el) => el.classList.remove('selected'));
        // 设置当前点击项为选中项
        item.classList.add('selected');
        // 更新按钮文本
        btnTypeText.textContent = item.textContent;
        // 隐藏弹窗
        popup.style.display = 'none';
    });
});

// 点击弹窗外部隐藏弹窗
document.addEventListener('click', () => {
    popup.style.display = 'none';
});

// 当前语言
let currentLanguage = 'english';

// 获取切换按钮和相关内容
// const toggleButton = document.querySelector('.btn-toggle-language');
const contentTitles = document.querySelectorAll('.content-title');
const contentDescriptions = document.querySelectorAll('.first-description');
const deviceImages = document.querySelectorAll('.first-image');
const deviceItems = document.querySelectorAll('.device-item');

// 更新内容
function updateContent(language) {
    // 更新按钮文本
    toggleButton.querySelector('.btn-language-text').textContent = language === 'english' ? 'Spanish' : 'English';

    // 更新每个设备的描述和图片
    deviceItems.forEach(item => {
        const deviceType = item.getAttribute('data-device');
        const deviceContent = contentData[language][deviceType];

        // 更新设备的描述
        const descriptionElement = item.querySelector('.first-description');
        descriptionElement.textContent = deviceContent.description;

        // 更新设备的图片
        const imageElement = item.querySelector('.first-image');
        imageElement.src = deviceContent.image;
    });
}

// 初始化时加载内容
updateContent(currentLanguage);

// 语言切换事件
// toggleButton.addEventListener('click', () => {
//     currentLanguage = currentLanguage === 'english' ? 'spanish' : 'english';
//     updateContent(currentLanguage);
// });


// 获取 URL 参数
const urlParams = new URLSearchParams(window.location.search);
const appMso = urlParams.get('appMso');
let deviceType = urlParams.get('deviceType');
let language = urlParams.get('language');

// 获取所有的图片元素和描述文本，更新路径和文本
const images = document.querySelectorAll('.dynamic-image');
images.forEach(image => {
    let src = image.getAttribute('src');
    // 替换路径中的设备和文件夹名称
    src = src.replace(/hitron|aria3411/g, (match) => match === 'hitron' ? appMso : deviceName.toLowerCase());
    image.setAttribute('src', src);
});

// 获取所有设备描述文本，并更新描述内容
const descriptions = document.querySelectorAll('.dynamic-text');
descriptions.forEach(description => {
    description.innerHTML = description.innerHTML.replace(/ARIA3411/g, deviceName);
});