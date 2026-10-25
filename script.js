// Basic JavaScript setup for Skill Swap.
// Used AI to help with coding and testing.
console.log("Welcome to Skill Swap!");

const detailButtons = document.querySelectorAll(".details-button");
const rateInput = document.getElementById('hourly-rate');
const hoursInput = document.getElementById('hours');
const calculateButton = document.getElementById('calculate-button');
const costResult = document.getElementById('cost-result');

detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".skill-card");
        const details = card.querySelector(".skill-details");

        const isHidden = details.hidden;

        if (isHidden) {
            details.textContent = button.dataset.details;
            details.hidden = false;
            button.textContent = "Hide Details";
            button.setAttribute("aria-expanded", "true");
        } else {
            details.hidden = true;
            details.textContent = "";
            button.textContent = "View Details";
            button.setAttribute("aria-expanded", "false");
        }
    });
});

calculateButton.addEventListener("click", () => {
    const hourlyRate = Number(rateInput.value);
    const hours = Number(hoursInput.value);

    if (
        rateInput.value.trim() == '' ||
        hoursInput.value.trim() == '' ||
        !Number.isFinite(hourlyRate) ||
        !Number.isFinite(hours) ||
        hourlyRate < 0 ||
        hours < 0
    ) {
        costResult.textContent =
            'Please enter a valid, non-negative rate and number of hours.';
        return;
    }

    const total = calculateTotalCosts(hourlyRate, hours);

    costResult.textContent = `Total cost: $${total.toFixed(2)}`;
});
