const {filterSkillsByCategory} = require('../skillswap-functions');

const skills = [
    { title: 'Backend Development', category: 'Computer Science', price: 30},
    { title: 'Pre-Calc', category: 'Math', price: 35},
    { title: 'Cover Letter Review', category: 'Internship', price: 20},
    { title: 'Software Development', category: 'Computer Science', price: 30}
];

describe('filterSkillsByCategory', () => {
    test('filters skills by category', () => {
        expect(filterSkillsByCategory(skills, 'Computer Science')).toEqual([
            { title: 'Backend Development', category: 'Computer Science', price: 30 },
            { title: 'Software Development', category: 'Computer Science', price: 30 }
        ]);
    });
});

    test('returns all skills when category is All', () => {
        expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
    });

    test('returns an empty array when no skills match', () => {
        expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
    });



