# 🏡 WanderLust – Airbnb Inspired Travel Listing Platform

WanderLust is a full-stack web application inspired by Airbnb that allows users to explore, create, edit, and review travel accommodation listings. The platform provides secure authentication, image uploads, location mapping, and a responsive user experience.

## 🚀 Live Demo

🌐 Live Website: https://airbnb-major-project-3mhv.onrender.com

## ✨ Features

* 🔐 User Authentication & Authorization
* 🏠 Create, Edit, and Delete Listings
* 📷 Image Upload with Cloudinary
* ⭐ Review & Rating System
* 🗺️ Interactive Maps using Mapbox
* 📱 Responsive UI Design
* 🔒 Session-Based Authentication
* ☁️ MongoDB Atlas Database Integration

## 🛠️ Tech Stack

### Frontend

* EJS
* Bootstrap 5
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Passport Local Mongoose
* Express Session

### Cloud Services

* Cloudinary
* Mapbox
* Render

## 📂 Project Structure

```text
controllers/
models/
routes/
views/
public/
utils/
init/
```

## 📦 Installation

### Clone Repository

```bash
git clone <your-github-repository-url>
cd major-project
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAPBOX_TOKEN=your_mapbox_token
SECRET=your_session_secret
```

### Initialize Sample Data

```bash
node init/index.js
```

### Run Application

```bash
node app.js
```

Visit:

```text
http://localhost:8080
```

## 🗄️ Database Collections

### Users

Stores registered user accounts.

### Listings

Stores travel accommodation listings.

### Reviews

Stores user reviews and ratings.

### Sessions

Stores authentication session data.

## 🔄 Application Workflow

1. User registers or logs in.
2. User explores available listings.
3. User creates new listings with images.
4. Listings are stored in MongoDB Atlas.
5. Images are uploaded to Cloudinary.
6. Users can leave reviews and ratings.
7. Maps are rendered using Mapbox.

## 📸 Screenshots

Add screenshots of:

* Home Page
* Listing Details Page
* Create Listing Page
* Login/Register Page

## 🌟 Future Improvements

* Wishlist Functionality
* Booking System
* Payment Gateway Integration
* User Profile Dashboard
* Advanced Search & Filters
* Admin Panel

## 👨‍💻 Author

**Sanju Rajak**

Full Stack Web Development Project

## 📄 License

This project is created for educational and learning purposes.
