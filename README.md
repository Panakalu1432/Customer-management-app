# Customer Management App

A full-stack web application to manage customers and their addresses.  
Built with **React (frontend)**, **Node.js/Express (backend)**, and **SQL LITE**.

---

## Features
- Add, edit, delete customers
- Manage customer addresses
- Search and sort customers
- Responsive UI with modals for input
- REST API for CRUD operations

---

## Tech Stack
- **Frontend:** React, Axios, React-Modal
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Deployment:** Render (backend), Vercel/Netlify (frontend)

---

## Project Structure
customer-management-app/
│
├── client/ # React frontend
│ ├── src/
│ └── package.json
│
├── server/ # Node/Express backend
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── server.js # App entry
│ └── package.json
│
└── README.md


---

## Installation & Setup 

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/customer-management-app.git
cd customer-management-app

---

### Backend Setup

cd server
npm install
nodemon index.js


### Frontend Setup

cd client
npm install
npm start



## Customer API Endpoints
Base URL: /api/customers

    Method	    Endpoint	            Description

    GET	        /api/customers	     Get all customers

    POST	    /api/customers	     Create a new customer

    PUT	        /api/customers/:id	 Update a customer

    DELETE	    /api/customers/:id	 Delete a customer



Address APIs

Base URL: /api/addresses

    Method	        Endpoint	             Description	
     GET	  /api/addresses	            Get all addresses

     GET	 /api/addresses/:id	            Get a single address by ID

     GET	 /api/customers/:id/addresses	Get all addresses for a customer

     POST	/api/customers/:id/addresses	Add a new address for a customer

     PUT	    /api/addresses/:id	            Update an existing address	

     DELETE	/api/addresses/:id	            Delete an address	


### Database Schema

## Customers Table

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone_number TEXT
    
## Addresses Table
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    street TEXT,
    city TEXT,
    state TEXT,
    pin_code TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    "# Customer-management-app" 
