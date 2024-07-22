

import React from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { MongoClient } from 'mongodb';
import Link from "next/link";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myntra';


export default async function Home() {
  
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('prices');
  const findResult =  await collection.aggregate([
    {
      $group: {
        _id: { Product_Id: "$Product_Id", Title: "$Title" }
      }
    },
    {
      $project: {
        _id: 0,
        Product_Id: "$_id.Product_Id",
        Title: "$_id.Title"
      }
    }
  ]).toArray();
  
  console.log(findResult);
  


  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
    <h1 className="text-center font-bold text-2xl py-5"> Welcome to Myntra Price Tracker</h1>
    <ul className="list-decimal font-bold">
      {findResult.map(item=>{
        //return <li className="my-4"><Link href={`https://www.myntra.com/${item.Product_Id}`}><span>{item.Title}</span></Link></li>
        return <li className="my-4"><Link href={`/${item.Product_Id}`}><span>{item.Title}</span></Link></li>
      })}
    </ul>
    </div>
    </>
  );
}
