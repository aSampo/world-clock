# World Clock App

This repository contains two projects: "world-clock-ui" and "world-clock-api."

## Prerequisites

Before you can run both projects, ensure that you have the following software installed on your machine:

- Node.js (v14.x or later)
- npm (Node Package Manager)

## Running the world-clock API

1. Navigate to the "world-clock-api" directory:

   ```bash
   cd world-clock/world-clock-api
2. Install the required dependencies:
    ```bash
      npm install
2. Launch the Node.js API server:
    ```bash
      node app.js
    ````
    The backend API should now be running at http://localhost:3000 (or another port if specified in your "app.js" file).

## Running the world-clock UI

1. Navigate to the "world-clock-ui" directory:

   ```bash
   cd world-clock/world-clock-ui
2. Install the required dependencies:
    ```bash
      npm install
2. Launch the Vite development server for the UI::
    ```bash
      npm run dev
    ````
    The UI should be accessible at http://localhost:5173 by default. It will interact with the backend API you started earlier.
