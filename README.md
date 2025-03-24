# **AdminView Fullstack Dashboard**  
**Name:** [Rusheel Chande]  
**Web App URL:** [https://admin-frontend-duoc.onrender.com/](https://admin-frontend-duoc.onrender.com/)

---

## **Project Overview**

The **AdminView Dashboard** is a full-stack **MERN (MongoDB, Express, React, Node.js)** application I designed to highlight both **front-end interactivity** and **back-end architecture**. Users can view/interact with **data tables**, **charts**, and **geographical maps** to analyze key metrics like **sales**, **products**, **customers**... 

The project emphasizes:

1. **Backend**: Written in **Node.js** using **Express.js** and **Mongoose** for stable, scalable APIs and data models.
2. **Frontend**: Built in **React**, featuring **Redux Toolkit Query (RTK Query)** for stateful data fetching and **Material-UI (MUI)** for interface.
3. **Real Deployment**: Both **frontend** and **backend** hosted on **Render.com**, connected to a remote **MongoDB** database.
4. **Detailed Analytics**: Visuals (charts, tables, maps) to show **data-driven insights** in real time.

---

## **Architecture**

Below is a high-level depiction of how the client, server, and database interact:

```markdown
![Deployment Diagram](diagrams/deploymentdiagram.jpg)
```

### **Client (Frontend)**
- **Built with React.js** (Create React App).  
- Manages global state and API calls using **Redux Toolkit & RTK Query**.  
- Deployed on **Render.com**; environment variables like `REACT_APP_BASE_URL` specify the backend URL.  
- Renders data from the server through dynamic components, charts, maps, and tables.

### **Server (Backend)**
- An **Express.js** application running on **Node.js**.  
- Exposes multiple endpoints, such as:  
  - `/client/*` for products, transactions, and customers  
  - `/general/*` for user and dashboard stats  
  - `/management/*` for admin and performance data  
  - `/sales/*` for broader sales statistics  
- Also deployed to **Render.com**; environment variables (e.g., `MONGO_URL`) point to the MongoDB database.

### **MongoDB Database**
- Stores data for:  
  - Users and their roles (**user**, **admin**, **superadmin**)  
  - Products and their stats (daily, monthly, yearly)  
  - Transactions (purchase records)  
  - Aggregated stats (e.g., daily, monthly, yearly totals)  
- Typically hosted on **MongoDB Atlas** or another cloud instance.

The frontend and backend are kept in one GitHub repository but deployed as **two separate services** on Render. This approach allows each service to be scaled, updated, and managed independently while retaining a single, consolidated codebase.
