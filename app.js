const billAmount = document.querySelector('#bill')
const tipPercentBtns = document.querySelectorAll('.tip-percent button')
const customTipPercent = document.querySelector('#custom-tip')
const numberOfPeople = document.querySelector('#people-num')
const resetBtn = document.querySelector('.reset-btn')

let peopleNumber = 1
let tipValue = 0
let bill = 0

let tipPerson = 0
let totalPerson = 0

const calculateTip = (bill, tipPercent) => {
    return +(bill / 100 * tipPercent).toFixed(2)
}

billAmount.addEventListener('input', () => {
    bill = +billAmount.value
    const tip = calculateTip(bill, tipValue)
    tipPerson = tip / peopleNumber
    totalPerson = (bill / peopleNumber) + tipPerson
})

tipPercentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tipValue = +btn.value
        tipPercentBtns.forEach(button => {
            if (+button.value === tipValue) {
                button.classList.add('active')
            } else {
                button.classList.remove('active')
            }
        })
    })
})

