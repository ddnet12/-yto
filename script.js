const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '7️⃣'];
const spinBtn = document.getElementById('spin-btn');
const slots = [
    document.getElementById('slot1'),
    document.getElementById('slot2'),
    document.getElementById('slot3')
];
const balanceElement = document.getElementById('balance');
const betInput = document.getElementById('bet');
const resultElement = document.getElementById('result');

let balance = 1000;

function spin() {
    const bet = parseInt(betInput.value);
    
    // Проверка ставки
    if (isNaN(bet) {
        resultElement.textContent = "Введите корректную ставку!";
        return;
    }
    
    if (bet < 10) {
        resultElement.textContent = "Минимальная ставка - 10 ₽!";
        return;
    }
    
    if (bet > balance) {
        resultElement.textContent = "Недостаточно средств!";
        return;
    }
    
    // Спин
    balance -= bet;
    balanceElement.textContent = balance;
    spinBtn.disabled = true;
    resultElement.textContent = "";
    
    // Анимация вращения
    const spins = [];
    for (let i = 0; i < 3; i++) {
        spins[i] = setInterval(() => {
            slots[i].textContent = symbols[Math.floor(Math.random() * symbols.length)];
        }, 100);
    }
    
    // Остановка через случайное время
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            clearInterval(spins[i]);
        }
        
        // Определение результатов
        const results = slots.map(slot => slot.textContent);
        checkWin(results, bet);
        spinBtn.disabled = false;
    }, 1000 + Math.random() * 2000);
}

function checkWin(results, bet) {
    // Все три одинаковые
    if (results[0] === results[1] && results[1] === results[2]) {
        let multiplier = 5;
        if (results[0] === '7️⃣') multiplier = 10;
        
        const win = bet * multiplier;
        balance += win;
        balanceElement.textContent = balance;
        resultElement.textContent = `Вы выиграли ${win} ₽! (x${multiplier})`;
        return;
    }
    
    // Два одинаковых
    if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
        const win = bet * 2;
        balance += win;
        balanceElement.textContent = balance;
        resultElement.textContent = `Вы выиграли ${win} ₽! (x2)`;
        return;
    }
    
    resultElement.textContent = "Повезёт в следующий раз!";
}

spinBtn.addEventListener('click', spin);
