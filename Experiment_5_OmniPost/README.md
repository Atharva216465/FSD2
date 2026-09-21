# Experiment 5 — OmniPost Composer

This project contains:
- `frontend/` — React + Vite UI
- `backend/` — Spring Boot REST API + H2 in-memory database

## Your Mac compatibility

This project is suitable for the supplied environment:
- macOS 11.7.10
- Intel x86_64 MacBook Air
- 4 GB RAM
- Java 17
- Node.js 20
- npm 10
- Python 3.11 (not required by the app)

The project intentionally does **not** include `node_modules`, Gradle caches, or build output.
Those are machine-specific and should be regenerated locally.

## Open in VS Code

If the `code` command is not installed, from Finder you can open the project folder with
Visual Studio Code, or use:

    open -a "Visual Studio Code" .

In VS Code, open the folder containing this README.

## Run the backend

Open Terminal 1:

    cd backend
    chmod +x gradlew
    ./gradlew bootRun

The API starts at:

    http://localhost:8080

The backend uses an in-memory H2 database, so no MySQL/PostgreSQL installation is needed.

## Run the frontend

Open Terminal 2:

    cd frontend
    npm install
    npm run dev

Then open:

    http://localhost:5173

## Application behavior

The composer supports:
- Twitter — maximum 50 words
- Instagram — maximum 100 words
- Facebook — maximum 200 words
- Global word-limit error banner
- Create/post
- Recent posts list
- Edit
- Delete

## Important

Keep the backend terminal running while using the frontend.

If port 8080 is already occupied, stop the other process first. Likewise, Vite normally uses
port 5173.

## If `code` is not available

In VS Code, use the Command Palette (`Cmd+Shift+P`) and run:

    Shell Command: Install 'code' command in PATH

Then a new Terminal can open this project with:

    code .

## Verification note

The supplied frontend archive contained a platform-specific `node_modules` directory whose
executable links were not portable. It has been removed intentionally; `npm install` recreates
correct dependencies for this Mac.

The backend's Gradle wrapper is retained. It downloads its Gradle distribution the first time
it is run, so the Mac needs internet access for that first backend build.
