
// Used AI to help with coding and testing.
// Skill Swap frontend - connects to the Express backend API.

console.log("Welcome to Skill Swap!");

// Backend API address for local development.
const API_BASE_URL = "http://localhost:3000/api/skills";

// Store skills retrieved from the database.
let skills = [];
let selectedCategory = "All";

// HTML elements.
const skillsContainer = document.getElementById("skills-container");
const filterButtons = document.querySelectorAll(".filter-btn");

const skillForm = document.getElementById("skill-form");
const formMessage = document.getElementById("form-message");

const rateInput = document.getElementById("hourly-rate");
const hoursInput = document.getElementById("hours");
const calculateButton = document.getElementById("calculate-button");
const costResult = document.getElementById("cost-result");

const findMatchButton = document.getElementById("find-match-button");
const categoryInput = document.getElementById("match-category");
const maxPriceInput = document.getElementById("match-max-price");
const matchResults = document.getElementById("match-results");

// Escape user-provided text before displaying it as HTML.
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

// GET: Retrieve skills from the backend database.
async function fetchSkills() {
    try {
        skillsContainer.innerHTML = "<p>Loading skills...</p>";

        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
            throw new Error("Unable to retrieve skills.");
        }

        skills = await response.json();

        if (!Array.isArray(skills)) {
            throw new Error("The API returned an unexpected response.");
        }

        displaySkills();

        console.log("Skills loaded successfully:", skills);

    } catch (error) {
        console.error("Error loading skills:", error);

        skillsContainer.innerHTML =
            "<p>Unable to load skills. Please check that the backend is running.</p>";
    }
}

// Display skills retrieved from the database.
function displaySkills() {
    const filteredSkills = selectedCategory === "All"
        ? skills
        : skills.filter(skill => skill.category === selectedCategory);

    if (filteredSkills.length === 0) {
        skillsContainer.innerHTML = "<p>No skills found in this category.</p>";
        return;
    }

    skillsContainer.innerHTML = filteredSkills.map(skill => `
        <article class="skill-card">
            <h3>${escapeHTML(skill.title)}</h3>
            <p>Category: ${escapeHTML(skill.category)}</p>
            <p>Price: $${Number(skill.price).toFixed(2)}</p>
            <p>Provider: ${escapeHTML(skill.provider || "Anonymous")}</p>

            <button
                class="details-button"
                type="button"
                aria-expanded="false"
            >
                View Details
            </button>

            <p class="skill-details" hidden>
                ${escapeHTML(skill.description || "")}
            </p>
        </article>
    `).join("");
}

// Category filtering.
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        filterButtons.forEach(filterButton => {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");
        displaySkills();
    });
});

// Show and hide skill details.
skillsContainer.addEventListener("click", event => {
    const button = event.target.closest(".details-button");

    if (!button) {
        return;
    }

    const card = button.closest(".skill-card");
    const details = card.querySelector(".skill-details");
    const isHidden = details.hidden;

    details.hidden = !isHidden;

    button.textContent = isHidden ? "Hide Details" : "View Details";
    button.setAttribute("aria-expanded", String(isHidden));
});

// POST: Add a new skill to the backend database.
skillForm.addEventListener("submit", async event => {
    event.preventDefault();

    const newSkill = {
        title: document.getElementById("skill-title").value.trim(),
        description: document.getElementById("skill-description").value.trim(),
        category: document.getElementById("skill-category").value,
        price: Number(document.getElementById("skill-price").value),
        provider: document.getElementById("skill-provider").value.trim()
    };

    if (
        !newSkill.title ||
        !newSkill.description ||
        !newSkill.category ||
        !newSkill.provider ||
        document.getElementById("skill-price").value.trim() === "" ||
        !Number.isFinite(newSkill.price) ||
        newSkill.price < 0
    ) {
        formMessage.textContent =
            "Please complete all fields with valid information.";
        return;
    }

    try {
        formMessage.textContent = "Saving your skill...";

        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSkill)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to save skill.");
        }

        await response.json();

        formMessage.textContent = "Your skill was successfully added!";
        skillForm.reset();

        // Reload skills from the database.
        await fetchSkills();

    } catch (error) {
        console.error("Error adding skill:", error);

        formMessage.textContent =
            "Unable to save your skill. Please check your backend connection.";
    }
});

// Cost calculator.
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

// Find My Match.
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

        const userNeeds = { category, maxPrice };
        const matches = matchSkillsToUser(userNeeds, skills);

        if (matches.length === 0) {
            matchResults.textContent = "No matching skills found.";
            return;
        }

        matchResults.innerHTML = matches.map(skill => `
            <article class="skill-card">
                <h3>${escapeHTML(skill.title)}</h3>
                <p>Category: ${escapeHTML(skill.category)}</p>
                <p>Price: $${Number(skill.price).toFixed(2)}</p>
                <p>Provider: ${escapeHTML(skill.provider || "Anonymous")}</p>
                <p>${escapeHTML(skill.description || "")}</p>
            </article>
        `).join("");
    });
}

// Load skills when the page opens.
fetchSkills();
