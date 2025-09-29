# Real‑time Whiteboard Sharing App
A collaborative web app allowing multiple users to draw and share a whiteboard in real time

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture & Folder Structure](#architecture--folder-structure)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
- [Usage](#usage)  
- [Configuration / Environment Variables](#configuration--environment-variables)  
- [Acknowledgements](#acknowledgements)

## Features
- Real-time synchronization of drawing strokes between joiners 
- Multiple users can join the same whiteboard session  
- Different drawing tools (e.g. pen, eraser)  
- Undo / redo support  
- Clear board / reset
- Real time chat messaging between users

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript (or framework such as React / Vue / etc) |
| Backend | Node.js + Express |
| Real-time | WebSockets (e.g. socket.io) |

---

## Architecture & Folder Structure

```
Real-time-whiteboard-sharing-App/
│
├── backend
│ ├── server.js 
│ ├── utils
│ ├── package.json
├── frontend
│ ├── public
│ ├── src
│ ├── index.html
│ ├── vite.config.js
│ ├── package.json
│ └── ...
│
├── README.md
└── .gitignore  
```
- The **backend** handles socket connections, broadcasting drawing events, and optionally saving sessions.  
- The **frontend** provides UI for drawing and capturing user actions, forwarding them to the backend.

## 📸 Screenshot

![App Screenshot](<frontend/assets/Screenshot(5).png>)

## Getting Started

### Prerequisites
- Node.js (>= 14.x recommended)  
- npm or yarn  
- (Optional) MongoDB or other DB if persistence is required

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/WaruniGunasena/Real-time-whiteboard-sharing-App.git
   cd Real-time-whiteboard-sharing-App
   ```

2. Install dependencies for backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for frontend (if separate):
   ```bash
   cd ../frontend
   npm install   # or yarn
   ```

4. Create an `.env` file in backend (and frontend if needed).  

### Running Locally

1. Start backend server:
   ```bash
   cd backend
   npm run start
   ```

2. Start frontend:
   ```bash
   cd ../frontend
   npm run dev   # or serve the static files via a simple HTTP server
   ```

3. Open your browser and navigate to `http://localhost:3000` (or whichever port your frontend uses).

---
## Usage

- Open multiple browser windows or devices  
- Enter the same room or drawing session ID  
- Draw on the whiteboard and see updates appear in real time on all clients  
- Use UI controls to clear board, undo, etc

## Configuration / Environment Variables

Here are some common environment variables you might want to configure in `.env`:

```text
PORT=3000
SOCKET_PORT=5000
# If using a database
DB_URI=mongodb://localhost:27017/whiteboard
```

Be sure to load them in your backend code (e.g. via `dotenv`).

---


## Acknowledgements

- Thanks to open source projects and tutorials  
- Inspirations from collaborative drawing / whiteboard apps  
- Libraries like `socket.io`, `express`, etc  
