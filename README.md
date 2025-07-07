# StayConnect DTU

A comprehensive web platform designed to connect DTU (Delhi Technological University) students with reliable housing options, roommates, and essential services. This platform streamlines the off-campus accommodation experience and reduces friction in the relocation process.

## 🏠 Project Overview

StayConnect DTU is a community-driven platform that addresses the housing challenges faced by DTU students. It provides a centralized solution for finding flats, PGs, roommates, and essential items needed for settling into off-campus accommodation.

### Key Features

- **🏘️ Flats/PG Listings** - Detailed property listings with photos, amenities, and contact information
- **👥 Roommate Finder** - Connect with potential roommates based on preferences
- **🛒 Essentials Marketplace** - Find furniture, appliances, and daily-use items
- **⭐ Student Reviews & Ratings** - Authentic reviews from fellow students
- **🗺️ Area Insights** - Information about popular areas near DTU
- **💬 Community Forum** - Q&A platform for housing-related queries
- **📋 Help Section** - Rental agreement templates and tenant rights information

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
├── StayConnectDTU/          # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Home.jsx    # Landing page
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Sell.jsx    # Sell/List items
│   │   │   ├── FindFlats.jsx
│   │   │   ├── FindRoommate.jsx
│   │   │   └── Essentials.jsx
│   │   ├── assets/         # Static assets
│   │   ├── App.jsx         # Main app component
│   │   └── Layout.jsx      # Layout wrapper
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
├── server/                 # Backend Node.js application
│   ├── controllers/        # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/           # Configuration files
│   ├── util/             # Utility functions
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
├── Project_Brief.md      # Detailed project requirements
├── User_Journeys.md      # User experience scenarios
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DOCTORSHATETHISONETRICK
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd StayConnectDTU
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd StayConnectDTU
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📋 Available Scripts

### Frontend (StayConnectDTU/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (server/)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 👥 Target Users

### Primary Users
- **DTU Students** - Looking for accommodation, roommates, or essential items
- **First-year Students** - New to Delhi, need guidance on housing

### Secondary Users
- **Flat/PG Owners** - List properties and find tenants
- **Brokers** - Manage property listings
- **Vendors** - Sell furniture and appliances
- **DTU Alumni** - Share experiences and help juniors

## 🔧 API Endpoints

The backend provides RESTful APIs for:

- **User Management** - Registration, authentication, profile management
- **Listings** - Property listings, roommate requests, marketplace items
- **Reviews** - User reviews and ratings
- **Community** - Forum posts and discussions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- DTU student community for feedback and requirements
- Local brokers and vendors for insights
- Open source community for the amazing tools and libraries

## 📞 Support

For support, email [support@stayconnectdtu.com] or create an issue in this repository.

---

**Built with ❤️ for DTU Students**
