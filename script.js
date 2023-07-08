const billInputField = document.querySelector('.bill-input');
const tipPercentageButtons = document.querySelectorAll('.buttons-grid button');
const tipCustomInput = document.querySelector('.tip-input');
const peopleInputField = document.querySelector('.people-input');
const resultTipAmount = document.querySelector('.result-value.amount');
const resultPersonTotal = document.querySelector('.result-value.total');
const resetButton = document.querySelector('.results-card button');

// Recalculates the tip values and displays it on the results card
function refreshTipResults() {
    billInputField.parentNode.classList.remove('error');
    tipCustomInput.parentNode.classList.remove('error');
    peopleInputField.parentNode.classList.remove('error');
    let validValues = true;

    let billValue = Number.parseInt(billInputField.value);
    if (isNaN(billValue) || billValue < 0) {
        billInputField.parentNode.classList.add('error');
        resultTipAmount.innerText = '0.00';
        resultPersonTotal.innerText = '0.00';
        resetButton.classList.remove('disabled');
        billInputField.parentNode.dataset['message'] = isNaN(billValue) ? 'Invalid number' : "can't be negative";
        validValues = false;
    }

    let tipPercentage =  Number.parseInt(tipCustomInput.value);
    if (isNaN(tipPercentage) || tipPercentage <= 0) {
        tipPercentageButtons.forEach((btn) => {
            if (btn.classList.contains('active')) {
                tipPercentage = Number.parseInt(btn.innerText);
            }
        });
    }
    if (isNaN(tipPercentage) || tipPercentage <= 0) {
        validValues = false;
        tipCustomInput.parentNode.classList.add('error');
        tipCustomInput.parentNode.dataset['message'] = tipPercentage < 0 ? "Can't be negative" : "Invalid number";
    }

    let numberOfPeople = Number.parseInt(peopleInputField.value);
    if (isNaN(numberOfPeople) || numberOfPeople < 0) {
        validValues = false;
        peopleInputField.parentNode.classList.add('error');
        peopleInputField.parentNode.dataset['message'] = isNaN(numberOfPeople) ? "Invalid number" : "Must be positive number";
    }

    if (validValues) {
        console.log(`Bill: ${billValue}, Tip: ${tipPercentage}, People: ${numberOfPeople}`);

        let totalTips = billValue * tipPercentage / 100;
        let tipAmount = totalTips / numberOfPeople;
        let personTotal = (billValue / numberOfPeople) + tipAmount;
        
        resultTipAmount.innerText = `$${tipAmount.toFixed(2)}`;
        resultPersonTotal.innerText = `$${personTotal.toFixed(2)}`;
        resetButton.classList.remove('disabled');
    } else {
        resetButton.classList.add('disabled');
    }
}

billInputField.oninput = refreshTipResults;
tipPercentageButtons.forEach((btn) => {
    btn.onclick = () => {
        tipPercentageButtons.forEach((b) => {
            if (b === btn) return;
            b.classList.remove('active');
        });
        btn.classList.toggle('active');
        refreshTipResults();
    };
});
tipCustomInput.oninput = refreshTipResults;
peopleInputField.oninput = refreshTipResults;
resetButton.onclick = () => {
    if (resetButton.classList.contains('disabled')) return;
    billInputField.value = '';
    tipPercentageButtons.forEach((btn) => {
        btn.classList.remove('active');
    });
    tipCustomInput.value = '';
    peopleInputField.value = '';
    resultTipAmount.innerText = '$0.00';
    resultPersonTotal.innerText = '$0.00';
    resetButton.classList.add('disabled');
};