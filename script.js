const myButton = document.getElementById('submit__btn');

const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const dayLabel = document.getElementById('label__day');
const monthLabel = document.getElementById('label__month');
const yearLabel = document.getElementById('label__year');

const dayTextError = document.getElementById('dayText-error');
const monthTextError = document.getElementById('monthText-error');
const yearTextError = document.getElementById('yearText-error');

const dayOutput = document.getElementById('days_output');
const monthOutput = document.getElementById('months_output');
const yearOutput = document.getElementById('years_output');

const currentDate = new Date(); // Create a new Date object representing the current date and time.
const currentYear = currentDate.getFullYear(); // Get the current year (e.g., 2023).


myButton.onclick = function () {
    const dayValue = dayInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();


    if (dayValue === '') {
        dayLabel.classList.add('error');
        dayInput.classList.add('error');
        dayTextError.style.display = 'block';
        dayTextError.textContent = 'This field is required';
    } else if (dayValue < 1 || dayValue > 31) {
        dayLabel.classList.add('error');
        dayInput.classList.add('error');
        dayTextError.style.display = 'block';
        dayTextError.textContent = 'Must be a valid date';
    } 
    else if (isDateValid(dayValue)) {
        dayLabel.classList.add('error');
        dayInput.classList.add('error');
        dayTextError.style.display = 'block';
        dayTextError.textContent = 'Must be a valid date!';
    } else {
        dayLabel.classList.remove('error');
        dayInput.classList.remove('error');
        dayTextError.style.display = 'none';
        dayTextError.textContent = '';
    } 

    if (monthValue === '') {
        monthLabel.classList.add('error');
        monthInput.classList.add('error');
        monthTextError.style.display = 'block';
        monthTextError.textContent = 'This field is required';
    } else if (monthValue < 1 || monthValue > 12) {
        monthLabel.classList.add('error');
        monthInput.classList.add('error');
        monthTextError.style.display = 'block';
        monthTextError.textContent = 'Must be a valid month';
    } else {
        monthLabel.classList.remove('error');
        monthInput.classList.remove('error');
        monthTextError.style.display = 'none';
        monthTextError.textContent = '';
    }

    if (yearValue === '') {
        yearLabel.classList.add('error');
        yearInput.classList.add('error');
        yearTextError.style.display = 'block';
        yearTextError.textContent = 'This field is required';
    } else if (yearValue > currentYear) {
        yearLabel.classList.add('error');
        yearInput.classList.add('error');
        yearTextError.style.display = 'block';
        yearTextError.textContent = 'Must be in the past';
    } else {
        yearLabel.classList.remove('error');
        yearInput.classList.remove('error');
        yearTextError.style.display = 'none';
        yearTextError.textContent = '';
    }

     // Parse input values into integers
    const dayInt = parseInt(dayValue, 10);
    const monthInt = parseInt(monthValue, 10);
    const yearInt = parseInt(yearValue, 10);

    // Check if the parsed values are valid
    if (isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt)) {
        // Handle invalid input here
        return;
    }

     //Create Date objects and calculate age
    const givenDate = new Date(yearInt, monthInt - 1, dayInt);
    const ageInMilliseconds = currentDate - givenDate;
    const ageInDays = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));

    // Calculate age in months based on the year and month difference
    const yearDifference = currentDate.getFullYear() - givenDate.getFullYear();
    const monthDifference = currentDate.getMonth() - givenDate.getMonth();
    const ageInMonths = yearDifference * 12 + monthDifference;

    const ageInYears = currentYear - yearInt;

    // Calculate the remaining days and months
    const remainingMonths = ageInMonths % 12;
    const remainingDays = ageInDays % 30;

    // Set the output values
    dayOutput.textContent = `${remainingDays}`;
    dayOutput.classList.add('animated-number');
    monthOutput.textContent = `${remainingMonths}`;
    monthOutput.classList.add('animated-number');
    yearOutput.textContent = `${ageInYears}`;
    yearOutput.classList.add('animated-number');

}

function isDateValid(day, month, year) {
    // Define the maximum number of days for each month in a non-leap year.
    const maxDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check if the year is a leap year (February has 29 days).
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDaysPerMonth[1] = 29;
    }

    // Check if the day is within the valid range for the given month.
    return day <= maxDaysPerMonth[month - 1];
}
