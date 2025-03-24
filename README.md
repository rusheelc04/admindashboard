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

![Deployment Diagram](diagrams/deploymentdiagram.jpg)

### **Client (Frontend)**
- **Built with React.js**.  
- Manages global state and API calls using **Redux Toolkit & RTK Query**.  
- Deployed on **Render.com**; environment variable `REACT_APP_BASE_URL` specify the backend URL.  
- Renders data from the server through dynamic components, charts, maps, and tables.

### **Server (Backend)**
- An **Express.js** application running on **Node.js**.  
- Endpoints:  
  - `/client/*` for products, transactions, and customers  
  - `/general/*` for user and dashboard stats  
  - `/management/*` for admin and performance data  
  - `/sales/*` for broader sales statistics  
- Also deployed to **Render.com**; environment variables `MONGO_URL` point to the MongoDB database.

### **MongoDB Database**
- Stores data for:  
  - Users and their roles (**user**, **admin**, **superadmin**)  
  - Products and their stats (daily, monthly, yearly)  
  - Transactions (purchase records)  
  - Aggregated stats (daily, monthly, yearly totals)  
- Hosted on **MongoDB Atlas**.

The frontend and backend kept in repository but deployed as **two separate services** on Render. This allows each service to be scaled, updated, and managed independently while retaining a single, consolidated codebase.

---

## **Data Model**

![Data Model Diagram](diagrams/datamodeldiagram.jpg)

### **The data model is organized into these main Mongoose schemas:**

---

#### **User**
- **Fields**: `name`, `email`, `password`, `role`, `city`, `state`, `country`, `occupation`, `phoneNumber`, `transactions`, etc.
- Stores primary user info (including roles like user or admin).
- Holds references to user transactions.

---

#### **Product & ProductStat**
- **Product**: Defines `name`, `price`, `category`, `rating`, `supply`, etc.
- **ProductStat**: Tracks daily/monthly/yearly sales data per product.
- Allows quick expansions or breakdowns of each product’s historical performance.

---

#### **Transaction**
- Logs individual purchase events.
- Includes which user purchased, which products were bought, total cost, etc.
- Provides direct data for transaction history and analytics.

---

#### **OverallStat**
- Aggregates stats for the entire app in one place, such as:
  - `totalCustomers`
  - `yearlySalesTotal`
  - `yearlyTotalSoldUnits`
  - `monthlyData` and `dailyData` arrays
  - `salesByCategory` map
- Simplifies retrieving high-level metrics for the dashboard overview.

---

#### **AffiliateStat**
- Tracks affiliate or admin performance.
- Includes references to transactions they influenced.
- Supplies data for “Performance” pages that show how many sales a particular user (affiliate or otherwise) has generated.

---

**Impact**:  
These well-structured schemas power dynamic visualizations including **Breakdown Charts** (by category), **Geography** (user distribution by country), and **Daily/Monthly** line charts. By normalizing key metrics into dedicated schemas, the dashboard can quickly render essential analytics with minimal queries.


