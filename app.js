const billAmount = document.querySelector('#bill')
const tipPercentBtns = document.querySelectorAll('.tip-percent button')
const customTipPercent = document.querySelector('#custom-tip')
const numberOfPeople = document.querySelector('#people-num')
const resetBtn = document.querySelector('.reset-btn')
const tipTotalElement = document.querySelector('.tip-total')
const personTotalElement = document.querySelector('.person-total')

let peopleNumber = 1
let tipValue = 0
let bill = 0

let tipPerson = 0
let totalPerson = 0

const calculateTip = (bill, tipPercent) => {
    return +(bill / 100 * tipPercent).toFixed(2)
}

const calculatePersonTip = (tip) => tip / peopleNumber
const calculatePersonTotal = () => bill / peopleNumber + tipPerson

const calculateTotals = () => {
    if (bill === 0) return
    const tip = calculateTip(bill, tipValue)
    tipPerson = calculatePersonTip(tip)
    totalPerson = calculatePersonTotal()
}

const displayTotals = () => {
    tipTotalElement.innerText = `$${tipPerson.toFixed(2)}`
    personTotalElement.innerText = `$${totalPerson.toFixed(2)}`
}

const toggleResetBtn = () => {
    if (bill > 0) {
        resetBtn.classList.remove('disabled')
    } else {
        resetBtn.classList.add('disabled')
    }
}

billAmount.addEventListener('input', () => {
    bill = +billAmount.value
    calculateTotals()
    displayTotals()
    toggleResetBtn()
})

tipPercentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tipValue = +btn.value
        calculateTotals()
        displayTotals()
        tipPercentBtns.forEach(button => {
            if (+button.value === tipValue) {
                button.classList.add('active')
            } else {
                button.classList.remove('active')
            }
        })
    })
})

customTipPercent.addEventListener('input', () => {
    if (customTipPercent.value === '') {
        tipValue = 0
        calculateTotals()
        displayTotals()
        return
    }

    tipValue = +customTipPercent.value
    calculateTotals()
    displayTotals()
    tipPercentBtns.forEach(btn => btn.classList.remove('active'))
})

numberOfPeople.addEventListener('input', () => {
    if (+numberOfPeople.value === 0) {
        numberOfPeople.parentElement.classList.add('error')
        return
    } else {
        numberOfPeople.parentElement.classList.remove('error')
    }

    if (+numberOfPeople.value < 1 || numberOfPeople.value === '') {
        peoplenumber = 1
        return
    }
    peopleNumber = +numberOfPeople.value
    calculateTotals()
    displayTotals()
})

resetBtn.addEventListener('click', () => {
    if (resetBtn.classList.contains('disabled')) return

    bill = 0
    tipValue = 0
    peoplenumber = 0
    tipPerson = 0
    totalPerson = 0

    tipPercentBtns.forEach(btn => btn.classList.remove('active'))
    resetBtn.classList.add('disabled')

    billAmount.value = ''
    customTipPercent.value = ''
    numberOfPeople.value = ''

    displayTotals()
})
