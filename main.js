
// 获取 URL 参数或默认值
const urlParams = new URLSearchParams(window.location.search);

const g_c_msoName = urlParams.get('msoName') || 'hitron';
const g_c_language = urlParams.get('language') || 'en';
const g_c_supportModelListString = urlParams.get('supportModelList');
let g_l_deviceType = urlParams.get('deviceType') || 'ARIA2210';
let g_l_supportModelListArr = [];

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

// 设备类型映射到对应的索引
function mapDeviceTypeToIndex(deviceType) {
    // 创建设备的映射对象
    const deviceMap = g_l_supportModelListArr.reduce((map, device, index) => {
        map[device] = index; // 将设备名作为键，索引作为值
        return map;
    }, {});

    // 根据传入的设备类型找到对应的索引，没有找到则返回 0
    let result = deviceMap[deviceType] || 0;
    return result;
}

function initPage() {
	g_l_supportModelListArr = (g_c_supportModelListString&&g_c_supportModelListString.length > 0) ? g_c_supportModelListString.split(',') : null;
	console.log(g_l_supportModelListArr);

	if (g_l_supportModelListArr && g_l_supportModelListArr.length > 0) {
		g_l_supportModelListArr = [...new Set(g_l_supportModelListArr)]; // 去重
		g_l_supportModelListArr.sort(); // 排序
		g_l_deviceType = g_l_supportModelListArr[0]; // 默认选中第一个设备类型
		renderList(g_c_msoName, g_l_supportModelListArr, g_c_language)
	} else {
		g_l_supportModelListArr = ['ARIA2210', 'ARIA3411', 'ARIA3625', 'ARIA3626', 'ARIA3629'];
		g_l_deviceType = g_l_supportModelListArr[0]; // 默认选中第一个设备类型
		renderContent(g_c_msoName, g_l_supportModelListArr, g_l_deviceType, g_c_language)
	}
}

setThemeColor(g_c_msoName);
initPage();
