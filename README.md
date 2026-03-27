# MyWish 🎄

**MyWish** is a premium, full-stack Christmas wish-sharing platform designed to spread joy through anonymous gift-giving and community connections.

## ✨ Features

-   **Glassmorphic UI**: A stunning, modern Christmas-themed design with interactive animations and responsive layouts.
-   **Secure Authentication**: JWT-based login and registration system with password encryption.
-   **Wish Management**: Create personal wish lists, browse recent wishes, and track grant status (✅ Granted or ⏳ Pending).
-   **Atomic Wish Granting**: A secure, race-condition-free mechanism to grant others' wishes and make dreams come true.
-   **Docker Ready**: Zero-config setup using Docker and Docker Compose for the entire full-stack environment.
-   **Production Safety**: XSS-protected frontend rendering and generic backend error handling.

## 🛠️ Tech Stack

-   **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism), JavaScript (ES6+).
-   **Backend**: Node.js, Express.js (v5+ architecture).
-   **Database**: MongoDB (7.0 Containerized with Persistence).
-   **Security**: JWT, Bcryptjs, Atomic MongoDB updates.
-   **CI/CD**: GitHub Actions, CodeRabbit PR Review.
-   **Containerization**: Docker, Docker Compose.

## 🚀 Quick Start (Recommended)

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/jill-break/wish.git
    cd wish
    ```
2.  **Start the platform**:
    ```bash
    docker-compose up --build -d
    ```
3.  **Spread the joy**: Access the app at [http://localhost:5000](http://localhost:5000).

## 🧑‍💻 Development Setup

1.  **Backend**:
    ```bash
    cd backend
    npm install
    npm start
    ```
2.  **Frontend**: The backend automatically serves the frontend at the root port. For static serving, you can use `npx serve -s frontend`.

## 🧪 Testing & CI

-   **Unit Tests**: Run `npm test` in the `backend/` directory to execute the Jest test suite.
-   **Auto-Review**: Every Pull Request is automatically audited for security and quality by CodeRabbit.

---
Built with ❤️ for the holiday season. 🎅🌟🕺


