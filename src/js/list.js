
function renderList(msoName, supportModelListArr, language) {
    const localizedTexts = locales[language];

    // 渲染头部
    const header = renderListHeader(msoName, localizedTexts);
    const mainContent = renderScrollList(supportModelListArr, language);

    // 将渲染好的内容插入到页面
    document.getElementById('content-container').innerHTML = `
    ${header} 
    ${mainContent}
    `;

    listItemAction(mapDeviceTypeToIndex(g_l_deviceType));
}

function renderListHeader(msoName, localizedTexts) {
    return `
    <header>
        <img class="logoImage" src="src/images/${msoName}/l_logo.png" alt="logo" />

        <p class="list-p">${localizedTexts.selectSupportModel}</p>
    </header>
    `;
}

function renderScrollList(supportModelListArr, language) {
    const items = supportModelListArr.map((deviceTypeName) => {
        const isSelected = deviceTypeName === g_l_deviceType ? "selected" : "";
        return `
        <li class="listItem ${isSelected}">
            <img class="listItem-image" src="src/images/general/${deviceTypeName.toLowerCase()}.png" alt="${deviceTypeName}" />
            <span>${deviceTypeName}</span>
        </li>`;
    }).join("");

    return `
        <div>
            <ul class="list">
                ${items}
            </ul>
        </div>
    `;
}

function listItemAction(index) {
    const listItems = document.querySelectorAll(".listItem");

    listItems.forEach((item, i) => {    
        item.addEventListener("click", () => {
            // 移除其他选中项的背景色
            listItems.forEach((el) => el.classList.remove('selected'));

            // 设置当前点击项为选中项
            item.classList.add('selected');

            console.log(item.textContent.trim());

            g_l_deviceType = item.textContent.trim();
            
            updateContent(g_l_deviceType);
        });
    });
}