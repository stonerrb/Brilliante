# Brilliante Gold Tracking API

## Features
 1. Randomly Generate gold prices between 100 to 1000
 2. User can access the price of any gold item and also can update the price of gold items according to the current gold price
 3. User can access the current price of gold items as well as the best price in a time range
 4. A cron schedule script has been added which is scheduled to update gold item price every day at 12
 5. Unit Tests have been added to ensure the correct functionality of API endpoints.

## How To Run
 1. Clone the Project: ```bash git clone ```
 2. Go to Main Directory: ```bash cd main ```
 3. To start the development server: ```bash npm run dev```
 4. To start the Production server: ```bash npm run prod```
 5. To run the unit test: ```bash npm test```

## Postman Documentation of API

## Tech Stack
 1. Framework: Node.js, Express.js
 2. Modules: mongoose, cors, node-cron, Axios
 3. Testing: chai, chai-HTTP
