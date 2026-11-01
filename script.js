// Used AI to help with coding and testing.

console.log("Welcome to Skill Swap!");

// Store skills loaded from the database
let skills = [];

const rateInput = document.getElementById("hourly-rate");
const hoursInput = document.getElementById("hours");
const calculateButton = document.getElementById("calculate-button");
const costResult = document.getElementById("cost-result");

const findMatchButton = document.getElementById("find-match-button");
const categoryInput = document.getElementById("match-category");
const maxPriceInput = document.getElementById("match-max-price");
const matchResults = document.getElementById("match-results");

const skillForm = document.getElementById("skill-form");
const skillsContainer = document.getElementById("skills-container");

// Display skills loaded from the database
function displaySkills(skillList) {
  if (!skillsContainer) {
    console.error("Skills container not found.");
    return;
  }

  if (skillList.length === 0) {
    skillsContainer.innerHTML = "<p>No skills available.</p>";
    return;
  }

  skillsContainer.innerHTML = skillList
    .map(
      (skill) => `
        <article class="skill-card">
          <h3>${escapeHTML(skill.title)}</h3>
          <p>Category: ${escapeHTML(skill.category)}</p>
          <p>Price: $${Number(skill.price).toFixed(2)}</p>
          <p>${escapeHTML(skill.description || "")}</p>

          <button
            class="details-button"
            type="button"
            data-details="${escapeHTML(skill.description || "No additional details available.")}"
            aria-expanded="false"
          >
            View Details
          </button>

          <p class="skill-details" hidden></p>
        </article>
      `
    )
    .join("");
}

// Escape HTML to safely display user-entered information
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

// Fetch skills from the backend database
async function loadSkills() {
  try {
    const data = await window.apiService.fetchSkills();

    skills = data;

    displaySkills(skills);

    console.log("Skills loaded successfully:", skills);

    return data;

  } catch (error) {
    console.error("Error loading skills:", error);

    if (skillsContainer) {
      skillsContainer.innerHTML =
        "<p>Unable to load skills. Please try again.</p>";
    }

    return [];
  }
}

// Skill card detail buttons
if (skillsContainer) {
  skillsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".details-button");

    if (!button) {
      return;
    }

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
}

// Cost calculator
// Fixed it up
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

    if (
      maxPriceInput.value.trim() === "" ||
      !Number.isFinite(maxPrice) ||
      maxPrice < 0
    ) {
      matchResults.textContent =
        "Please enter a valid, non-negative maximum price.";

      return;
    }

    const userNeeds = {
      category,
      maxPrice
    };

    // Match skills loaded from the database
    const matches = matchSkillsToUser(userNeeds, skills);

    if (matches.length === 0) {
      matchResults.textContent = "No matching skills found.";
      return;
    }

    matchResults.innerHTML = matches
      .map(
        (skill) => `
          <article class="skill-card">
            <h3>${escapeHTML(skill.title)}</h3>
            <p>Category: ${escapeHTML(skill.category)}</p>
            <p>Price: $${Number(skill.price).toFixed(2)}</p>
            <p>${escapeHTML(skill.description || "")}</p>
          </article>
        `
      )
      .join("");
  });
}

// Add a new skill to the database
if (skillForm) {
  skillForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const skillData = {
      title: document.getElementById("title").value.trim(),
      category: document.getElementById("category").value.trim(),
      price: Number(document.getElementById("price").value),
      description: document.getElementById("description").value.trim()
    };

    if (
      !skillData.title ||
      !skillData.category ||
      !skillData.description ||
      document.getElementById("price").value.trim() === "" ||
      !Number.isFinite(skillData.price) ||
      skillData.price < 0
    ) {
      alert("Please enter valid information for all fields.");
      return;
    }

    try {
      // Save the new skill using the API
      await window.apiService.createSkill(skillData);

      // Reload skills from the database
      await loadSkills();

      // Clear the form
      skillForm.reset();

      alert("Skill added successfully!");

    } catch (error) {
      console.error("Error creating skill:", error);

      alert("Could not add skill. Please try again.");
    }
  });
}

// Load database skills when the page opens
document.addEventListener("DOMContentLoaded", async () => {
  await loadSkills();
});
