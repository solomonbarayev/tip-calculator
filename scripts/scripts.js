//query binders
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

//variables
const billTotal = query(".form__input_type_bill");
const totalTip = query(".output__number_type_total-tip");
const totalBill = query(".output__number_type_total-bill");
const percents = queryAll(".form__percent-option");
const people = query(".form__input_type_people");
const customTip = query(".form__percent-custom");
const form = query(".calculator__form");
const reset = query(".output__reset-button");

let billVal = 0;
function enterBillValue() {
  billVal = parseFloat(billTotal.value);
  calculateTip();
}

let tipPercent = 0;
function tipClick(event) {
  //resetting active state
  percents.forEach((btn) => {
    btn.classList.remove("form__percent-option_active");
    //add active state to clicked btn
    if (event.target.textContent === btn.textContent) {
      btn.classList.add("form__percent-option_active");
      //get value of current tip clicked on
      tipPercent = parseFloat(btn.textContent) / 100;
      if (billTotal.value == "") {
        totalBill.textContent = "$0.00";
      }
    }
  });

  calculateTip();
}

let numPeople = 1;
function handlePeopleInput() {
  numPeople = parseInt(people.value);
  numPeople < 1 ? (numPeople = 1) : (numPeople = numPeople);
  calculateTip();
}

function handleCustomTip() {
  tipPercent = parseFloat(customTip.value) / 100;
  //remove active class from tip buttons
  percents.forEach((btn) => {
    btn.classList.remove("form__percent-option_active");
  });
  calculateTip();
}

function calculateTip() {
  if (numPeople >= 1) {
    if (!isNaN(billVal)) {
      totalTip.textContent = `$${((billVal * tipPercent) / numPeople).toFixed(
        2
      )}`;
      totalBill.textContent = `$${(
        (billVal + tipPercent * 100) /
        numPeople
      ).toFixed(2)}`;
    } else {
      billVal = 0;
      tipPercent = 0;
    }
  }
}

function resetCalculator() {
  billVal = "0.0";
  percents.forEach((btn) => {
    btn.classList.remove("form__percent-option_active");
  });
  form.reset();
  totalBill.textContent = "$0.00";
  totalTip.textContent = "$0.00";
}

//EVENT LISTENERS
billTotal.addEventListener("input", enterBillValue);
percents.forEach((btn) => btn.addEventListener("click", tipClick));
customTip.addEventListener("input", handleCustomTip);
people.addEventListener("input", handlePeopleInput);
reset.addEventListener("click", resetCalculator);
