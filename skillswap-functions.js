/* in this file: filter, calculate, match */
function filterSkills(skills, filter) {
    if (filter === 'All') {
        return skills;
    }
    return skills.filter(skill => skill.category === filter);
}

module.exports = {
    filterSkills
}; 
