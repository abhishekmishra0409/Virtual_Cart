# Virtual Cart

## Overview

**Virtual Cart** is a full-stack e-commerce application that simulates an online shopping experience. The repository is organized into three main modules: Frontend, Backend, and Admin, following a modular monorepo structure for separation of concerns and easy maintenance.

---

## Folder Structure

```
Virtual_Cart/
├── Admin/           # Admin dashboard for managing products, orders, and users
├── Backend/         # Backend API for authentication, database, and business logic
├── Frontend/        # Customer-facing web application
```

### 1. Frontend/

- The user interface for customers to browse products, manage their cart, and place orders.
- Likely built using React or another modern JS framework.
- Handles routing, state management, and API calls to the Backend.

### 2. Backend/

- Contains REST API endpoints for products, users, authentication, orders, etc.
- Manages business logic, database interactions, and security.
- Likely built with Node.js and Express (or similar stack).

### 3. Admin/

- A separate dashboard for administrators.
- Used to add/edit/remove products, process orders, and manage users.
- Isolated from the customer-facing frontend for security and clarity.

---

## Features

- **Product Browsing:** Users can view product listings and details.
- **Cart Management:** Add, update, and remove items from the cart.
- **Checkout Flow:** Simulate placing an order.
- **Order Management:** Admins can view and process orders.
- **User Authentication:** Login and registration for both customers and admins.
- **Responsive Design:** Usable on desktop and mobile devices.

---

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- (Optional) MongoDB or another database

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/abhishekmishra0409/Virtual_Cart.git
    cd Virtual_Cart
    ```

2. **Install dependencies for each module:**
    ```bash
    cd Frontend
    npm install
    cd ../Backend
    npm install
    cd ../Admin
    npm install
    ```

3. **Start each service:**
    - Backend:  
      ```bash
      cd Backend
      npm start
      ```
    - Frontend:  
      ```bash
      cd Frontend
      npm start
      ```
    - Admin:  
      ```bash
      cd Admin
      npm start
      ```

4. **Access the apps in your browser:**
    - Frontend: `http://localhost:3000`
    - Admin: `http://localhost:PORT` (as configured)
    - Backend API: `http://localhost:PORT` (as configured)

---

## Contributing

Feel free to open issues or submit pull requests for bug fixes, improvements, or new features.

---

## License

This project is for educational use. See repository for details.

---
