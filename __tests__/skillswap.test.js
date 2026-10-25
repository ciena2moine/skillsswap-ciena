const {filterSkillsByCategory, calculateTotalCosts} = require('../skillswap-functions');

const skills = [
    { title: 'Backend Development', category: 'Computer Science', price: 30},
    { title: 'Pre-Calc', category: 'Math', price: 35},
    { title: 'Cover Letter Review', category: 'Internship', price: 20},
    { title: 'Software Development', category: 'Computer Science', price: 30}
];

// test suite for filterSkillsByCategory
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

// test suite for calculateTotalCosts
    describe('calculateTotalCosts', () => {
    test('returns the correct values for different hours and rates', () => {
        expect(calculateTotalCosts(20, 2)).toBe(40);// 20 * 2 = 40
        expect(calculateTotalCosts(15, 3)).toBe(45);// 15 * 3 = 45
    });

    test('handles free sessions (0 price) and zero hours', () => {
        expect(calculateTotalCosts(0, 3)).toBe(0);// 0 * 3 = 0
        expect(calculateTotalCosts(20, 0)).toBe(0);// 20 * 0 = 0
    });

    test('returns correct value for decimal hours', () => {
        expect(calculateTotalCosts(25, 1.5)).toBe(37.5);// 25 * 1.5 = 37.5
    });
});

