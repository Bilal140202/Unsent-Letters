# UnsentLetters – Say What You Never Said

A platform where people write the letters they never sent — to lovers, family, enemies, teachers, the past, or themselves. Others can read these letters, filtered by emotion tags. No names. No logins required. Just truth.

## MVP v1 Features

*   **📝 Anonymous Letter Post:** Users can write a letter with a selected emotion tag.
*   **🔍 Browse Letters:** Public feed of all posts.
*   **🏷️ Tag Filter:** Filter letters by tags.

## Tech Stack (MVP)

*   **Frontend:** HTML, TailwindCSS (via CDN), Vanilla JavaScript
*   **Backend:** Node.js, Express
*   **Database:** In-memory (for now)

## Running the Project

### Using GitHub Codespaces (Recommended)

1.  Open this repository in a GitHub Codespace.
2.  The `postCreateCommand` in `.devcontainer/devcontainer.json` should automatically run `npm install` in the `backend` directory.
3.  To start the server, open a terminal in Codespaces and run:
    ```bash
    cd backend
    node server.js
    ```
4.  The application will be available on the forwarded port (usually 3000).

### Local Development

1.  **Backend:**
    *   Navigate to the `backend` directory: `cd backend`
    *   Install dependencies: `npm install`
    *   Start the server: `node server.js`
    *   The backend API will be running on `http://localhost:3000`.
2.  **Frontend:**
    *   Open the HTML files (`frontend/index.html`, `frontend/post.html`, `frontend/feed.html`) directly in your web browser.
    *   Ensure your browser can make requests to `http://localhost:3000` where the backend is running.
```
