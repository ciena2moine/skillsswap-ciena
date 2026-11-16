const API_BASEURL = 'http://localhost:3000/api';
//API functions will be added here

async function fetchSkills() {
  try {
     const response = await fetch(`http://localhost:3000/api/skills`);
     if (!response.ok) {
       throw new Error('Failed to fetch skills');
  }
     const data = await response.json();
     return data;
  } catch (error) {
     console.error('Error fetching skills:', error);
     throw error;
  }
}

async function createSkill(skillData) {
  try {
    const response = await fetch(`http://localhost:3000/api/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData),
    });
    if (!response.ok) {
      throw new Error('Failed to create skill');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating skill:', error);
    throw error;
  }
}

// Make functions available globally for browser use 
window.apiService = { fetchSkills, createSkill };