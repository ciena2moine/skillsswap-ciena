// Basic JavaScript setup for Skill Swap.
// Used AI to help with coding and testing.
console.log("Welcome to Skill Swap!");

const detailButtons = document.querySelectorAll(".details-button");

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