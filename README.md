# Fullstack Assessment

## What We're Evaluating

- How quickly you understand and adapt to unfamiliar systems
- How you implement product requirements end to end (API and UI)
- How you make tradeoffs when requirements are incomplete or ambiguous
- How clearly you communicate decisions, assumptions, and limitations

## Product Context

We’re building the Residents Management module for an assisted living facility EHR. Staff use this screen daily to locate residents quickly, confirm details at a glance, and navigate reliably even on slow facility Wi-Fi.

You will receive:
- A working API endpoint
- A basic React frontend scaffold

Your job is to extend both where needed to meet the requirements below.

## P1 - Residents Directory Table

### Goal

Provide staff with a reliable, scannable view of all residents that supports day-to-day operational workflows.

### Product intent

This screen is used frequently in a clinical setting. Staff need to quickly recognize residents, confirm basic demographic and stay information, and remain productive even when the system is under load or the dataset is large.

### Expectations

- Display a list of residents retrieved from the provided API.
- Present key resident information in a way that is easy to scan and compare.
- Include visual cues where appropriate to aid recognition.
- Ensure the experience remains usable with a large number of residents.
- Make reasonable decisions about data fetching, rendering, and state management.

## P2 Resident Search and Filtering

### Goal

Enable staff to quickly narrow the residents list when they are looking for a specific person or location.

### Product intent

Staff often remember partial information. Sometimes a name fragment, sometimes a room number, sometimes both. The experience should support fast discovery without overwhelming the UI or degrading performance.

### Expectations

- Provide a way to search residents by name.
- Provide a way to narrow results by room or location.
- Searching and filtering should work together in a way that feels intuitive.
- The experience should remain usable and responsive with large datasets.

# How to Run the Application

For BE/FE, download dependencies and run it in separate terminal instances.
```bash
$ cd backend; # or cd frontend
$ npm i;
$ npm start;
```

## Frontend — GET http://localhost:3001

A Hello World React frontend is provided for you to get started.

## API — GET http://localhost:3000/residents

This API endpoint is provided for you to get started.

