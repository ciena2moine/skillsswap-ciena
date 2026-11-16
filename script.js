
// Used AI to help with coding and testing.

console.log("Welcome to Skill Swap!");

// Your deployed Render backend API
const API_BASE_URL =
  "https://skillswap-backend-sskw.onrender.com/api/skills";

// Store skills retrieved from the backend
let skills = [];
let selectedCategory = "All";

// HTML elements
const skillsContainer = document.getElementById("skills-container");
const skillForm = document.getElementById("skill-form");
const formMessage = document.getElementById("form-message");

const rateInput = document.getElementById("hourly-rate");
const hoursInput = document.getElementById("hours");
const calculateButton = document.getElementById("calculate-button");
const costResult = document.getElementById("cost-result");

const matchCategory = document.getElementById("match-category");
const matchMaxPrice = document.getElementById("match-max-price");
const findMatchButton = document.getElementById("find-match-button");
const matchResults = document.getElementById("match-results");

// Prevent HTML from being interpreted as markup
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return replacements[character];
  });
}

// Retrieve skills from the backend API
async function fetchSkills() {
  try {
    skillsContainer.innerHTML = "<p>Loading skills...</p>";

    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error("Could not retrieve skills from the server.");
    }

    const data = await response.json();

    // Support either an array or an object containing a skills array
    skills = Array.isArray(data) ? data : data.skills || [];

    displaySkills();
  } catch (error) {
    console.error("Error loading skills:", error);
    skillsContainer.innerHTML =
      "<p>Unable to load skills. Please try again later.</p>";
  }
}

// Display skills on the page
function displaySkills() {
  if (!skillsContainer) return;

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : filterSkillsByCategory(skills, selectedCategory);

  if (!filteredSkills.length) {
    skillsContainer.innerHTML = "<p>No skills found in this category.</p>";
    return;
  }

  skillsContainer.innerHTML = filteredSkills
    .map((skill) => {
      const title = escapeHTML(skill.title);
      const description = escapeHTML(skill.description);
      const category = escapeHTML(skill.category);
      const provider = escapeHTML(skill.provider || "Anonymous");
      const price = Number(skill.price || 0);

      return `
        <div class="skill-card">
          <h3>${title}</h3>
          <p>${description}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Price:</strong> $${price.toFixed(2)}/hour</p>
          <p><strong>Provider:</strong> ${provider}</p>
          <button
            class="details-button"
            type="button"
            data-skill-title="${title}"
          >
            View Details
          </button>
        </div>
      `;
    })
    .join("");
}

// Filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category || "All";
    displaySkills();
  });
});

// View skill details
if (skillsContainer) {
  skillsContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".details-button");

    if (!button) return;

    const selectedSkill = skills.find(
      (skill) => skill.title === button.dataset.skillTitle
    );

    if (selectedSkill) {
      alert(
        `Skill: ${selectedSkill.title}\n` +
        `Description: ${selectedSkill.description}\n` +
        `Category: ${selectedSkill.category}\n` +
        `Price: $${Number(selectedSkill.price || 0).toFixed(2)}/hour\n` +
        `Provider: ${selectedSkill.provider || "Anonymous"}`
      );
    }
  });
}

// Add a new skill through the backend API
if (skillForm) {
  skillForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newSkill = {
      title: document.getElementById("skill-title").value.trim(),
      description: document.getElementById("skill-description").value.trim(),
      category: document.getElementById("skill-category").value,
      price: Number(document.getElementById("skill-price").value),
      provider:
        document.getElementById("skill-provider").value.trim() || "Anonymous"
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newSkill)
      });

      if (!response.ok) {
        throw new Error("Unable to add your skill.");
      }

      if (formMessage) {
        formMessage.textContent = "Skill added successfully!";
      }

      skillForm.reset();

      // Reload skills from the backend
      await fetchSkills();
    } catch (error) {
      console.error("Error adding skill:", error);

      if (formMessage) {
        formMessage.textContent =
          "There was a problem adding your skill. Please try again.";
      }
    }
  });
}

// Calculate total costs
if (calculateButton) {
  calculateButton.addEventListener("click", () => {
    const hourlyRate = Number(rateInput.value);
    const hours = Number(hoursInput.value);

    if (
      rateInput.value === "" ||
      hoursInput.value === "" ||
      hourlyRate < 0 ||
      hours < 0
    ) {
      costResult.textContent = "Please enter valid numbers.";
      return;
    }

    const totalCost = calculateTotalCosts(hourlyRate, hours);

    costResult.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
  });
}

// Find skills matching the user's needs
if (findMatchButton) {
  findMatchButton.addEventListener("click", () => {
    const category = matchCategory.value;
    const maxPrice =
      matchMaxPrice.value === ""
        ? Infinity
        : Number(matchMaxPrice.value);

    if (maxPrice < 0) {
      matchResults.textContent = "Please enter a valid maximum price.";
      return;
    }

    const userNeeds = {
      category: category,
      maxPrice: maxPrice
    };

    const matchedSkills = matchSkillsToUser(userNeeds, skills);

    if (!matchedSkills.length) {
      matchResults.innerHTML = "<p>No matching skills found.</p>";
      return;
    }

    matchResults.innerHTML = matchedSkills
      .map(
        (skill) => `
          <div class="skill-card">
            <h3>${escapeHTML(skill.title)}</h3>
            <p>${escapeHTML(skill.description)}</p>
            <p><strong>Category:</strong> ${escapeHTML(skill.category)}</p>
            <p><strong>Price:</strong> $${Number(skill.price || 0).toFixed(2)}/hour</p>
          </div>
        `
      )
      .join("");
  });
}

// Load skills when the page opens
fetchSkills();
