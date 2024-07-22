import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { MongoClient } from 'mongodb';
import DisplayChart from "../components/DisplayChart"

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myntra';



export default async function Page({ params }) {
    console.log('1. Starting Page function');
    
    try {
      console.log('2. Attempting to connect to MongoDB');
      await client.connect();
      console.log('3. Connected successfully to server');
      
      const db = client.db(dbName);
      const collection = db.collection('prices');
      
      console.log('4. Params:', params);
      const product_Id = params.product_id; // Note: changed from product_Id to product_id
      console.log('5. Querying for Product_Id:', product_Id);
  
      const pipeline = [
        {
          $match: {
            Product_Id: product_Id
          }
        },
        {
          $sort: {
            Time: 1
          }
        },
        {
          $group: {
            _id: "$Product_Id",
            data: {
              $push: {
                time: { $dateToString: { format: "%Y-%m-%d", date: "$Time" } },
                price: { $toInt: "$PriceInt" }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            label: "Product",
            data: "$data"
          }
        }
      ];
  
      console.log('6. MongoDB pipeline:', JSON.stringify(pipeline, null, 2));
      
      const data = await collection.aggregate(pipeline).toArray();
  
      console.log('7. Fetched data:', JSON.stringify(data, null, 2));
      
      if (!data || data.length === 0) {
        console.log('8. No data returned from database');
      } else {
        console.log('8. Data found in database');
      }
  
      return (
        <div>
          <h1>Product ID: {product_Id}</h1>
          {data && data.length > 0 && data[0].data && data[0].data.length > 0 ? (
            <DisplayChart data={data} />
          ) : (
            <p>No price data available for this product</p>
          )}
        </div>
      );
  
    } catch (error) {
      console.error('Error in Page function:', error);
      return <div>An error occurred: {error.message}</div>;
    } finally {
      await client.close();
      console.log('9. MongoDB connection closed');
    }
  }