# Fullstack Assessment

This assessment is designed to measure your competence in:

- Ability to quickly understand and adapt to unfamiliar codebases
- Implementing new features using technologies you may not have worked with before
- Navigating unclear requirements and making tradeoffs
- Communicating your thought process

You are not expected to finish everything. **Completion is not the goal.** What matters is how you reason about the requirements, prioritize, and implement solutions.

# Requirements

You are building out the Residents Management portion of an assisted living facility’s electronic health records system. You will be given a working API and frontend scaffold. Your task is to extend both. You can use anything that you find helpful to complete this task including AI.

## Residents List Page

Create a page that retrieves data from the `/residents` API and displays it in a table.

- Full name
- Picture
- Age in years
- Gender
- Room number
- Days in facility

The API returns a large dataset. You are free to decide how the frontend should handle and display it in a way that remains responsive and usable.

## Usability & Performance

As you implement the Residents List Page, consider:

- How should the UI behave when the dataset is very large?
- How should users navigate, search, or organize results?
- How should the application remain performant when rendering large amounts of data?
- How should the system behave when the network is unreliable?
- How should state be managed between pages or components to avoid redundant data fetching?  

There is no single right answer. We are interested in your reasoning and the tradeoffs you make.

# How to Run the Application

For BE/FE, download dependencies and run it in separate terminal instances.
```bash
$ cd backend; # or cd frontend
$ npm i;
$ npm start;
```

## Frontend — GET http://localhost:3001

A Hello World frontend is provided for you to get started.

## API — GET http://localhost:3000/residents

This API endpoint is provided for you to get started.

