# Myntra Price Tracker

## Overview

The Myntra Price Tracker is a full-stack web application designed to track and visualize price changes of products from the Myntra e-commerce platform. This project leverages Python for web scraping, MongoDB for data storage, and Next.js with React for the front-end interface, creating a seamless experience for users to monitor product prices over time.

## Features

- **Web Scraping**: Utilizes Selenium and BeautifulSoup to extract product prices and details from Myntra.
- **Data Storage**: Stores the scraped data in a MongoDB database, ensuring efficient data management and retrieval.
- **Data Visualization**: Displays price trends over time using interactive charts, helping users make informed purchasing decisions.
- **Responsive Design**: Provides a user-friendly interface with a responsive design, accessible on various devices.
- **Navigation**: Includes a simple navigation bar for easy access to different sections of the application.

## Technologies Used

- **Backend**: 
  - **Python**: For web scraping and data extraction.
  - **Selenium**: To automate browser actions for scraping.
  - **BeautifulSoup**: For parsing HTML content.
  - **MongoDB**: As the database to store product price information.
  - **Node.js**: For server-side logic and API endpoints.
  
- **Frontend**:
  - **Next.js**: For server-side rendering and building the React application.
  - **React**: For building interactive user interfaces.
  - **React Charts**: For displaying price trends in a graphical format.
  - **Tailwind CSS**: For styling and layout.

## How It Works

1. **Data Extraction**: The Python script (`main.py`) uses Selenium to navigate to product pages on Myntra, extract the necessary data (e.g., product ID, title, price), and save the HTML content locally.
2. **Data Parsing and Storage**: BeautifulSoup parses the saved HTML files to extract product details, which are then stored in a MongoDB collection.
3. **Data Aggregation**: The Next.js application fetches and aggregates this data from MongoDB, preparing it for visualization.
4. **Visualization**: The front-end renders an interactive chart showing the price history of each product, allowing users to see how prices have changed over time.

## Usage

- **Home Page**: Displays a list of tracked products, each linking to a detailed view.
- **Product Details Page**: Shows an interactive chart of the product’s price history, helping users understand price trends.

## Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2. **Install dependencies**:
   - Backend:
     ```bash
     pip install -r requirements.txt
     ```
   - Frontend:
     ```bash
     npm install
     ```
3. **Run MongoDB**: Ensure MongoDB is running locally.
4. **Start the backend**: Run the Python script to scrape and store data.
5. **Start the frontend**: Run the Next.js application:
    ```bash
    npm run dev
    ```

If you wish to track the prices of your desired products, just add the link of the product from Myntra website to products.txt file and run the application
