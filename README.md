## Land Record Search

A Node.js and Express-based backend service for searching and retrieving land records using various criteria like plot number, parcel ID, owner name, or location.

## 🚀 Features

- Search land records by:
  - Plot number
  - Parcel ID
  - Owner name
  - Location
- Modular folder structure
- Environment variable configuration using `.env`
- API-based architecture ready for frontend integration

## 📁 Project Structure

   ```bash

landrecord_Search/
├── config/ # Configuration files (e.g., database connection)
├── controllers/ # Request handlers and business logic
├── models/ # Database schemas/models
├── routes/ # API route definitions
├── utils/ # Utility/helper functions
├── index.js # App entry point
├── sample.env # Sample environment variables file
├── package.json # Project metadata and dependencies
└── README.md
```


## 🧰 Requirements

- Node.js (v14 or above)
- npm
- MySQL instance (local or cloud)

## 🛠️ Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/parthkalekar/landrecord_Search.git
   cd landrecord_Search
   ```

2. **Install Dependencies**
   
  ```bash
   npm install
  ```
3. **Configure Environment Variables**
   
  ```bash
   copy all variables from sample.env to .env file. (if .env not exists create it at project root folder)
  ```
4. **Run the Application**
   
  ```bash
  npm start
  ```


## API Endpoints

 - GET /search
   
 - Search land records by any combination of query parameters:
   - parcelId (string)
   - plotNumber (string)
   - ownerName (string)
   - location (string)

 - Sample requests
    ```bash
    GET http://localhost:5600/search?ownerName=John
    GET http://localhost:5600/search?parcelId=12345&plotNumber=678
    GET http://localhost:5600/search?location=NewTown&ownerName=Alice
    ```

 ## *Note: The API does not return JSON data. Instead, it returns a PDF document of the land record matching the search criteria.
