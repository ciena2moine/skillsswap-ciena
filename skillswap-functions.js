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

module.exports = {
    filterSkills,
    filterSkillsByCategory,
}; 

