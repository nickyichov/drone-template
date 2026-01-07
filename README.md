# Ground Control Station Dashboard

This project is a **React-based dashboard** for a **Ground Control Station (GCS)** used to visualize and monitor drone data.  
It provides interactive visualizations to support situational awareness and analysis during drone operations.

## Tech Stack

- **React**
- **Node.js / npm**
- **Tailwind CSS**
- **Vite**

## Installation

Ensure you have **Node.js** and **npm** installed.

Install dependencies:

```bash
npm install
```

## Running the Application
Multiple scripts are required during development.

### Frontend (React Development Server)
**To start the development server with hot-reloading:**

```bash
npm run dev
```

### Backend Server (WebSocket/MAVLink)

**To start the server responsible for data handling and communication:**

```bash
npm run start
```

### Tailwind CSS Watcher
**To watch for Tailwind CSS changes and rebuild styles:**

```bash
npm run watch
```
