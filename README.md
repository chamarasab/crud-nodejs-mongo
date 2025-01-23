# MongoDB CRUD Operations with Faker.js

This project demonstrates how to perform CRUD (Create, Read, Update, Delete) operations on a MongoDB database using Node.js and Faker.js to generate sample data. It uses the MongoDB Node.js driver for database interactions and dotenv for secure management of environment variables.

## Features
- **Insert Data**: Generate and insert realistic sample data using Faker.js.
- **Retrieve Data**: Fetch and display all records from the database in JSON format.
- **Update Data**: Duplicate records and update the status field.
- **Delete Data**: Remove the first 200 records from the collection.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or a local MongoDB database
- Basic knowledge of JavaScript and MongoDB

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/chamarasab/crud-nodejs-mongo
   cd crud-nodejs-mongo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of your project and add the MongoDB connection URI:
   ```env
   MONGODB_URI=your_mongodb_connection_uri
   ```

## Usage
1. Open the `index.js` file to explore the functions for CRUD operations.

2. Run specific operations by uncommenting the desired function call at the bottom of the file.

3. Execute the project:
   ```bash
   node index.js
   ```

## File Structure
```
|-- index.js         # Main file containing all CRUD operations
|-- .env             # Environment variables (MongoDB URI)
|-- package.json     # Dependencies and scripts
|-- README.md        # Project documentation
```

## Functions
### 1. Insert Data
- Inserts 10 sample records into the database with fields like `name`, `nic`, `gender`, `filename`, and `status`.
- Uses Faker.js for generating realistic data.

### 2. Retrieve Data
- Fetches all records from the collection and displays them as JSON.

### 3. Update Data
- Duplicates existing records and updates the `status` field to `free`.

### 4. Delete Data
- Deletes the first 200 records from the collection based on insertion order.

## Libraries Used
- **mongodb**: Official MongoDB Node.js driver.
- **@faker-js/faker**: Generate realistic fake data.
- **dotenv**: Load environment variables from `.env` file.

## Demo
- Connect to MongoDB Cloud.
- Insert sample data.
- Retrieve, update, and delete records using specific functions.

## Contributing
Feel free to submit issues and pull requests to improve the project.

## License
This project is licensed under the MIT License.
