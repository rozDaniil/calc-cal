const caloriesNormal = document.querySelector('#calories-norm');
const caloriesMin = document.querySelector('#calories-minimal');
const caloriesMax = document.querySelector('#calories-maximal');
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const gender = document.querySelectorAll('.switcher input');
const radioContainer = document.querySelectorAll('.radios-group input');
const inputContainer = document.querySelector('.inputs-group');
const submitResult = document.querySelector('.form__submit-button');
const resetResult = document.querySelector('.form__reset-button');
const resultContainer = document.querySelector('.counter__result');

const maleFormula = (age, weight, height) => {
    return ((10 * weight) + (6.25 * height) - (5 * age) - 161).toFixed(0);
}

const femaleFormula = (age, weight, height) => {
    return ((10 * weight) + (6.25 * height) - (5 * age) + 5).toFixed(0);
}

inputContainer.addEventListener('input', () => {
    resetResult.removeAttribute('disabled');
    if (age.value !== '' && height.value !== '' && weight.value !== '') {
        submitResult.removeAttribute('disabled');
    }
});

function calculate(age, weight, height) {
    let result = 0;
    for (let elem of gender) {
        if (elem.checked && elem.value === 'female') {
            result += femaleFormula(age, weight, height);
        } else if (elem.checked && elem.value === 'male') {
            result += maleFormula(age, weight, height);
        }
    }

    for (let elem of radioContainer) {
        if (elem.checked) {
            result *= elem.value;
        }
    }
    return result;
};

submitResult.addEventListener('click', () => {
    event.preventDefault();
    resultContainer.classList.remove('counter__result--hidden');
    caloriesNormal.innerHTML = (Number(calculate(age.value, weight.value, height.value))).toFixed(0);
    caloriesMin.innerHTML = (caloriesNormal.innerHTML * 0.75).toFixed(0);
    caloriesMax.innerHTML = (caloriesNormal.innerHTML * 1.25).toFixed(0);
});

resetResult.addEventListener('click', () => {
    resultContainer.classList.add('counter__result--hidden');
});