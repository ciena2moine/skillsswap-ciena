# skillsswap-ciena
# Skill Swap


Skill Swap is a platform for students and graduates, where they will have the ability to share skills and knowledge. This creates the ability for them to learn in a more interesting way. 

## Technologies Used

- HTML
- CSS
- JavaScript
- Git and GitHub

Skill Swap
A peer-to-peer skill-sharing platform for college students and recent
graduates.


Skill Swap is designed to help students discover skills, connect with
people who can teach them, and exchange knowledge. The Sprint 1 Minimum
Viable Product (MVP) focuses on the core experience and the technical
foundation for future development.
MVP note: Update the setup commands, backend/API details,
deployment URL, and screenshots below to match the exact version
currently in this repository before submitting.


Project Links
- GitHub repository:
 https://github.com/cienatumoine/skillsswap-ciena-unit9
- Live application: \(Add your deployed Vercel or Render URL\)
- Jira project: \(Add your Jira project URL\)
MVP Features
The project work includes the following core interactions:
- Browse available skill listings.
- View additional details about a skill.
- Filter skills by category.
- Calculate the estimated cost of a skill session using an hourly rate
 and number of hours.
- Find skills that match selected criteria, such as category and
 maximum price.
Only list features that are working in the deployed version. If the
API-backed version is the version being submitted, describe the
API/database behavior here and remove any references to hardcoded sample
data.
Technology Stack
Confirm this list against the current package.json and backend
repository before submission.
- HTML
- CSS
- JavaScript
- Node.js / Express API (if included in the submitted backend)
- SQLite database (if used by the submitted backend)
- Jest for unit testing (if configured in this repository)
Getting Started
Prerequisites
- Git
- Node.js and npm, if this project uses npm scripts
- A code editor such as Visual Studio Code
Installation
Clone the repository:
git clone https://github.com/cienatumoine/skillsswap-ciena-MVP.git
cd skillsswap-ciena-MVP
Install dependencies if the repository contains a package.json:
npm install
Run the application
Open index.html in a browser if this is a static frontend with no
local server requirement.


If the project uses an npm development server, use the script defined in
package.json (for example, npm run dev only if that script exists).


If the frontend requires a separate backend API, start the backend from
its own repository using that repository's documented instructions.
Configure the frontend's API base URL to point to the local backend
during development. Do not commit secrets or private environment values.
How to Use
1. Open the deployed application or run the frontend locally.
2. Browse the available skill listings.
3. Use the category filter to narrow the displayed skills.
4. Open a skill's details to review its information.
5. Enter an hourly rate and number of hours to calculate an estimated
  session cost.
6. Use the matching controls to find skills that meet the selected
  category and price criteria.
The exact controls and available actions may vary as the MVP evolves.
Project Structure
The repository currently has application files such as index.html,
styles.css, script.js, skillswap-functions.js, and a test
directory.
skillsswap-ciena/
├── index.html
├── styles.css
├── script.js
├── skillswap-functions.js
├── __tests__/
├── README.md
└── package.json             
Architecture and Design
The application is organized to separate key responsibilities:
- Presentation layer: index.html defines the page structure and
 styles.css controls visual presentation.
- Application/UI behavior: script.js connects interface controls
 to application behavior and coordinates user interactions.
- Business logic: skillswap-functions.js contains reusable
 functions for operations such as filtering, cost calculation, and
 matching.
- Tests: __tests__/ contains automated tests for important
 application logic.
- Data layer/API: If the submitted version uses a backend, the
 frontend should retrieve and create skill records through API
 requests rather than relying on a hardcoded skills array. Document
 the backend repository, endpoints, and database here once verified.
This separation supports maintainability by keeping reusable
calculations and filtering logic apart from page markup and event
handling. It is a modular separation-of-concerns approach; do not claim
a formal MVC implementation unless the code is actually structured into
models, views, and controllers.
Testing
The project includes a test directory for core logic. Tests should cover
both expected results and common edge cases, including:
- Filtering skills by category.
- Calculating session costs for valid rates and hours.
- Handling zero or invalid numeric inputs.
- Matching skills against selected criteria.
- Handling empty or unmatched results.
Run the test command configured in package.json. For example, use:
npm test


- Test command: [insert verified command]
- Result: [test suites: 1 passed, 1 total, Tests: 10 passed, 101 total]
Deployment
- Render Link:
- Hosting platform: Render
- Deployment branch: main
After deployment, verify the main user flows in the live environment,
including browsing, filtering, skill details, cost calculation,
matching, and API requests if applicable.
Screenshots
Add screenshots of the working application to a folder such as
screenshots/, then embed them below. Replace the example paths with
the actual screenshot filenames.
![Skill Swap home page](]())
![Skill browsing and filtering]()
![Cost calculator or matching feature]()
Git Workflow
The project should use feature branches for individual features or user
stories, meaningful commit messages, and pull requests into the main
branch.


Example workflow:
git checkout -b feature/feature-name
git add .
git commit -m "Add clear description of feature"
git push -u origin feature/feature-name
Then open a pull request on GitHub, describe the change, review the
diff, and merge after verification. Include links to the actual Sprint 1
pull requests here:
- Pull request 1: \(Add link\)
- Pull request 2: \(Add link\)
- Pull request 3: \(Add link\)
Troubleshooting
- The page does not load correctly: Confirm that index.html,
 CSS, and JavaScript file paths match the repository structure.
- A script or module cannot be found: Check import paths and
 filename capitalization.
- The API request fails: Confirm the backend is running, the
 frontend API base URL is correct, and the backend permits requests
 from the frontend origin.
- Skills do not appear: Check the browser console and network
 requests. Verify the API endpoint and database contain skill
 records.
- Tests do not run: Confirm dependencies are installed and use the
 test script defined in package.json.
Known Limitations
Update this list to reflect the actual MVP. Possible limitations to
verify include:
- The MVP may not yet include full user authentication or verified
 student profiles.
- Messaging and scheduling between users may not be implemented.
- Payment processing and escrow are outside the initial MVP scope.
- Matching may use basic category and price criteria rather than a
 recommendation algorithm.
- Administrative tools and production monitoring may not yet be
 available.
Future Enhancements
Potential next steps for later sprints include:
- Student account creation and profile verification.
- More detailed skill listings and search filters.
- Messaging and session scheduling.
- Ratings, reviews, and learner feedback.
- Improved matching and recommendations.
- Additional automated tests and deployment checks.
Sprint 1 MVP Scope
Sprint 1 establishes the initial Skill Swap experience and technical
foundation. The MVP prioritizes essential functionality, clear
separation of application responsibilities, basic automated tests,
version-control practices, public deployment, and documentation.
Advanced features can be developed incrementally in later sprints.
Author: Ciena Tumoine
Project: Skill Swap
Repository: https://github.com/cienatumoine/skillsswap-ciena-MVP.git
