//Used AI for indentation and testing purposes only
const {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
} = require('../skillswap-functions');

const skills = [
  { title: 'Backend Development', category: 'Computer Science', price: 30 },
  { title: 'Pre-Calc', category: 'Math', price: 35 },
  { title: 'Cover Letter Review', category: 'Internship', price: 20 },
  { title: 'Software Development', category: 'Computer Science', price: 30 },
  { title: 'Resume Review', category: 'Career', price: 0 }
];

// Tests for filterSkillsByCategory
describe('filterSkillsByCategory', () => {
  test('filters skills by category', () => {
    expect(filterSkillsByCategory(skills, 'Computer Science')).toEqual([
      { title: 'Backend Development', category: 'Computer Science', price: 30 },
      { title: 'Software Development', category: 'Computer Science', price: 30 }
    ]);
  });

  test('returns all skills when category is All', () => {
    expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
  });

  test('returns an empty array when no skills match', () => {
    expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
  });
});

// Tests for calculateTotalCosts
describe('calculateTotalCosts', () => {
  test('calculates the correct cost for different rates and hours', () => {
    expect(calculateTotalCosts(20, 2)).toBe(40);
    expect(calculateTotalCosts(15, 3)).toBe(45);
  });

  test('handles free sessions and zero hours', () => {
    expect(calculateTotalCosts(0, 3)).toBe(0);
    expect(calculateTotalCosts(20, 0)).toBe(0);
  });

  test('calculates the correct cost for decimal hours', () => {
    expect(calculateTotalCosts(25, 1.5)).toBe(37.5);
  });
});

// Tests for matchSkillsToUser
describe('matchSkillsToUser', () => {
  test('matches skills by category and maximum price', () => {
    const userNeeds = {
      category: 'Computer Science',
      maxPrice: 35
    };

    expect(matchSkillsToUser(userNeeds, skills)).toEqual([
      { title: 'Backend Development', category: 'Computer Science', price: 30 },
      { title: 'Software Development', category: 'Computer Science', price: 30 }
    ]);
  });

  test('excludes skills that cost more than the maximum price', () => {
    const userNeeds = {
      category: 'Math',
      maxPrice: 30
    };

    expect(matchSkillsToUser(userNeeds, skills)).toEqual([]);
  });

  test('returns an empty array when no skills match', () => {
    const userNeeds = {
      category: 'Cooking',
      maxPrice: 100
    };

    expect(matchSkillsToUser(userNeeds, skills)).toEqual([]);
  });

  test('includes free skills when the maximum price is zero', () => {
    const userNeeds = {
      category: 'Career',
      maxPrice: 0
    };

    expect(matchSkillsToUser(userNeeds, skills)).toEqual([
      { title: 'Resume Review', category: 'Career', price: 0 }
    ]);
  });
});
