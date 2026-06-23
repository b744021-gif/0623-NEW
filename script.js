// 定義四個不同的位置
const differences = [
    { x: 350, y: 80, radius: 45, name: '太陽位置' },      // 差異1：太陽
    { x: 310, y: 250, radius: 35, name: '紅樹' },         // 差異2：右邊樹葉顏色
    { x: 120, y: 340, radius: 15, name: '黃花' },         // 差異3：左邊花朵顏色
    { x: 100, y: 100, radius: 60, name: '雲朵' }          // 差異4：雲朵
];

let foundDifferences = new Set();
const messageEl = document.getElementById('message');
const foundEl = document.getElementById('found');
const imageBElement = document.getElementById('imageB');
const resetBtn = document.getElementById('resetBtn');

// 點擊事件監聽器
imageBElement.addEventListener('click', handleImageClick);
resetBtn.addEventListener('click', resetGame);

function handleImageClick(event) {
    // 獲取點擊位置
    const rect = imageBElement.getBoundingClientRect();
    const svg = imageBElement;
    
    // 計算 SVG 內的相對位置
    const clickX = (event.clientX - rect.left) * (400 / rect.width);
    const clickY = (event.clientY - rect.top) * (400 / rect.height);
    
    console.log(`點擊位置: (${clickX}, ${clickY})`);
    
    // 檢查是否點中任何差異
    let found = false;
    for (let i = 0; i < differences.length; i++) {
        const diff = differences[i];
        const distance = Math.sqrt(
            Math.pow(clickX - diff.x, 2) + Math.pow(clickY - diff.y, 2)
        );
        
        if (distance <= diff.radius && !foundDifferences.has(i)) {
            foundDifferences.add(i);
            showSuccess(diff.name);
            found = true;
            updateScore();
            break;
        }
    }
    
    if (!found && foundDifferences.size < differences.length) {
        showError();
    }
    
    // 檢查是否找到所有差異
    if (foundDifferences.size === differences.length) {
        showComplete();
    }
}

function showSuccess(name) {
    messageEl.textContent = `✓ 找到 ${name}！`;
    messageEl.className = 'message success';
    setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = 'message';
    }, 1500);
}

function showError() {
    messageEl.textContent = '✗ 沒有找到不同，繼續加油！';
    messageEl.className = 'message error';
    setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = 'message';
    }, 1200);
}

function showComplete() {
    messageEl.textContent = '🎉 恭喜！你找到了所有4處不同！';
    messageEl.className = 'message complete';
}

function updateScore() {
    foundEl.textContent = foundDifferences.size;
}

function resetGame() {
    foundDifferences.clear();
    foundEl.textContent = '0';
    messageEl.textContent = '';
    messageEl.className = 'message';
}

// 頁面加載時初始化
window.addEventListener('load', () => {
    console.log('遊戲已載入，準備開始！');
    console.log('差異位置:', differences);
});
