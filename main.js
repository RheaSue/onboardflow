function renderContent(msoName, deviceType, language) {
    const localizedTexts = locales[language];

    const content = `
    <header>
		<img class="logoImage" src="src/images/${msoName}/logo.png" alt="logo" />

		<div class="navigation">
			<button class="btn-with-arrow">
				<img class="arrow-icon" src="src/images/general/l_back.png" alt="arrow-icon" />
				<span class="btn-back-text">Back</span>
			</button>

			<button class="btn-with-toggle">
				<img class="search-icon" src="src/images/general/sh_country.png" alt="search-icon" />
				<span class="btn-type-text">${deviceType}</span>
				<img class="down-icon" src="src/images/general/arrow_drop_down.png" alt="down-icon" />
			</button>

			<div class="popup hidden">
				<ul class="popup-list">
					<li class="popup-item selected">
						<img class="popup-device-image" src="src/images/general/aria2210.png" alt="ARIA2210" />
						<span>ARIA2210</span>
					</li>
					<li class="popup-item">
						<img class="popup-device-image" src="src/images/general/aria3411.png" alt="ARIA3411" />
						<span>ARIA3411</span>
					</li>
					<li class="popup-item">
						<img class="popup-device-image" src="src/images/general/aria3625.png" alt="ARIA3625" />
						<span>ARIA3625</span>
					</li>
					<li class="popup-item">
						<img class="popup-device-image" src="src/images/general/aria3626.png" alt="ARIA3626" />
						<span>ARIA3626</span>
					</li>
					<li class="popup-item">
						<img class="popup-device-image" src="src/images/general/aria3629.png" alt="ARIA3629" />
						<span>ARIA3629</span>
					</li>
				</ul>
			</div>
		</div>
	</header>

	<main>
		<ul>
			<li>
				<div>
					<span class="badge">1</span>

					<p class="content-title first-title">Plug into power outlet</p>

				</div>

				<div class="content first-content">
					<p class="first-description">
                        Install ${deviceType} as close to the center of main floor to maximize Wi-Fi coverage.
                    </p>

					<img class="dynamic-image first-image" src="src/images/${msoName}/devices/sh_plug_into_outlet_${deviceType.toLowerCase()}.png" alt="${deviceType} power outlet" />
				</div>
			</li>

			<li>
				<div>
					<span class="badge">2</span>

					<p class="content-title first-title">Keep it clear from obstructions</p>

				</div>

				<div class="content first-content">
					<p class="first-description">
                        For the best Wi-Fi experience, make sure ${deviceType} is visible and not blocked by furniture or large objects.
                    </p>

					<img class="dynamic-image first-image" src="src/images/${msoName}/devices/sh_keep_it_clear_${deviceType.toLowerCase()}.png" alt="${deviceType} keep clear" />
				</div>
			</li>

			<li>
				<div>
					<span class="badge">3</span>

					<p class="content-title first-title">Check light status</p>

				</div>

				<div class="content first-content">
					<p class="first-description">
                        The front light should be slowly blinking white to show it is ready to be paired. If not, unplug then plug the ${deviceType} back in and wait until it starts blinking white.<br /><br />If after 2 minutes it is still not blinking white, you can try to do a factory reset by holding the Reset pin-hole button for more than 10 seconds. Then, wait for the slow blinking white light before continuing.
                    </p>

					<div class="light-status-container">
						<div class="light-status-box-3411">
							<img class="light-status-image" src="src/images/${msoName}/devices/sd_led_status_${deviceType.toLowerCase()}.png" alt="aria3411_light_status" />

							<span class="light-status-text ${deviceType}">LED</span>
						</div>

						<table>
							<tr>
								<td>
									<p class="gray-color-text">Slow blinking <span class="minor-color-text minor-color-span">(Green)</span></p>
								</td>

								<td>
									<p class="mid-gray-color-text">Booting</p>
								</td>
							</tr>

							<tr>
								<td>
									<p class="gray-color-text">Blinking <span class="minor-color-text minor-color-span">(White, Green)</span></p>
								</td>

								<td>
									<p class="mid-gray-color-text">Enabling Wi-Fi</p>
								</td>
							</tr>

							<tr>
								<td>
									<p class="gray-color-text">Slow blinking <span class="minor-color-span">(White)</span></p>
								</td>

								<td>
									<p class="gray-color-text">Ready to be paired</p>
								</td>
							</tr>
						</table>

					</div>
				</div>
			</li>
		</ul>

	</main>

	<footer>
		<div>
			<span class="ultralight-text">Creating technology for</span>
			<br />
			<span class="semibold-text">tomorrow's networks</span>
			<div class="footer-line"></div>
		</div>
	</footer>
    `;

    // 将内容插入到页面的 container 中
    document.getElementById('content-container').innerHTML = content;

    // 绑定点击事件
    toggleAction(deviceType === 'ARIA2210'? 0 : 
        deviceType === 'ARIA3411'? 1 :
        deviceType === 'ARIA3625'? 2 :
        deviceType === 'ARIA3626'? 3 :  
        deviceType === 'ARIA3629'? 4 : 0);
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
            deviceType = item.textContent.trim();
            // 更新按钮文本
            // btnTypeText.textContent = item.textContent;
            // 更新页面内容
            updateContent(msoName, deviceType, language);
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
function updateContent(msoName, deviceType, language) {
    renderContent(msoName, deviceType, language);
}

function setThemeColor(msoName = 'hitron') {
    const root = document.documentElement; // 获取 :root 元素，方便修改 CSS 变量

    if (msoName === 'fizz') {
        root.style.setProperty('--theme-main-color', '#00cf6e');
        root.style.setProperty('--theme-15-main-color', '#00cf6e26');
        root.style.setProperty('--theme-minor-color', '#006a48');
        root.style.setProperty('--theme-5-minor-color', '#006a4815');
        root.style.setProperty('--theme-10-minor-color', '#006a4820');
    } else if (msoName === 'midco') {
        root.style.setProperty('--theme-main-color', '#004c97');
        root.style.setProperty('--theme-15-main-color', '#00479726');
        root.style.setProperty('--theme-minor-color', '#00a3e0');
        root.style.setProperty('--theme-5-minor-color', '#00a3e015');
        root.style.setProperty('--theme-10-minor-color', '#00a3e020');
    } else {
        root.style.setProperty('--theme-main-color', '#006c9d');
        root.style.setProperty('--theme-15-main-color', '#006c9d26');
        root.style.setProperty('--theme-minor-color', '#00b4e3');
        root.style.setProperty('--theme-5-minor-color', '#00b4e315');
        root.style.setProperty('--theme-10-minor-color', '#00b4e320');
    }
}


// 获取 URL 参数或默认值
const urlParams = new URLSearchParams(window.location.search);
const msoName = urlParams.get('msoName') || 'hitron';
const language = urlParams.get('language') || 'en';
let deviceType = urlParams.get('deviceType') || 'ARIA3411';

setThemeColor(msoName);

// 渲染页面内容
renderContent(msoName, deviceType, language);
