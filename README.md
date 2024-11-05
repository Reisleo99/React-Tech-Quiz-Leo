# Tech Quiz Application

This is a Tech Quiz application built with the MERN stack (MongoDB, Express, React, Node.js) to provide a fun and interactive way for users to test their tech knowledge. This application also includes Cypress tests for component and end-to-end testing, ensuring high-quality performance and functionality.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Features

- Interactive quiz interface with a variety of tech-related questions
- Real-time feedback on quiz answers
- User authentication to track quiz progress and scores
- Comprehensive Cypress tests for both component and end-to-end testing

## Technologies

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Testing**: Cypress for component and end-to-end testing

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tech-quiz-application.git
   cd tech-quiz-application
   ```
   
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   
3. **Set up environment variables**:
- Create a .env file in the root directory.
- Add your environment variables for the database connection, authentication, and any other necessary configurations.

4. Build, Seed and Start the application:
   ```bash
   npm run build
   npm run seed
   npm run start:dev
   ```
5. Open Cypress for testing:
   ```bash
   npm run cypress
   ```
## Usage
Once the server is running, navigate to http://localhost:3001 in your web browser to access the Tech Quiz application.

Take the Quiz by answering questions and getting real-time feedback.
View Scores to track your performance over time.

## Testing
This project uses Cypress for both component and end-to-end testing.

  - Component Testing: To test individual components.
  - End-to-End Testing: To test the entire user flow and ensure smooth functionality.

## Walkthrough Video
[Tech-Quiz-Video](https://drive.google.com/file/d/1-fJFvsQDYc9iL6wciz-YTPVzG2h0MgYo/view?usp=drive_link).

## License
This project is licensed under the MIT License. See the LICENSE file for details.

