// Used AI to help with coding and testing.
// Shared functions for the Skill Swap application.

// Filter skills by category.
function filterSkillsByCategory(skills, category) {
    if (!Array.isArray(skills)) {
        return [];
    }

    if (category === "All") {
        return skills;
    }

    return skills.filter(skill => skill.category === category);
}

// Calculate the total cost of a skill.
function calculateTotalCosts(hourlyRate, hours) {
    const rate = Number(hourlyRate);
    const totalHours = Number(hours);

    if (
        !Number.isFinite(rate) ||
        !Number.isFinite(totalHours) ||
        rate < 0 ||
        totalHours < 0
    ) {
        return 0;
    }

    return rate * totalHours;
}

// Find skills that match a user's category and maximum price.
function matchSkillsToUser(userNeeds, skills) {
    if (!Array.isArray(skills) || !userNeeds) {
        return [];
    }

    const category = userNeeds.category;
    const maxPrice = Number(userNeeds.maxPrice);

    if (!Number.isFinite(maxPrice) || maxPrice < 0) {
        return [];
    }

    return skills.filter(skill => {
        return (
            skill.category === category &&
            Number(skill.price) <= maxPrice
        );
    });
}
