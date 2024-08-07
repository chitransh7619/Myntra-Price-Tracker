from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from notifypy import Notify
import os
from bs4 import BeautifulSoup # pip install beautifulsoup4
from datetime import datetime
import sys
import re
from pymongo import MongoClient

client = MongoClient("localhost", 27017)
db=client["myntra"]
collection = db["prices"]



if sys.stdout.encoding != 'utf-8':
    sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)

def notify():
    notification = Notify()
    notification.title = "Extracting data"
    notification.message = "Extracting data from Myntra"
    notification.send()



def get_data():

    options= Options()
    #options.add_argument("--headless")
    #options.add_argument("--")

    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"   #by this amazon server will think that request is coming from browser itself

    with open ("products.txt") as f:
        products=f.readlines()        #a list of products

    driver=webdriver.Chrome(options=options) #setting up driver

    
    for product in products:
        driver.get(product)
        page_source=driver.page_source
        with open(f"data/{product.split('/')[-2]}.html","w", encoding="utf-8") as f:
            f.write(page_source)
    
def extract_data():
    files=os.listdir("data")
    for file in files:
        print(file)
        with open(f"data/{file}", encoding="utf-8") as f:
            content=f.read()

        soup=BeautifulSoup(content, 'html.parser') #to parse html docs

        title=soup.title.getText().split("|")[0]
        title=title[:-9]
        
        time=datetime.now()

        price = soup.find('span', class_='pdp-price').strong.text.replace('₹', '')
        priceInt = price.encode('utf-8').decode('utf-8')
        product_id=soup.find(class_="supplier-styleId").getText()
        print(priceInt,product_id,title, time)
        collection.insert_one({"PriceInt": priceInt,"Product_Id": product_id,"Title": title,"Time": time})
        with open("finaldata.txt", "a") as f:
            f.write(f"{priceInt}~~{product_id}~~{title}~~{time}\n")
        


if __name__ == "__main__":
    notify()

    
    get_data()
    extract_data()
    
