# ⚙️ HobbyHub - Local Hobby Group Organizer (Server)

## 🔗 Live Server: [Click here](https://your-server-live-url.com)

## 🧠 About the Project

This is the backend server for **HobbyHub**, a hobby group management platform. Built with **Express.js** and **MongoDB**, this REST API handles all server-side logic, including group creation, joining/leaving groups, and user registration. It enables dynamic, secure, and scalable functionality to power the frontend client.

## 🚀 Key Features

- 🌐 **RESTful API** endpoints for groups and user actions
- 📦 **MongoDB Atlas** for cloud database integration
- 🔄 **Group Creation, Update, and Deletion**
- 👥 **Join/Leave Group Mechanism** with real-time spot tracking
- 🔍 **Search Groups by Email or ID**
- 📊 **Track Joined Groups by User**
- ✅ **User Creation and Duplication Check**
- ⚙️ **Environment Variable Support** using `dotenv`
- 🔐 **CORS Configured** for secure frontend-server communication

## 🧭 API Endpoints

### 📁 Group Management
| Method | Endpoint                    | Description                           |
|--------|-----------------------------|---------------------------------------|
| GET    | `/groups`                   | Get all hobby groups                  |
| GET    | `/group/:id`                | Get a single group by ID              |
| GET    | `/groupByEmail/:email`      | Get all groups created by a user      |
| POST   | `/createGroup`              | Create a new group                    |
| PUT    | `/updateGroup/:id`          | Update an existing group              |
| DELETE | `/deleteGroup/:id`          | Delete a group                        |

### 👥 Group Participation
| Method | Endpoint                          | Description                              |
|--------|-----------------------------------|------------------------------------------|
| POST   | `/joinGroup`                      | Join a group                              |
| DELETE | `/leaveGroup/:id/:email`          | Leave a group                             |
| PATCH  | `/updateGroupSpot/:id`            | Increment group spot count               |
| PATCH  | `/updateGroupSpotLeave/:id`       | Decrement group spot count               |
| GET    | `/checkUserGroup/:email`          | Get all joined groups for a user         |
| GET    | `/checkUserJoined/:email/:id`     | Check if user joined a specific group    |

### 👤 User Management
| Method | Endpoint     | Description                     |
|--------|--------------|---------------------------------|
| POST   | `/users`     | Save a new user (if not exists) |

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (MongoDB Atlas)**
- **MongoDB Native Driver**
- **dotenv**
- **CORS**