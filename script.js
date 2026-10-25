 // Used AI to help with coding and testing.

console.log("Welcome to Skill Swap!");

const detailButtons = document.querySelectorAll(".details-button");
const rateInput = document.getElementById("hourly-rate");
const hoursInput = document.getElementById("hours");
const calculateButton = document.getElementById("calculate-button");
const costResult = document.getElementById("cost-result");
const findMatchButton = document.getElementById("find-match-button");
const categoryInput = document.getElementById("match-category");
const maxPriceInput = document.getElementById("match-max-price");
const matchResults = document.getElementById("match-results");


const skills = [
  { title: "Backend Development", category: "Computer Science", price: 30 },
  { title: "Pre-Calc", category: "Math", price: 35 },
  { title: "Cover Letter Review", category: "Internship", price: 20 },
  { title: "Software Development", category: "Computer Science", price: 30 },
  { title: "Resume Review", category: "Career", price: 0 }
];

// Skill card detail buttons
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

// Cost calculator
if (calculateButton && rateInput && hoursInput && costResult) {
  calculateButton.addEventListener("click", () => {
    const hourlyRate = Number(rateInput.value);
    const hours = Number(hoursInput.value);

    if (
      rateInput.value.trim() === "" ||
      hoursInput.value.trim() === "" ||
      !Number.isFinite(hourlyRate) ||
      !Number.isFinite(hours) ||
      hourlyRate < 0 ||
      hours < 0
    ) {
      costResult.textContent =
        "Please enter a valid, non-negative rate and number of hours.";
      return;
    }

    const total = calculateTotalCosts(hourlyRate, hours);

    costResult.textContent = `Total cost: $${total.toFixed(2)}`;
  });
}

// Find My Match
if (findMatchButton && categoryInput && maxPriceInput && matchResults) {
  findMatchButton.addEventListener("click", () => {
    const category = categoryInput.value;
    const maxPrice = Number(maxPriceInput.value);

    if (maxPriceInput.value.trim() === "" || !Number.isFinite(maxPrice) || maxPrice < 0) {
      matchResults.textContent = "Please enter a valid, non-negative maximum price.";
      return;
    }

    const userNeeds = { category, maxPrice };
    const matches = matchSkillsToUser(userNeeds, skills);

    if (matches.length === 0) {
      matchResults.textContent = "No matching skills found.";
      return;
    }

    matchResults.innerHTML = matches
      .map(
        (skill) => `
          <article class="skill-card">
            <h3>${skill.title}</h3>
            <p>Category: ${skill.category}</p>
            <p>Price: $${skill.price}</p>
          </article>
        `
      )
      .join("");
  });
}
