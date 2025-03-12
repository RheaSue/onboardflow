
function renderContent(msoName, supportModelList, deviceType, language) {
    const localizedTexts = locales[language];

    // 渲染头部
    const header = renderHeader(msoName, supportModelList, deviceType, localizedTexts);

    // 渲染主要内容
    const mainContent = `
        <ul>
            ${renderContentStep(1, localizedTexts.firstTitle, localizedTexts.firstDescription(deviceType), `src/images/${msoName}/devices/sh_plug_into_outlet_${deviceType.toLowerCase()}.png`, `${deviceType} power outlet`)}

            ${renderContentStep(2, localizedTexts.secondTitle, localizedTexts.secondDescription(deviceType), `src/images/${msoName}/devices/sh_keep_it_clear_${deviceType.toLowerCase()}.png`, `${deviceType} keep clear`)}

            ${renderLightStatusSection(3, localizedTexts, deviceType, msoName)}
        </ul>
    `;

    // 渲染底部
    const footer = renderFooter(localizedTexts);

    // 将渲染好的内容插入到页面
    document.getElementById('content-container').innerHTML = `
    ${header} 
    <main>
        ${mainContent}
    </main>
    ${footer}`;

    // 事件绑定
    backAction();
    toggleAction(mapDeviceTypeToIndex(deviceType));
}

// 渲染头部
function renderHeader(msoName, supportModelList, deviceType, localizedTexts) {
    return `
    <header>
        <img class="logoImage" src="src/images/${msoName}/l_logo.png" alt="logo" />

        <div class="navigation">
            ${renderBackButton(localizedTexts.back)}
            ${renderDeviceToggle(deviceType, localizedTexts)}
            ${renderPopup(supportModelList)}
        </div>
    </header>
    `;
}

// 渲染返回按钮
function renderBackButton(backText) {
    return `
    <button class="btn-with-arrow">
        <img class="arrow-icon" src="src/images/general/l_back.png" alt="arrow-icon" />
        <span class="btn-back-text">${backText}</span>
    </button>
    `
}

// 渲染设备选择下拉按钮
function renderDeviceToggle(deviceType) {
    return `
    <button class="btn-with-toggle">
        <img class="search-icon" src="src/images/general/sh_country.png" alt="search-icon" />
        <span class="btn-type-text">${deviceType}</span>
        <img class="down-icon" src="src/images/general/arrow_drop_down.png" alt="down-icon" />
    </button>
    `;
}

// 渲染设备选择弹出框
function renderPopup(supportModelList) {

    const popupItems = supportModelList.map((deviceTypeName) => {
        const isSelected = deviceTypeName === g_l_deviceType ? "selected" : "";
        return `
        <li class="popup-item ${isSelected}">
            <img class="popup-device-image" src="src/images/general/${deviceTypeName.toLowerCase()}.png" alt="${deviceTypeName}" />
            <span>${deviceTypeName}</span>
        </li>`;
    }).join("");

    return `
        <div class="popup hidden">
            <ul class="popup-list">
                ${popupItems}
            </ul>
        </div>
    `;
}

// 渲染步骤内容
function renderContentStep(stepNumber, title, description, imagePath, altText) {
    return `
    <li>
        <div>
            <span class="badge">${stepNumber}</span>

            <p class="content-title first-title">${title}</p>
        </div>

        <div class="content first-content">
            <p class="first-description">${description}</p>

            <img class="dynamic-image first-image" src="${imagePath}" alt="${altText}" />
        </div>
    </li>
    `;
}

// 渲染灯光状态部分
function renderLightStatusSection(stepNumber, localizedTexts, deviceType, msoName) {
    const lightStatusRows = [
        { 
            status: localizedTexts.slowbliking, 
            color: localizedTexts.green, 
            operation: localizedTexts.booting, 
            class1: "minor-color-text minor-color-span", 
            class2: "mid-gray-color-text" 
        },

        { 
            status: localizedTexts.blinking, 
            color: localizedTexts.whiteGreen, 
            operation: localizedTexts.enablingwifi, 
            class1: "minor-color-text minor-color-span", 
            class2: "mid-gray-color-text" 
        },

        { 
            status: localizedTexts.slowbliking, 
            color: localizedTexts.white, 
            operation: localizedTexts.readyToBePaired, 
            class1: "minor-color-span", 
            class2: "gray-color-text" 
        },
    ];

    const lightStatusHtml = lightStatusRows.map((row) => {
        return `
        <tr>
            <td>
                <p class="gray-color-text">${row.status} <span class="${row.class1}">${row.color}</span></p>
            </td>

            <td>
                <p class="${row.class2}">${row.operation}</p>
            </td>
        </tr>
        `;
    }).join("");

    return `
    <li>
        <div>
            <span class="badge">${stepNumber}</span>

            <p class="content-title first-title">${localizedTexts.thirdTitle}</p>
        </div>

        <div class="content first-content">
            <p class="first-description">
                ${localizedTexts.thirdDescription(deviceType)}
            </p>

            <div class="light-status-container">
                <div class="light-status-box-3411">
                    <img class="light-status-image" src="src/images/${msoName}/devices/sd_led_status_${deviceType.toLowerCase()}.png" alt="${deviceType} light status" />

                    <span class="light-status-text ${deviceType}">${localizedTexts.led}</span>
                </div>

                <table>
                    ${lightStatusHtml}
                </table>
            </div>
        </div>
    </li>
    `;
}

// 渲染底部
function renderFooter(localizedTexts) {
    return `
    <footer>
		<div>
			<span class="ultralight-text">${localizedTexts.footerFirstLine}</span>
			<br />
			<span class="semibold-text">${localizedTexts.footerSecondLine}</span>
			<div class="footer-line"></div>
		</div>
	</footer>
    `;
}


function backAction() {
	// 找到 'btn-with-arrow' 按钮
	const backButton = document.querySelector('.btn-with-arrow');

	// 添加点击事件监听器
	backButton.addEventListener('click', () => {
		// 与 native app 交互的函数
		sendBackToNativeApp();
	});
}

function sendBackToNativeApp() {
	// alert("返回上一页");
	const message = { action: "back" };
	try {
		window.webkit.messageHandlers.backAction.postMessage(message);
		return;
	} catch (error) {
		console.log("iOS app bridge is not available");
	}
    
	try {
		window.androidFunction.backAction(message);
		return;
	} catch (error) {
		console.log("Android app bridge is not available");
	}

	try {
		window.opener.postMessage(message);
		return;
	} catch (error) {
		console.log("window bridge is not available");
	}
}

function toggleAction(selectedItem = 0) {
    const toggleButton = document.querySelector('.btn-with-toggle');
    const popup = document.querySelector('.popup');
    const popupItems = document.querySelectorAll('.popup-item');
    const btnTypeText = document.querySelector('.btn-type-text');

    // 设置默认选中行
    if (popupItems[selectedItem]) {
        popupItems.forEach((el) => el.classList.remove('selected')); // 清除所有选中状态
        popupItems[selectedItem].classList.add('selected'); // 设置默认选中行
        // btnTypeText.textContent = popupItems[selectedItem].textContent; // 更新按钮文本
    }

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

            console.log(item.textContent.trim());
            g_l_deviceType = item.textContent.trim();
            // 更新按钮文本
            // btnTypeText.textContent = item.textContent;
            // 更新页面内容
            updateContent(g_l_deviceType);
            // 隐藏弹窗
            popup.style.display = 'none';
        });
    });

    // 点击弹窗外部隐藏弹窗
    document.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

// 更新内容的函数
function updateContent(deviceType) {
    renderContent(g_c_msoName, g_l_supportModelListArr, deviceType, g_c_language)
}
