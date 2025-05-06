# 🌲 The Lorax Frontend

This is the frontend for **The Lorax Project**, a web application designed to display and manage tree data on Kalamazoo College’s campus using an interactive map powered by the Google Maps API.

## 🚀 Features

- Interactive campus map with custom styling
- View and manage tree data points
- Integration with a FastAPI backend
- Built with React and TypeScript

## 🛠 Prerequisites

Before running the application, create a `.env` file in the project root and add the following:

REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key  
REACT_APP_NEXT_PUBLIC_MAP_ID=your_google_map_id  
REACT_APP_FASTAPI_URL=https://kampus-tree.info/  # or your deployed FastAPI backend URL

You must enable the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) and [Maps Static API](https://developers.google.com/maps/documentation/maps-static/overview) in your Google Cloud Console.

## 📦 Installation

1. Clone the repository:

   git clone https://github.com/chauta03/the-lorax-frontend.git  
   cd the-lorax-frontend

2. Install dependencies:

   npm install

3. Start the development server:

   npm start

The app will run at http://localhost:3000

## 📁 Project Structure

├── public/  
├── src/  
│   ├── components/     # Reusable UI components  
│   ├── pages/          # Main page components  
│   ├── services/       # API service layer  
│   └── utils/          # Utility functions  
├── .env                # Environment variables  
├── package.json  
└── README.md

## 💡 Notes

- Ensure CORS is properly configured on the backend to allow requests from this frontend.
- Works with the FastAPI backend at: https://github.com/cole-koryto/trees-backend.git
  
## 📜 License

This project is licensed under the MIT License.
