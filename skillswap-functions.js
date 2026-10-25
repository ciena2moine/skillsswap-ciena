/* in this file: filter, calculate, match */
function filterSkills(skills, filter) {
    if (filter === 'All') {
        return skills;
    }
    return skills.filter(skill => skill.category === filter);
}

function filterSkillsByCategory(skills, category) {
    if (category === 'All') {
        return skills;
    }
    return skills.filter(skill => skill.category === category);
}

function calculateTotalCosts(price, hours) {
    return price * hours;
}

function matchSkillsToUser(userNeeds, skills) {
  return skills.filter(skill =>
    skill.category === userNeeds.category && skill.price <= userNeeds.maxPrice
  );
}

module.exports = {
    filterSkills,
    filterSkillsByCategory,
    calculateTotalCosts,
    matchSkillsToUser
};
